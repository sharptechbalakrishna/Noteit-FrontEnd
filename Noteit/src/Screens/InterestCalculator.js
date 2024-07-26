import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
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

    let totalInt;
    let perYearInt = null;
    let perMonthInt;
    let perWeekInt = null;

    switch (timeUnit) {
      case 'months':
        totalInt = (p * r * t) / 100;
        perMonthInt = (totalInt / t).toFixed(2);
        break;
      case 'weeks':
        t = t / 4.33; // Convert weeks to months
        totalInt = (p * r * (t * 4.33)) / 100; // Calculate total interest based on weeks
        perMonthInt = (totalInt / (t * 4.33)).toFixed(2); // Calculate monthly interest based on total weeks
        perWeekInt = (totalInt / (t * 4.33 * 4.33)).toFixed(2); // Calculate weekly interest
        break;
      case 'years':
      default:
        totalInt = (p * r * t) / 100;
        perYearInt = (totalInt / t).toFixed(2);
        perMonthInt = (totalInt / (t * 12)).toFixed(2); // Convert annual interest to monthly
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
    setTotalInterest(null);
    setInterestPerYear(null);
    setInterestPerMonth(null);
    setInterestPerWeek(null);
    setTotalRepayment(null);
  };

  const saveData = () => {
    console.log('Saved Data:', { principal, rate, time, timeUnit, totalInterest, interestPerYear, interestPerMonth, interestPerWeek, totalRepayment });
    Alert.alert('Success', 'Data saved successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Interest Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Principal Amount"
        keyboardType="numeric"
        value={principal}
        onChangeText={setPrincipal}
      />
      <TextInput
        style={styles.input}
        placeholder="Interest Rate (%)"
        keyboardType="numeric"
        value={rate}
        onChangeText={setRate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        keyboardType="numeric"
        value={time}
        onChangeText={setTime}
      />
      <Picker
        selectedValue={timeUnit}
        style={styles.picker}
        onValueChange={(itemValue) => setTimeUnit(itemValue)}
      >
        <Picker.Item label="Years" value="years" />
        <Picker.Item label="Months" value="months" />
        <Picker.Item label="Weeks" value="weeks" />
      </Picker>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateInterest}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveData}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetFields}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      {totalInterest !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Total Interest: ₹{totalInterest}</Text>
          {interestPerYear !== null && (
            <Text style={styles.result}>Interest Per Year: ₹{interestPerYear}</Text>
          )}
          <Text style={styles.result}>Interest Per Month: ₹{interestPerMonth}</Text>
          {interestPerWeek !== null && (
            <Text style={styles.result}>Interest Per Week: ₹{interestPerWeek}</Text>
          )}
          <Text style={styles.result}>Total Repayment: ₹{totalRepayment}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 45,
    borderColor: '#aaa',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 5,
    color: '#333',
  },
});

export default InterestCalculator;
