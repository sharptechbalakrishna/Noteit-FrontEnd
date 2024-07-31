import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BorrowerDetailScreen = ({ route }) => {
  const { borrowerName, principalAmount } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Barrower Name: {borrowerName}</Text>
        <Text style={styles.detailText}>Borrowed Date: 25-Nov-23</Text>
        <Text style={styles.detailText}>End Date: 24-Oct-24</Text>
        <Text style={styles.detailText}>P Amt: {principalAmount}</Text>
        <Text style={styles.detailText}>Int %: 5%</Text>
        <Text style={styles.detailText}>Borrowed Basis: Pledge</Text>
        <Text style={styles.detailText}>Period: 12 Months</Text>
        <Text style={styles.detailText}>Loan/Credit Status: Secured</Text>
        <Text style={styles.detailText}>Status: Closed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default BorrowerDetailScreen;
