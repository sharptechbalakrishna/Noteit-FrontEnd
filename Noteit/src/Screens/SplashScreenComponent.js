// src/components/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const SplashScreenComponent = () => {
  useEffect(() => {
    // Hide the native splash screen after 2 seconds
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Logo_2.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to MyApp</Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SplashScreenComponent;
