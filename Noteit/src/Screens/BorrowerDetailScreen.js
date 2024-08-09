import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AddEntryModal from './AddEntryModal';
import UserService from '../UserService/UserService';
import BorrowerDetailView from './BorrowerDetailView';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import CustomFlashMessage from '../Components/CustomFlashMessage';

const BorrowerDetailScreen = ({ route }) => {
  const { barrowerData } = route.params;

  const [ledgerData, setLedgerData] = useState([]);
  const [ledgerId, setledgerId] = useState(null);
  const [loading, setLoading] = useState(false);

  const reversedLedgerData = [...ledgerData].reverse();

  const fetchLedgerData = async () => {
    try {
      const data = await UserService.ledgerData(barrowerData.id);
      setLedgerData(data);
    } catch (err) {
      console.error('Error fetching ledger data:', err);
    }
  };

  useEffect(() => {
    fetchLedgerData();
  }, []);

  useEffect(() => {
    if (ledgerData.length > 0) {
      const reversedLedgerData = [...ledgerData].reverse();
      setledgerId(reversedLedgerData[0].id);
    }
  }, [ledgerData]);

  useEffect(() => {
    if (ledgerId !== null) {
      console.log('ID of the last entry:', ledgerId);
    }
  }, [ledgerId]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('card');

  const handleAddEntry = async (newEntry) => {
    console.log('New Entry:', newEntry);
    setLoading(true);
    try {
      setModalVisible(false);
      await UserService.addEntry(newEntry);
      fetchLedgerData();
      CustomFlashMessage('success', 'Success', 'Entry added successfully!');
      
    } catch (err) {
      CustomFlashMessage('error', 'Error', 'Failed to add entry.');
      console.error('Error adding new entry:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <BorrowerDetailView
          barrowerData={barrowerData}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          reversedLedgerData={reversedLedgerData}
          ledgerData={ledgerData}
          setModalVisible={setModalVisible}
        />

        <AddEntryModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddEntry}
          borrowerName={barrowerData.borrowerName}
          ledgerId={ledgerId}
          loading={loading}
        />
      </View>
      {!modalVisible && (
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
});

export default BorrowerDetailScreen;
