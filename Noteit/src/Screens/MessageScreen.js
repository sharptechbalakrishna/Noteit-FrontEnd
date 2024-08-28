import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const itemSize = width / 2 - 30; // Adjust this value for spacing

const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item}>
          <Image
            source={require('../assets/images/Borrower.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Borrower</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={require('../assets/images/SelfNotes.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Self NOtes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.item}>
          <Image
            source={require('../assets/images/ExpenseTracker.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Expence Tracker</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image
            source={require('../assets/images/Calcu.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>Calculator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10
  },
  item: {
    width: itemSize,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    marginBottom: 0,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MessageScreen;