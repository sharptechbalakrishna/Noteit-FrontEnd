import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation'; // Correct import statement
import Entypo from 'react-native-vector-icons/Entypo'; // Correct import statement
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Correct import statement






const MovementScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="rupee-sign" size={75} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Barrower </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconContainer}>
            <Foundation name="clipboard-notes" size={80} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Self Notes</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconContainer}>
            <Entypo name="wallet" size={75} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Expence Tracker</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.iconContainer}>
            <Icon name="calculator" size={75} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Calculator</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: 'white',
  },
  iconContainer: {
    backgroundColor: '#3498db',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default MovementScreen;