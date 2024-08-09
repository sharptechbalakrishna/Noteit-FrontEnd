import 'react-native-gesture-handler';
import React from 'react'
import { SafeAreaView, StyleSheet, } from 'react-native'
import FlashMessage from 'react-native-flash-message';
import { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/Navigation/AppNav';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';


const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: 'green',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'green',
        borderRightWidth: 7,
        backgroundColor: '#e0ffe0', // Light green background
        borderRadius: 10, // Rounded corners
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
        color: '#006400', // Dark green text
      }}
      text2Style={{
        fontSize: 14,
        color: '#006400', // Dark green text
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text2NumberOfLines={3}
      style={{
        borderLeftColor: 'red',
        borderLeftWidth: 7,
        width: '90%',
        height: 70,
        borderRightColor: 'red',
        borderRightWidth: 7,
        backgroundColor: '#ffe0e0', // Light red background
        borderRadius: 10, // Rounded corners
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
        color: '#8b0000', // Dark red text
      }}
      text2Style={{
        fontSize: 14,
        color: '#8b0000', // Dark red text
      }}
    />
  ),
};

const App = () => {
  return (
    <AuthProvider>
      <AppNav />
      <FlashMessage/>
      <Toast config={toastConfig}/>
    </AuthProvider>
  )
}

export default App