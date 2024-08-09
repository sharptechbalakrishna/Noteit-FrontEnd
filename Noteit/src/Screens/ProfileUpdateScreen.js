
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  BackHandler,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import styles from '../Utils/ProfileUpdateStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Back from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import UserService from '../UserService/UserService';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { RadioButton } from 'react-native-paper';
import Toast from 'react-native-toast-message';

function ProfileUpdateScreen({ route }) {

  const { customerData } = route.params;

  useEffect(() => {
    console.log("Customer Data:", customerData); // Inspect the value
    if (customerData) {
        setId(customerData.id || 0);
        setFirstName(customerData.firstName || '');
        setLastName(customerData.lastName || '');
        setEmail(customerData.email || '');
        setUserName(customerData.userName || '');
        setPhone(customerData.phone || '');
        setGender(customerData.gender || '');
        setImage(customerData.image || '');
    }
}, [customerData]);;

const [id, setId] = useState('');
const [image, setImage] = useState('');
const [email, setEmail] = useState('');
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [userName, setUserName] = useState('');
const [phone, setPhone] = useState('');
const [gender, setGender] = useState('');


  const selectPhoto = ({ }) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,

    }).then(image => {
      // console.log(image);
      const data = `data:${image.mime};base64,${image.data}`
      setImage(data);
      // console.log("Image :", data);
      // console.log("Image :", image);

    });
  };

  const updateProfile = async () => {
    const formData = {
        id: id, // Ensure this is a number if expected
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        userName: userName,
        gender: gender,
        image: image,
    };

    try {
      console.log(formData);
        const response = await UserService.register(formData);
        console.log("Response Data:", response);
    } catch (error) {
        console.error("Update Error:", error);
    }
};
  return (
    <ScrollView
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View>
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Back
              name="arrow-back"
              size={30}
              style={styles.backIcon}
            // onPress={() => {
            //   this.props.navigation.goBack();
            // }}
            />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.nameText}>Edit Profile</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={styles.camDiv}>

          <View style={styles.camIconDiv}>
            <Back name="camera" size={22} onPress={() => selectPhoto()} style={styles.cameraIcon} />
          </View>

          <TouchableOpacity onPress={() => selectPhoto()}>
            <Avatar.Image
              size={150}
              style={styles.avatar}
              source={{
                uri: image === '' || image === null ?
                  'https://i.ibb.co/N2zmVHw/IMG-20221223-122434.jpg'
                  : image
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 50,
            marginHorizontal: 22,
          }}>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>First Name</Text>
            <TextInput
              placeholder="Your First Name"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChange={(e) => setFirstName(e.nativeEvent.text)}
              defaultValue={firstName}
            // value={this.state.username}
            // onChange={(e) => this.handleName(e)}
            />
          </View>
          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Last Name</Text>
            <TextInput
              placeholder="Your Last Name"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChange={(e) => setLastName(e.nativeEvent.text)}
              defaultValue={lastName}
            // value={this.state.username}
            // onChange={(e) => this.handleName(e)}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Email</Text>
            <TextInput
              editable={true}
              placeholder="Your Email"
              placeholderTextColor={'#999797'}
              style={styles.infoEditSecond_text}
              onChange={(e) => setEmail(e.nativeEvent.text)}
              defaultValue={email}
            // value={this.state.uemail}
            // onChange={(e) => this.handleEmail(e)}
            />
          </View>

          {/* <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Gender</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Male</Text>
                <RadioButton
                  value="Male"
                  status={
                    gender === 'Male' ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    setGender('Male')
                  }}
                />
              </View>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Female</Text>
                <RadioButton
                  value="Female"

                  status={
                    gender === 'Female' ? 'checked' : 'unchecked'
                  }
                  onPress={() => {
                    setGender('Female')
                  }}
                // status={
                //   this.state.gender === "Female" ? "checked" : "unchecked"
                // }
                // onPress={() =>
                //   this.setState(
                //     {
                //       gender: "Female",
                //     },
                //     console.log(this.state.gender, "gen")
                //   )
                // }
                />
              </View>
            </View>
          </View> */}

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>User Name</Text>
            <TextInput
              placeholder="Your User Name"
              placeholderTextColor={'#999797'}
              // keyboardType="numeric"
              // maxLength={10}
              style={styles.infoEditSecond_text}

              onChange={(e) => setUserName(e.nativeEvent.text)}
              defaultValue={userName}
            />
          </View>

          <View style={styles.infoEditView}>
            <Text style={styles.infoEditFirst_text}>Mobile No</Text>
            <TextInput
              placeholder="Your Mobile Ndo"
              placeholderTextColor={'#999797'}
              keyboardType="numeric"
              maxLength={10}
              style={styles.infoEditSecond_text}
              onChange={(e) => setPhone(e.nativeEvent.text)}
              defaultValue={phone}
            />
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => updateProfile()} style={styles.inBut}>
            <View>
              <Text style={styles.textSign}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default ProfileUpdateScreen;
