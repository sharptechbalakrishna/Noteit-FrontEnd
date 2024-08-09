import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, StyleSheet, } from 'react-native'
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
      <FlashMessage position="bottom" />
    </AuthProvider>
  )
}

export default App