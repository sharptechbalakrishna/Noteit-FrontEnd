import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BorrowerDetailScreen = ({ route }) => {
  const { borrowerName, principalAmount } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Borrower Details</Text>
      <Text style={styles.detail}>Name: {borrowerName}</Text>
      <Text style={styles.detail}>Principal Amount: {principalAmount}</Text>
      {/* You can add more details here if needed */}
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
