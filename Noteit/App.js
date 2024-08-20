import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, StyleSheet, } from 'react-native'
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { name as appName } from './app.json';



const App = () => {
  return (
    <AuthProvider>
      <AppNav />
      <FlashMessage/>
    </AuthProvider>
  )
}

export default App