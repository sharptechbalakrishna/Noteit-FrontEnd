import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { AuthContext } from '../Context/AuthContext';
import RNFS from 'react-native-fs';
import UserService from '../UserService/UserService';
import { ActivityIndicator } from 'react-native';

const BugReportScreen = ({ navigation }) => {
  const { userInfo, userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [userEmail, setUserEmail] = useState('');  // Fix setter function

  const handleBackPress = () => {
    navigation.goBack();
  };

  const resetForm = () => {
    setSelectedReport('');
    setBugDescription('');
    setSelectedImage(null);
    setImageBase64('');
    setUserEmail('');
  };

  const handleSendPress = async () => {
    if (!userInfo.email || !selectedReport || !bugDescription) {
      Alert.alert('Error', 'Please provide your email, select a report type, and describe the issue.');
      return;
    }
    console.log("bug report", userInfo.email,selectedReport ,bugDescription);
    setLoading(true); // Set loading state
  
    const bugReport = {
      email: userInfo.email,  // Fetch email from userInfo
      title: selectedReport,  // Use the selected report as the title
      bugMessage: bugDescription,  // Bug description
    };
  
    try {
      const response = await UserService.reportBug(bugReport, userToken);  // Call API
      Alert.alert('Success', 'Issue sent successfully');
      resetForm();  // Clear form
      navigation.goBack();  // Navigate back to the previous screen
    } catch (error) {
      Alert.alert('Error', 'Failed to send bug report');
      console.error('Error while sending bug report:', error);
    } finally {
      setLoading(false);  // Set loading to false after API call
    }
  };

  const handleUploadImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 1,
      },
      async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          const source = { uri: response.assets[0].uri };
          setSelectedImage(source);

          try {
            const base64String = await RNFS.readFile(source.uri, 'base64');
            setImageBase64(base64String);
          } catch (error) {
            console.error('Error converting image to Base64:', error);
          }
        }
      },
    );
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageBase64('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report Bug</Text>

        <TouchableOpacity onPress={handleSendPress} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <FeatherIcon name="send" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Choose a report</Text>
        <View style={styles.options}>
          {['UI Issue', 'Performance Issue', 'Crash', 'Other'].map((reportType) => (
            <TouchableOpacity
              key={reportType}
              style={[styles.option, selectedReport === reportType && styles.selectedOption]}
              onPress={() => setSelectedReport(reportType)}>
              <Text style={styles.optionText}>{reportType}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Describe the issue in detail"
          value={bugDescription}
          onChangeText={setBugDescription}
          multiline
        />
  
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
          <FeatherIcon name="image" size={24} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>

        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={selectedImage} style={styles.previewImage} />
            <TouchableOpacity style={styles.cancelButton} onPress={handleRemoveImage}>
              <FeatherIcon name="x-circle" size={24} color="#ff0000" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
export default BugReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#007BFF',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#007BFF',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  textInput: {
    height: 100,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#32c759',
    borderRadius: 10,
  },
  uploadButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 20,
    position: 'relative',
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cancelButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 3,
  },
});
