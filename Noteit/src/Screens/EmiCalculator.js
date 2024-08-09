import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [rateUnit, setRateUnit] = useState('annual');
  const [emi, setEmi] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [emiPerYear, setEmiPerYear] = useState(null);

  const calculateEmi = () => {
    const p = parseFloat(principal);
    let r;
    let n = parseFloat(time);

    if (isNaN(p) || isNaN(n)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers.');
      return;
    }

    if (parseFloat(rate) === 0) {
      // Special case for 0% interest
      setEmi((p / n).toFixed(2));
      setTotalPayment(p.toFixed(2));
      setTotalInterest('0.00');
      setEmiPerYear((p / n * 12).toFixed(2));
      return;
    }

    if (rateUnit === 'annual') {
      r = parseFloat(rate) / 12 / 100; // Annual rate converted to monthly
    } else {
      r = parseFloat(rate) / 100; // Monthly rate
    }

    if (timeUnit === 'years') {
      n = n * 12; // Convert years to months
    } 

    const emiCalc = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiCalc * n;
    const totalInt = totalPay - p;
    const emiYr = emiCalc * 12; // EMI per year

    setEmi(emiCalc.toFixed(2));
    setTotalPayment(totalPay.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
    setEmiPerYear(emiYr.toFixed(2));
  };

  const resetFields = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setTimeUnit('years');
    setRateUnit('annual');
    setEmi(null);
    setTotalPayment(null);
    setTotalInterest(null);
    setEmiPerYear(null);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>EMI Calculator</Text>
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
          <Text style={styles.inputLabel}>Interest Rate (%)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={rate}
            onChangeText={setRate}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.inputLabel}>Interest Rate Unit</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rateUnit}
              style={styles.picker}
              onValueChange={(itemValue) => setRateUnit(itemValue)}
            >
              <Picker.Item label="Annual" value="annual" />
              <Picker.Item label="Monthly" value="monthly" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.rowItem}>
          <Text style={styles.inputLabel}>Tenure</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={time}
            onChangeText={setTime}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.inputLabel}>Select Tenure Unit</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={timeUnit}
              style={styles.picker}
              onValueChange={(itemValue) => setTimeUnit(itemValue)}
            >
              <Picker.Item label="Years" value="years" />
              <Picker.Item label="Months" value="months" />
            </Picker>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonCalculate} onPress={calculateEmi}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonReset} onPress={resetFields}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      {emi !== null && (
        <View style={styles.resultTable}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCellHeader}>Description</Text>
            <Text style={styles.tableCellHeader}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>EMI per Month</Text>
            <Text style={styles.tableCell}>₹{emi}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Repayment</Text>
            <Text style={styles.tableCell}>₹{totalPayment}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>EMI per Year</Text>
            <Text style={styles.tableCell}>₹{emiPerYear}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total Interest</Text>
            <Text style={styles.tableCell}>₹{totalInterest}</Text>
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
    height: 45,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: {
    height: 45,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  buttonCalculate: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonReset: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 100,
  },
  resultTable: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});

export default EmiCalculator;
