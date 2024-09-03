import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import SignInScreen from '../Screens/SignInScreen'
import SignUpScreen from '../Screens/SignUpScreen'
import ForgetPasswordScreen from '../Screens/ForgetPasswordScreen'
import VerifyOtpScreen from '../Screens/VerifyOtpScreen'
import NewPasswordScreen from '../Screens/NewPasswordScreen'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen'





const Auth = () => {


    const Stack = createStackNavigator();

    return (
    
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                <Stack.Screen name="ForgetPasswordScreen" component={ForgetPasswordScreen} />
                <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
                <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen} />
                <Stack.Screen name="HomeScreen" component={HomeScreen} />


                {/* <Stack.Screen name="Setting" component={Setting} /> */}

            </Stack.Navigator>
           
    

    )
}

export default Auth

const styles = StyleSheet.create({})