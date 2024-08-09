import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserService from '../UserService/UserService';
import { AuthContext } from '../Context/AuthContext';
import { format } from 'date-fns';


const ExpenseTracker = () => {
  const { userInfo } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [savings, setSavings] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [income, setIncome] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetchExpenseTrackerData(userInfo.id);
    }
  }, [userInfo]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, transactions]);

  const fetchExpenseTrackerData = async (customerId) => {
    try {
      const data = await UserService.fetchExpenseTrackerData(customerId);
      const sortedTransactions = (data.transactions || []).sort(
        (a, b) => new Date(b.updatedTs) - new Date(a.updatedTs)
      );
      setTransactions(sortedTransactions);
      setFilteredTransactions(sortedTransactions); // Initialize with all transactions
      setSavings(data.savings || 0);
      setSpentAmount(data.spentAmount || 0);
      setIncome(data.income || 0);
    } catch (error) {
      console.error('Error fetching expense tracker:', error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  };

  const handleAddIncome = async () => {
    if (description && amount) {
      const expenseData = {
        customerId: userInfo.id,
        description,
        income: parseFloat(amount),
      };
      try {
        await UserService.updateExpense(expenseData);
        await fetchExpenseTrackerData(userInfo.id); // Refresh data after adding income
        setDescription('');
        setAmount('');
      } catch (error) {
        console.error('Error adding income:', error);
      }
    }
  };

  const handleAddExpense = async () => {
    if (description && amount) {
      const expenseData = {
        customerId: userInfo.id,
        description,
        spentAmount: parseFloat(amount),
      };
      try {
        await UserService.updateExpense(expenseData);
        await fetchExpenseTrackerData(userInfo.id); // Refresh data after adding expense
        setDescription('');
        setAmount('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = format(new Date(transaction.updatedTs), 'dd MMM yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  const sections = Object.keys(groupedTransactions).map(date => ({
    title: date,
    data: groupedTransactions[date],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Balance</Text>
          <Text style={styles.balanceText}>{savings ? ` ₹ ${savings.toFixed(2)}` : '0.00'}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Income</Text>
          <Text style={styles.incomeText}>{income ? `₹${income.toFixed(2)}` : '0.00'}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Expenses</Text>
          <Text style={styles.expenseText}>{spentAmount ? `₹${spentAmount.toFixed(2)}` : '0.00'}</Text>
        </View>
      </View>

      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputDescription]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Income  " onPress={handleAddIncome} color="#4CAF50" />
      </View>

      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputAmount]}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Expense" onPress={handleAddExpense} color="#F44336" />
      </View>

      <View style={styles.iconsRow}>
        {isSearching ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search transactions..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => setIsSearching(false)}>
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Ionicons name="search-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Ionicons name="filter-outline" size={24} color="black" />
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text style={item.income ? styles.incomeAmount : styles.expenseAmount}>
                {item.income ? `₹${item.income.toFixed(2)}` : `₹${item.spentAmount.toFixed(2)}`}
              </Text>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    padding: 20,
    color: 'black',
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  balanceText: {
    fontSize: 16,
    color: '#d98947',
    paddingBottom: 10,
  },
  incomeText: {
    fontSize: 16,
    color: '#4CAF50',
    paddingBottom: 10,
  },
  expenseText: {
    fontSize: 16,
    color: '#F44336',
    paddingBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  inputDescription: {
    flex: 1,
    marginRight: 10,
  },
  inputAmount: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderColor: '#948e8d',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  
  transactionDescription: {
    fontSize: 16,
    color: '#333',
  flex: 1,

  },
  incomeAmount: {
    fontSize: 16,
    color: '#4CAF50',
     fontWeight: 'bold',
    textAlign: 'right',
  },
  expenseAmount: {
    fontSize: 16,
    color: '#F44336', 
       fontWeight: 'bold',

    textAlign: 'right',
  },
  transactionDate: {
    fontSize: 12,
    color: '#aaa',

  },
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor:'#eae5e5',
    padding:5,
    borderRadius:5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
   
    paddingHorizontal: 0,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
 
});

export default ExpenseTracker;
