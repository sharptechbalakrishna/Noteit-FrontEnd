import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [rateUnit, setRateUnit] = useState('annual');
  const [totalInterest, setTotalInterest] = useState(null);
  const [interestPerYear, setInterestPerYear] = useState(null);
  const [interestPerMonth, setInterestPerMonth] = useState(null);
  const [interestPerWeek, setInterestPerWeek] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    let t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers.');
      return;
    }

    if (r === 0) {
      setTotalInterest('0.00');
      setInterestPerYear('0.00');
      setInterestPerMonth('0.00');
      setInterestPerWeek('0.00');
      setTotalRepayment(p.toFixed(2));
      return;
    }

    let totalInt;
    let perYearInt = null;
    let perMonthInt;
    let perWeekInt = null;

    let annualRate = r;
    if (rateUnit === 'monthly') {
      annualRate = r * 12;
    } else if (rateUnit === 'weekly') {
      annualRate = r * 52;
    }

    switch (timeUnit) {
      case 'months':
        totalInt = (p * annualRate * t) / 100 / 12;
        perMonthInt = (totalInt / t).toFixed(2);
        break;
      case 'weeks':
        t = t / 4.33;
        totalInt = (p * annualRate * (t * 4.33)) / 100;
        perMonthInt = (totalInt / (t * 4.33)).toFixed(2);
        perWeekInt = (totalInt / (t * 4.33 * 4.33)).toFixed(2);
        break;
      case 'years':
      default:
        totalInt = (p * annualRate * t) / 100;
        perYearInt = (totalInt / t).toFixed(2);
        perMonthInt = (totalInt / (t * 12)).toFixed(2);
        break;
    }

    const totalRepaymentAmount = (p + totalInt).toFixed(2);

    setTotalInterest(totalInt.toFixed(2));
    setInterestPerYear(perYearInt);
    setInterestPerMonth(perMonthInt);
    setInterestPerWeek(perWeekInt);
    setTotalRepayment(totalRepaymentAmount);
  };

  const resetFields = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setTimeUnit('years');
    setRateUnit('annual');
    setTotalInterest(null);
    setInterestPerYear(null);
    setInterestPerMonth(null);
    setInterestPerWeek(null);
    setTotalRepayment(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Interest Calculator</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Principal Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={principal}
          onChangeText={setPrincipal}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.inputLabel}>Interest Rate</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={rate}
            onChangeText={setRate}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.inputLabel}>Interest Rate Tenure</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rateUnit}
              style={styles.picker}
              onValueChange={(itemValue) => setRateUnit(itemValue)}
            >
              <Picker.Item label="Annual" value="annual" />
              <Picker.Item label="Monthly" value="monthly" />
              <Picker.Item label="Weekly" value="weekly" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.inputLabel}>Tenure Units </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={time}
            onChangeText={setTime}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.inputLabel}>Select Tenure</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={timeUnit}
              style={styles.picker}
              onValueChange={(itemValue) => setTimeUnit(itemValue)}
            >
              <Picker.Item label="Annual" value="years" />
              <Picker.Item label="Months" value="months" />
              <Picker.Item label="Weeks" value="weeks" />
            </Picker>
          </View>
        </View>
      </View>



      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCalculate} onPress={calculateInterest}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={resetFields}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {totalInterest !== null && (
        <View style={styles.resultTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCellHeader}>Description</Text>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Interest</Text>
            <Text style={styles.tableCell}>₹{totalInterest}</Text>
          </View>
          {interestPerYear !== null && (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Interest Per Year</Text>
              <Text style={styles.tableCell}>₹{interestPerYear}</Text>
            </View>
          )}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Interest Per Month</Text>
            <Text style={styles.tableCell}>₹{interestPerMonth}</Text>
          </View>
          {interestPerWeek !== null && (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Interest Per Week</Text>
              <Text style={styles.tableCell}>₹{interestPerWeek}</Text>
            </View>
          )}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Repayment</Text>
            <Text style={styles.tableCell}>₹{totalRepayment}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 45,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rowItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerContainer: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 45,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  buttonCalculate: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonReset: {
    flex: 1,
    backgroundColor: '#f44336',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',

  },
  resultTable: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 2,
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default InterestCalculator;
