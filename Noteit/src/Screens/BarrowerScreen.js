import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AddBorrower from './AddBorrower'; // Import your AddBorrower component
import { AuthContext } from '../Context/AuthContext';

const BorrowerScreen = ({ navigation }) => { // Add navigation prop
  const { userInfo } = useContext(AuthContext); // Get userInfo from AuthContext
  const [searchQuery, setSearchQuery] = useState('');
  const [borrowers, setBorrowers] = useState([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]); // Initialize filteredBorrowers 
  const [isLoading, setIsLoading] = useState(false);


  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null); // Create a ref for FlatList

  useEffect(() => {
    const fetchBorrowers = async () => {
      console.log('Checning')
      setIsLoading(true);
      try {
        console.log(userInfo.id);
        const response = await axios.get(`http://192.168.3.53:8080/${userInfo.id}/borrowers`);
        const borrowersData = response.data;

        borrowersData.forEach(borrower => {
          console.log('Borrower Name:', borrower.borrowerName);
          console.log('Principal Amount:', parseFloat(borrower.principalAmount));
          console.log('Interest Rate:', parseFloat(borrower.interestRate));
          console.log('Credit Status:', borrower.creditStatus);
          console.log('---------------------------');
        });
        console.log(response);
        setBorrowers(borrowersData);
        setFilteredBorrowers(borrowersData);

      } catch (error) {
        console.error('Error fetching borrowers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo && userInfo.id) {
      fetchBorrowers();
    }
  }, [userInfo]);

  const addBorrower = (newBorrower) => {
    setBorrowers([...borrowers, newBorrower]);
    setFilteredBorrowers([...borrowers, newBorrower]); // Update the filteredBorrowers as well
  };

  const onChangeSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredBorrowers(borrowers);
    } else {
      const filtered = borrowers.filter(borrower =>
        borrower.borrowerName?.toLowerCase().includes(query.toLowerCase()) ||
        borrower.principalAmount?.toString().includes(query) ||
        borrower.interestRate?.toString().includes(query)
      );
      setFilteredBorrowers(filtered);
    }
  };

  const truncateName = (name) => {
    return name.length > 8 ? `${name.substring(0, 8)}...` : name;
  };

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
        <Text style={styles.headerTitle}>Gayathri Enterprises</Text>
        <Icon name='bell' size={20} color='#fff' />
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
        ref={flatListRef} // Attach the ref to FlatList
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
        addBorrower={addBorrower}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#007bff',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    margin: 10,
    borderRadius: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cellHeader: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10, // Add padding to align text to the left
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 10,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10, // Add padding to align text to the left
  },
  cellText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#d9534f',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 80, // To make sure the last items are not covered by the button
  },
});

export default BorrowerScreen;
