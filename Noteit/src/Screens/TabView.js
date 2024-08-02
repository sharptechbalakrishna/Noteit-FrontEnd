// TabView.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const TabView = ({ selectedTab, setSelectedTab, reversedLedgerData, ledgerData }) => {
  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'card' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('card')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'card' && styles.tabButtonTextActive]}>Card View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'table' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('table')}
        >
          <Text style={[styles.tabButtonText, selectedTab === 'table' && styles.tabButtonTextActive]}>Table View</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'card' ? (
        <ScrollView style={styles.scrollView}>
          {reversedLedgerData.map((item, index) => (
            <View style={styles.card} key={index}>
              <Text style={styles.cardMonth}>{item.month}</Text>
              <View style={styles.cardContent}>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>S No:</Text>
                  <Text style={styles.cardData}>{item.no}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Int Amt:</Text>
                  <Text style={styles.cardData}>{item.intAmt}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Days:</Text>
                  <Text style={styles.cardData}>{item.days}</Text>
                </View>
                <View style={styles.cardRow}>
                  <Text style={styles.cardLabel}>Int per day:</Text>
                  <Text style={styles.cardData}>{item.intPerDay}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={styles.table}>
            <View style={styles.tableRowHeader}>
              <Text style={styles.tableHeaderText}>S No.</Text>
              <Text style={styles.tableHeaderText}>Int Amt</Text>
              <Text style={styles.tableHeaderText}>Month</Text>
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
  },
  tabButtons: {
    flexDirection: 'row',
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
    borderColor: '#AD40AF',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  tabButtonActive: {
    backgroundColor: '#AD40AF',
  },
  tabButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#AD40AF',
  },
  tabButtonTextActive: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    borderColor: '#dee2e6',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardMonth: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 15,
  },
  cardContent: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    borderColor: '#ced4da',
    borderWidth: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#ced4da',
    borderBottomWidth: 1,
  },
  cardLabel: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#495057',
  },
  cardData: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: '#212529',
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
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: 'black',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default TabView;
