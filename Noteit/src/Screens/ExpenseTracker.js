import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

const LedgerScreen = () => {

  const ledgerData = [
    { no: 1, intAmt: '7,500.00', month: 'November', days: 30, intPerDay: '250.00', daysCompleted: 6, actualIntTillDate: '1,500.00', status: 'PAID' },
    { no: 2, intAmt: '7,500.00', month: 'December', days: 31, intPerDay: '241.94', daysCompleted: 31, actualIntTillDate: '7,500.00', status: 'PAID' },
    { no: 3, intAmt: '7,500.00', month: 'January', days: 31, intPerDay: '241.94', daysCompleted: 31, actualIntTillDate: '7,500.00', status: 'PAID' },
    { no: 4, intAmt: '7,500.00', month: 'February', days: 29, intPerDay: '258.62', daysCompleted: 29, actualIntTillDate: '7,500.00', status: 'PAID' },
    { no: 5, intAmt: '7,500.00', month: 'March', days: 31, intPerDay: '241.94', daysCompleted: 0, actualIntTillDate: '7,500.00', status: 'PAID' },
    { no: 6, intAmt: '7,500.00', month: 'April', days: 30, intPerDay: '250.00', daysCompleted: 30, actualIntTillDate: '7,500.00', status: 'PAID' },
    { no: 7, intAmt: '7,500.00', month: 'May', days: 31, intPerDay: '241.94', daysCompleted: 31, actualIntTillDate: '7,500.00', status: 'DUE' },
    { no: 8, intAmt: '7,500.00', month: 'June', days: 30, intPerDay: '250.00', daysCompleted: 30, actualIntTillDate: '7,500.00', status: 'DUE' },
    { no: 9, intAmt: '7,500.00', month: 'July', days: 31, intPerDay: '241.94', daysCompleted: 31, actualIntTillDate: '3,870.97', status: 'DUE' },
    { no: 10, intAmt: '7,500.00', month: 'August', days: 31, intPerDay: '241.94', daysCompleted: 0, actualIntTillDate: '-', status: 'CLOSED' },
    { no: 11, intAmt: '7,500.00', month: 'September', days: 30, intPerDay: '250.00', daysCompleted: 0, actualIntTillDate: '-', status: 'CLOSED' },
    { no: 12, intAmt: '7,500.00', month: 'October', days: 31, intPerDay: '241.94', daysCompleted: 0, actualIntTillDate: '-', status: 'CLOSED' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello Shravankumar</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>Borrowed Date: 25-Nov-23</Text>
          <Text style={styles.detailText}>End Date: 24-Oct-24</Text>
          <Text style={styles.detailText}>P Amt: 10000</Text>
          <Text style={styles.detailText}>Int %: 5%</Text>
          <Text style={styles.detailText}>Borrowed Basis: Pledge</Text>
          <Text style={styles.detailText}>Period: 12 Months</Text>
          <Text style={styles.detailText}>Loan/Credit Status: Secured</Text>
          <Text style={styles.detailText}>Status: Closed</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <Text style={styles.tableHeaderText}>S No.</Text>
            <Text style={styles.tableHeaderText}>Int Amt</Text>
            <Text style={styles.tableHeaderText}>Months</Text>
            <Text style={styles.tableHeaderText}>Days</Text>
            <Text style={styles.tableHeaderText}>Int per day</Text>
            <Text style={styles.tableHeaderText}>Days completed</Text>
            <Text style={styles.tableHeaderText}>Actual Int till date</Text>
            <Text style={styles.tableHeaderText}>Status</Text>
          </View>

          {ledgerData.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={styles.tableCell}>{item.no}</Text>
              <Text style={styles.tableCell}>{item.intAmt}</Text>
              <Text style={styles.tableCell}>{item.month}</Text>
              <Text style={styles.tableCell}>{item.days}</Text>
              <Text style={styles.tableCell}>{item.intPerDay}</Text>
              <Text style={styles.tableCell}>{item.daysCompleted}</Text>
              <Text style={styles.tableCell}>{item.actualIntTillDate}</Text>
              <Text style={styles.tableCell}>{item.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    color: 'black',
  },
  detailsContainer: {
    marginBottom: 20,
    // flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    marginBottom: 5,


  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontFamily: 'Roboto-Bold',
    color: 'black',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 14,
  },
});

export default LedgerScreen;
