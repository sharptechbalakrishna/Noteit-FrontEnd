import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

const BASE_URL = 'http://192.168.3.53:8080';

const ExpenseTracker = () => {
  const { userInfo } = useContext(AuthContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [savings, setSavings] = useState(0);
  const [spentAmount, setSpentAmount] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetchExpenseTrackerData(userInfo.id);
    }
  }, [userInfo]);

  const fetchExpenseTrackerData = async (customerId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get-expense-tracker`, {
        params: { customerId },
      });
      console.log('Fetched Expense Tracker Data:', response.data);

      const sortedTransactions = response.data.transactions.sort((a, b) => new Date(b.createdTs) - new Date(a.createdTs));

      setTransactions(sortedTransactions);
      setSavings(response.data.savings);
      setSpentAmount(response.data.spentAmount);
      setIncome(response.data.income);
    } catch (error) {
      console.error('Error fetching expense tracker:', error);
    }
  };

  const handleAddIncome = async () => {
    if (description && amount) {
      console.log('Add Income - Description:', description, 'Amount:', amount);
      const expenseData = {
        customerId: userInfo.id,
        description,
        income: parseFloat(amount),
      };
      try {
        await axios.post(`${BASE_URL}/update-expense`, expenseData);
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
      console.log('Add Expense - Description:', description, 'Amount:', amount);
      const expenseData = {
        customerId: userInfo.id,
        description,
        spentAmount: parseFloat(amount),
      };
      try {
        await axios.post(`${BASE_URL}/update-expense`, expenseData);
        await fetchExpenseTrackerData(userInfo.id); // Refresh data after adding expense
        setDescription('');
        setAmount('');
      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Balance</Text>
          <Text style={styles.balanceText}>{`₹${savings.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Income</Text>
          <Text style={styles.incomeText}>{`₹${income.toFixed(2)}`}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Expenses</Text>
          <Text style={styles.expenseText}>{`₹${spentAmount.toFixed(2)}`}</Text>
        </View>
       
      </View>

      {/* First Row: Description and Add Income Button */}
      <View style={styles.formRow}>
        <TextInput
          style={[styles.input, styles.inputDescription]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Income  " onPress={handleAddIncome} color="#4CAF50" />
      </View>

      {/* Second Row: Amount and Add Expense Button */}
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
        <Ionicons name="search-outline" size={24} color="black" />
        <Ionicons name="filter-outline" size={24} color="black" />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionDescription}>{item.description}</Text>
            <Text style={item.income ? styles.incomeAmount : styles.expenseAmount}>
              {item.income ? `₹${item.income.toFixed(2)}` : `₹${item.spentAmount.toFixed(2)}`}
            </Text>
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
    color: '#333',
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
    borderColor: 'black',
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
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
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
    marginBottom: 10,
    elevation: 2,
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
});

export default ExpenseTracker;
