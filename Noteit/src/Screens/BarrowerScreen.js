import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddBorrower from './AddBorrower'; // Import your AddBorrower component

const borrowers = [
  { id: '1', name: 'Gayathri', principalAmount: '100000', interestRate: '2%' },
  { id: '2', name: 'SharavanKumar yashavant karigari', principalAmount: '20000', interestRate: '5%' },
  { id: '3', name: 'Priya', principalAmount: '29200', interestRate: '8%' },
  { id: '4', name: 'Reddy', principalAmount: '96540', interestRate: '10%' },
  { id: '15', name: 'Gayathri', principalAmount: '100000', interestRate: '2%' },
  { id: '254', name: 'Sharavan Kumar', principalAmount: '20000', interestRate: '5%' },
  { id: '38', name: 'Priya', principalAmount: '29200', interestRate: '8%' },
  { id: '4987', name: 'Reddy', principalAmount: '96540', interestRate: '10%' },
];

const BorrowerScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBorrowers, setFilteredBorrowers] = useState(borrowers);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null); // Create a ref for FlatList

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = borrowers.filter(borrower =>
      borrower.name.toLowerCase().includes(query) ||
      borrower.principalAmount.toLowerCase().includes(query) ||
      borrower.interestRate.toLowerCase().includes(query)
    );
    setFilteredBorrowers(filtered);

    // Scroll to top when search query changes
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [searchQuery]);

  const onChangeSearch = query => setSearchQuery(query);

  const renderItem = ({ item }) => (
    <View style={styles.rowContainer}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.principalAmount}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.interestRate}</Text>
      </View>
    </View>
  );

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

      <FlatList
        ref={flatListRef} // Attach the ref to FlatList
        ListHeaderComponent={
          <View style={styles.tableHeader}>
            <View style={styles.cellHeader}><Text style={styles.headerText}>Name</Text></View>
            <View style={styles.cellHeader}><Text style={styles.headerText}>Principal</Text></View>
            <View style={styles.cellHeader}><Text style={styles.headerText}>Interest Rate</Text></View>
          </View>
        }
        data={filteredBorrowers}
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

      <AddBorrower visible={modalVisible} onClose={() => setModalVisible(false)} />
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
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
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
