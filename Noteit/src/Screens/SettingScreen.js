import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking
} from 'react-native';
import { Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-share';
import files from '../assets/filesBase64';
import { AuthContext } from '../Context/AuthContext';
import { Caption, customText } from 'react-native-paper';
import UserService from '../UserService/UserService';
import CustomFlashMessage from '../Components/CustomFlashMessage';


export default function SettingScreen({ navigation }) {

  const { userToken,userInfo, logout } = useContext(AuthContext); // Get userInfo from AuthContext
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  const contactUs = () => {
    const email = 'shravankumarmca2023@gmail.com';
    const subject = 'Inquiry';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    Linking.openURL(mailtoUrl)
      .catch(err => console.error('Error opening email client', err));
  };

  const handleRateApp = () => {
    const appStoreUrl = 'https://play.google.com/store/apps/details?id=com.pubg.imobile';

    Linking.openURL(appStoreUrl)
      .catch(err => console.error("Couldn't load page", err));
  };

  const deleteAccount = async () => {
    Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete your account?',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: async () => {
                    try {
                        await UserService.deleteAccount(userInfo.id, userToken);
                        logout();
                    } catch (error) {
                        console.log("Error ", error);
                        CustomFlashMessage('error', 'Error', 'Try again later!');
                    }
                },
            },
        ],
        { cancelable: true }
    );
};

  const myCustomShare = async () => {

    const appStoreLink = "https://play.google.com/store/apps/details?id=com.pubg.imobile"; // Replace with actual app download link
    const googlePlayLink = "https://play.google.com/store/apps/details?id=com.pubg.imobile"; // Replace with actual app download link

    const shareOption = {
      message: `
      Hi there!

I’m using a great finance app called *Noteit* to manage money I’ve lent to others. It lets you track loans, set reminders, and keep everything organized in one place.

Give it a try and simplify your finances!

Download here: ${appStoreLink} or ${googlePlayLink}

Best,
${userInfo.firstName}
      `,
      url: files.appLogo
    }
    try {
      const ShareResponse = await Share.open(shareOption)
      console.log("ShareResponse", JSON.stringify(ShareResponse));
      console.warn("Shared");
    } catch (error) {
      console.log("Error :", error);
    }


  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={styles.profile}>

        <TouchableOpacity onPress={() => { }}>
          <View style={styles.profileAvatarWrapper}>
            <Image alt="" source={{ uri: 'https://i.ibb.co/N2zmVHw/IMG-20221223-122434.jpg' }}
              style={styles.profileAvatar} />

            <TouchableOpacity
              onPress={() => { }}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#fff" name="edit-3" size={15} />
              </View>
            </TouchableOpacity>

          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.profileName}>Shravankumar</Text>
          <Text style={styles.profileAddress}>   BTM 2nd Stage Bengaluru - 560076  </Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity  onPress={() => { }} style={styles.row}>

            <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
              <FeatherIcon color="#fff" name="globe" size={20} />
            </View>

            <Text style={[styles.rowLabel, { marginRight: 140 }]}>Language</Text>

            <Caption>English</Caption>
            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          {/* <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="moon" size={20} />
            </View>

            <Text style={styles.rowLabel}>Dark Mode</Text>

            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={darkMode => setForm({ ...form, darkMode })}
              value={form.darkMode} />
          </View> */}

          <TouchableOpacity onPress={() => { navigation.navigate('ChangePasswordScreen'); }} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
              <Icon color="#fff" name="password" size={20} />
            </View>

            <Text style={styles.rowLabel}>Change Password</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>
          

          {/* <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>

            <Text style={styles.rowLabel}>Email Notifications</Text>

            <View style={styles.rowSpacer} />

            <Switch
              onValueChange={emailNotifications =>
                setForm({ ...form, emailNotifications })
              }
              value={form.emailNotifications} />
          </View> */}

          <TouchableOpacity onPress={myCustomShare}>
            <View style={styles.row}>
              <View style={[styles.rowIcon, { backgroundColor: '#38C959' }]}>
                <AntDesign color="#fff" name="share-outline" size={20} />
              </View>

              <Text style={styles.rowLabel}>Tell Your Friends</Text>

              <View style={styles.rowSpacer} />
              <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />

            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>


          <TouchableOpacity
            onPress={() => { navigation.navigate('BugReportScreen'); }} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
              <FeatherIcon color="#fff" name="flag" size={20} />
            </View>

            <Text style={styles.rowLabel}>Report Bug</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={contactUs} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon color="#fff" name="mail" size={20} />
            </View>

            <Text style={styles.rowLabel}>Contact Us</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRateApp}
            style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
              <FeatherIcon color="#fff" name="star" size={20} />
            </View>

            <Text style={styles.rowLabel}>Rate in App Store</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity onPress={deleteAccount} style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: 'crimson' }]}>
              <AntDesign color="#fff" name="delete" size={20} />
            </View>

            <Text style={styles.rowLabel}>Delete Account</Text>

            <View style={styles.rowSpacer} />

            <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});