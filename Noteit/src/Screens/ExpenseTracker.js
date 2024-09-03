import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserService from '../UserService/UserService';
import { AuthContext } from '../Context/AuthContext';
import { format } from 'date-fns';

const ExpenseTracker = () => {
  const { userInfo, userToken } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [savings, setSavings] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [income, setIncome] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItemId, setExpandedItemId] = useState(null); // Track expanded item

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
      const data = await UserService.fetchExpenseTrackerData(customerId, userToken);
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
        await UserService.updateExpense(expenseData, userToken); // Pass userToken here
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
        await UserService.updateExpense(expenseData, userToken); // Pass userToken here
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

  const toggleExpand = (id) => {
    setExpandedItemId(prevId => (prevId === id ? null : id)); // Toggle expanded item
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Balance</Text>
          <Text style={styles.balanceText}>{savings ? `₹ ${savings.toFixed(2)}` : '₹ 0.00'}</Text>
        </View>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Income</Text>
          <Text style={styles.incomeText}>{income ? `₹${income.toFixed(2)}` : '₹ 0.00'}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Expenses</Text>
          <Text style={styles.expenseText}>{spentAmount ? `₹${spentAmount.toFixed(2)}` : '₹ 0.00'}</Text>
        </View>
      </View>

      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputDescription]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
         

        />
        <TextInput
          style={[styles.input, styles.inputAmount]}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        

        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.incomeButton]} onPress={handleAddIncome}>
          <Text style={styles.buttonText}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.expenseButton]} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>Expense</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconsRow}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={24} color="black" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search transactions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionDetails}>
              <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <Text style={styles.transactionDescription}>
                  {expandedItemId === item.id || item.description.length <= 13
                    ? item.description
                    : `${item.description.substring(0, 13)}...`}
                </Text>
              </TouchableOpacity>
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
    backgroundColor: '#f4f9fc',
    padding: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  balanceText: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: '#ff9933',
  },

  incomeText: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: '#4CAF50',
  },
  expenseText: {
    fontSize: 22,
    // fontWeight: 'bold',
    color: '#F44336',
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  inputDescription: {
    flex: 1,
    height: 50,
  },
  inputAmount: {
    flex: 1,
    keyboardType: 'numeric',
    height: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  incomeButton: {
    backgroundColor: '#4CAF50',
  },
  expenseButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconsRow: {
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: '#d1d5db',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
  },
  incomeAmount: {
    fontSize: 16,
    color: '#4CAF50',
  },
  expenseAmount: {
    fontSize: 16,
    color: '#F44336',
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',

  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

export default ExpenseTracker;
