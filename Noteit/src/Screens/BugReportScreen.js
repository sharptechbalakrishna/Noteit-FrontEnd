import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const BugReportScreen = ({ navigation }) => {
  const [selectedReport, setSelectedReport] = useState('');
  const [bugDescription, setBugDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSendPress = () => {
    console.log('Selected Report:', selectedReport);
    console.log('Bug Description:', bugDescription);
    console.log('Image Base64:', imageBase64 ? imageBase64 : 'No image selected');
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
            // console.log('Image converted to Base64:', base64String);
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
        <Text style={styles.headerTitle}>Report Issue</Text>
        <TouchableOpacity onPress={handleSendPress}>
          <FeatherIcon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Choose a report</Text>

        {/* Bug Type Options */}
        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.option, selectedReport === 'UI Issue' && styles.selectedOption]}
            onPress={() => setSelectedReport('UI Issue')}>
            <Text style={styles.optionText}>UI Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, selectedReport === 'Performance Issue' && styles.selectedOption]}
            onPress={() => setSelectedReport('Performance Issue')}>
            <Text style={styles.optionText}>Performance Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, selectedReport === 'Crash' && styles.selectedOption]}
            onPress={() => setSelectedReport('Crash')}>
            <Text style={styles.optionText}>Crash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, selectedReport === 'Other' && styles.selectedOption]}
            onPress={() => setSelectedReport('Other')}>
            <Text style={styles.optionText}>Other</Text>
          </TouchableOpacity>
        </View>

        {/* Bug Description Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Describe the issue in detail"
          value={bugDescription}
          onChangeText={setBugDescription}
          multiline
        />

        {/* Upload Image Button */}
        <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
          <FeatherIcon name="image" size={24} color="#fff" />
          <Text style={styles.uploadButtonText}>Upload Image</Text>
        </TouchableOpacity>

        {/* Display Selected Image with Cancel Button */}
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
