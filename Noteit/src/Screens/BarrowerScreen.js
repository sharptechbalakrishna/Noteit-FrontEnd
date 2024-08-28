import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AddBorrower from './AddBorrower'; // Import your AddBorrower component
import { AuthContext } from '../Context/AuthContext';
import UserService from '../UserService/UserService';

const BorrowerScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext); // Get userInfo from AuthContext
  const [searchQuery, setSearchQuery] = useState('');
  const [borrowers, setBorrowers] = useState([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null); // Create a ref for FlatList


  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetchBorrowers();
    }
  }, [userInfo]);

  const fetchBorrowers = async () => {
    setIsLoading(true);



    try {


      // const response = await axios.get(`http://192.168.3.53:8080/${userInfo.id}/borrowers`);

      const response = await UserService.displayBorrowers(userInfo.id);
      const borrowersData = response;
      borrowersData.sort((a, b) => b.id - a.id);
      borrowersData.forEach(borrower => {
        console.log('customerid:', userInfo.id, 'borrowersData--->', '&', borrower.id, borrower.borrowerName, parseFloat(borrower.principalAmount), parseFloat(borrower.interestRate));

      });
      setBorrowers(borrowersData);
      setFilteredBorrowers(borrowersData);
    } catch (error) {
      console.error('Error fetching borrowers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addBorrower = async (newBorrower) => {
    try {
      console.log('New Borrower Added:', newBorrower);
      await fetchBorrowers();
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding borrower:', error);
    }
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredBorrowers(borrowers);
    } else {
      const filtered = borrowers.filter(borrower =>
        borrower.borrowerName?.toLowerCase().includes(query.toLowerCase()) ||
        borrower.principalAmount?.toString().includes(query) ||
        borrower.interestRate?.toString().includes(query) ||
        borrower.creditStatus?.toString().includes(query)
      );
      setFilteredBorrowers(filtered);
    }
  };

  const truncateName = (name) => {
    return name.length > 8 ? `${name.substring(0, 8)}...` : name;
  };

  const NavigationSelfNotes = () => {
    navigation.navigate('SelfNotes');

  }


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.rowContainer}
      onPress={() => navigation.navigate('BorrowerDetailScreen', { barrowerData: item })} // Navigate to detail screen with borrowerName and principalAmount
    >
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.borrowerName ? truncateName(item.borrowerName) : 'N/A'}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.principalAmount?.toString() || 'N/A'}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.interestRate?.toString() || 'N/A'}</Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{userInfo.firstName}</Text>
        <TouchableOpacity onPress={NavigationSelfNotes}>
          <Icon name='bell' size={20} color='#fff' />
        </TouchableOpacity>
      </View>

      <Searchbar
        placeholder="Search Borrower"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <View style={styles.tableHeader}>
        <View style={styles.cellHeader}><Text style={styles.headerText}>Name</Text></View>
        <View style={styles.cellHeader}><Text style={styles.headerText}>Principal</Text></View>
        <View style={styles.cellHeader}><Text style={styles.headerText}>Interest Rate</Text></View>
      </View>

      <FlatList
        ref={flatListRef}
        data={filteredBorrowers} // Use filteredBorrowers instead of borrowers
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={15} color="#fff" />
        <Text style={styles.addButtonText}>   Borrower</Text>
      </TouchableOpacity>

      <AddBorrower
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        addBorrower={addBorrower} // Pass the addBorrower function
      />
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a4b9db', // Light gray background for a clean and modern look
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#0056b3', // Dark blue background for the header
    elevation: 4, // Subtle shadow for depth
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
  },
  searchBar: {
    margin: 15,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 2, // Subtle shadow
    paddingHorizontal: 10, // Padding for text input
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0', // Light gray for headers
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#bdbdbd',
    marginHorizontal: 15,
    borderRadius: 10,
    elevation: 1, // Light shadow
    marginBottom: 10,

  },
  cellHeader: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,

  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333333',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff', // White background for rows
    borderRadius: 8, // Rounded corners for rows
    elevation: 1, // Light shadow
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  cellText: {
    fontSize: 14,
    color: '#444444', // Slightly muted color for text
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#28a745', // Green background for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Fully rounded button
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6, // Prominent shadow for the button
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  listContent: {
    paddingBottom: 90, // Ensure space for the button
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    elevation: 5, // Elevated shadow for the modal
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
  },
  modalButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#0056b3', // Blue button for modal actions
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});



export default BorrowerScreen;
