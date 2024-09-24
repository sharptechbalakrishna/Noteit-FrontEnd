import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper';
import AddEntryModal from './AddEntryModal';
import UserService from '../UserService/UserService';
import BorrowerDetailView from './BorrowerDetailView';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import CustomFlashMessage from '../Components/CustomFlashMessage';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-elements/dist/helpers';
import EditEntryModel from '../Components/EditEntryModel';
import { AuthContext } from '../Context/AuthContext';

const BorrowerDetailScreen = ({ route }) => {

  const navigation = useNavigation();
  const { userInfo, userToken } = useContext(AuthContext); // Get userInfo from AuthContext

  const { barrowerData } = route.params;
  const [name] = barrowerData.borrowerName.toUpperCase();
  const [imageUrl] = useState(null);
  const [ledgerData, setLedgerData] = useState([]);
  const [ledgerId, setledgerId] = useState(null);
  const [lastBefore, setLastBefore] = useState(null);
  const [loading, setLoading] = useState(false);
  const reversedLedgerData = [...ledgerData].reverse();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModula, setEditModula] = useState(false);
  const [selectedTab, setSelectedTab] = useState('card');

  // Load the Ledger data 
  useEffect(() => {
    fetchLedgerData();
  }, []);


  // Ledger Data will be Loaded
  const fetchLedgerData = async () => {

    try {

      const data = await UserService.ledgerData(barrowerData.id, userToken);
      setLedgerData(data);
    } catch (err) {
      console.error('Error fetching ledger data:', err);
    }
  };


  // adding the new Entry and Call the ledgerData Api
  const handleAddEntry = async (newEntry) => {
    console.log('New Entry:', newEntry);
    setLoading(true);
    try {
      setModalVisible(false);
      await UserService.addEntry(newEntry, userToken);
      fetchLedgerData();
      CustomFlashMessage('success', 'Success', 'Entry added successfully!');

    } catch (err) {
      CustomFlashMessage('error', 'Error', 'Failed to add entry.');
      console.error('Error adding new entry:', err);
    } finally {
      setLoading(false);
    }
  };



  // Reversing the Ledger data to display the latest entery
  useEffect(() => {
    if (ledgerData.length > 0) {
      const reversedLedgerData = [...ledgerData].reverse();
      setledgerId(reversedLedgerData[0].id);
    }
  }, [ledgerData]);

  useEffect(() => {
    if (ledgerData.length > 1) {
      const reversedLedgerData = [...ledgerData].reverse();
      setLastBefore(reversedLedgerData[1].id);
    }
  }, [ledgerData]);


  useEffect(() => {
    if (ledgerId !== null) {
      console.log('last entry ID:', ledgerId);
      console.log('last Before ID:', lastBefore);
    }
  }, [ledgerId]);

  // Function to handle the phone call
  const handleCallPress = () => {

    console.log(barrowerData);
    const phoneNumber = barrowerData.phoneNumber; // Assuming phone number is stored in barrowerData
    console.log(phoneNumber);
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`)
        .then(() => console.log('Phone dialer opened'))
        .catch((err) => console.error('Error opening phone dialer', err));
    } else {
      CustomFlashMessage('error', 'Error', 'Phone number not available');
    }
  };
  // Function to handle the phone call
//  const handleMessagePressed = () => {
//     const phoneNumber = '9449983623'; // Your target phone number
//     const message = 'Hi'; // Pre-filled message

//     let smsUrl = '';

//     if (Platform.OS === 'ios') {
//       // iOS URL scheme
//       smsUrl = `sms:${phoneNumber}&body=${encodeURIComponent(message)}`;
//       Linking.canOpenURL(smsUrl) // In ios we have kept canOpenURl only to open the sms app directly 
//         .then((supported) => {
//           if (supported) {
//             return Linking.openURL(smsUrl);
//           } else {
//             console.warn("SMS not supported on this device");
//           }
//         })
//         .catch((err) => console.error("Failed to open SMS app", err));

//     } else if (Platform.OS === 'android') {
//       // Android URL scheme
//       smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;


//       Linking.canOpenURL(smsUrl) // here canOpenURl is not supported for Simulator so need to check after deploting the app in playstore wher canOpenURl is workin or openURl is working need to be verify 
//         .then((supported) => {
//           if (supported) {
//             return Linking.openURL(smsUrl);
//           } else {
//             Linking.openURL(smsUrl)
//               .then((supported) => {
//                 if (supported) {
//                   return Linking.openURL(smsUrl);
//                 } else {
//                   console.warn("SMS not supported on this device");
//                 }
//               })
//               .catch((err) => console.error("Failed to open SMS app", err));
//           }
//         })
//         .catch((err) => console.error("Failed to open SMS app", err));
//     }
//   };


  // Editing the Latest Entry
  const handleEdit = async () => {
    setEditModula(true);
  }


  // adding the new Entry and Call the ledgerData Api
  const edithandleAddEntry = async (newEntry) => {
    console.log('Edit Entry:', newEntry);
    setLoading(true);
    try {
      setEditModula(false);
      await UserService.addEntry(newEntry, userToken);
      fetchLedgerData();
      CustomFlashMessage('success', 'Success', 'Entry added successfully!');

    } catch (err) {
      CustomFlashMessage('error', 'Error', 'Failed to add entry.');
      console.error('Error adding new entry:', err);
    } finally {
      setLoading(false);
    }

  };


  // Deleteing the Latest Entry
  const handleDelete = async (lastBefore) => {

    try {
      console.log('lastBefore :', lastBefore);
      console.log('Barrower ID :', barrowerData.id);
      const response = await UserService.deleteLedger(lastBefore, barrowerData.id, userToken);
      CustomFlashMessage('success', 'Success', 'Deleted Sucessfully!');
      fetchLedgerData();

    } catch (error) {
      console.log("Error", error);
      CustomFlashMessage('error', 'Error', 'Failed to add entry.');

    }

  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.profileContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          ) : (
            <View style={styles.initialsContainer}>
              <Text style={styles.initialsText}>{name}</Text>
            </View>
          )}
          <TouchableOpacity onPress={() => navigation.navigate('BarrowerProfileScreen', { barrowerData: barrowerData })}  >
            <View style={styles.profileTextContainer}>
              <Text style={styles.nameText}>{barrowerData.borrowerName}</Text>
              <Text style={styles.viewSettingsText}>Click here for more info</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={handleMessagePressed}>
          <Entypo name="message" size={24} color="#fff" />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleCallPress}>
          <Icon name="call" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <BorrowerDetailView
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          reversedLedgerData={reversedLedgerData}
          ledgerData={ledgerData}
          setModalVisible={setModalVisible}
          onhandleEdit={handleEdit}
          onhandleDelete={handleDelete}
          lastBefore={lastBefore}
        />

        <AddEntryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddEntry}
          borrowerName={barrowerData.borrowerName}
          ledgerId={ledgerId}
          loading={loading}
        />


        <EditEntryModel
          visible={editModula}
          onClose={() => setEditModula(false)}
          onEditHandleAddEntry={edithandleAddEntry}
          borrowerName={barrowerData.borrowerName}
          ledgerId={lastBefore}
          loading={loading}
        />


      </View>

      {(!modalVisible && !editModula) && (
        <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Entry Interest</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976D2', // Blue background
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#64B5F6', // Blue gradient color
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  customerBadge: {
    backgroundColor: '#1E88E5', // Lighter blue for the badge
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 2,
  },
  customerBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  viewSettingsText: {
    color: '#BBDEFB', // Light blue text color
    fontSize: 12,
    marginTop: 2,
  },

});

export default BorrowerDetailScreen;
