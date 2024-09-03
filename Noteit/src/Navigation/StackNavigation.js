import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import BarrowerScreen from '../Screens/BarrowerScreen';
import InterestCalculator from '../Screens/InterestCalculator';
import Navigation from './Navigation';
import BorrowerDetailScreen from '../Screens/BorrowerDetailScreen';
import ExpenseTracker from '../Screens/ExpenseTracker';
import SelfNotes from '../Screens/SelfNotes';
import EmiCalculator from '../Screens/EmiCalculator';
import UpdateExpenseScreen from '../Screens/UpdateExpenseScreen';
import ProfileUpdateScreen from '../Screens/ProfileUpdateScreen';
import BarrowerProfileScreen from '../Screens/BarrowerProfileScreen';
import BugReportScreen from '../Screens/BugReportScreen';
import ChangePasswordScreen from '../Screens/ChangePasswordScreen';

import SettingScreen from '../Screens/SettingScreen';
const StackNavigation = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Hide headers if you want to use custom headers or keep default ones.
            }}
        >
            <Stack.Screen name="Drawer" component={Navigation} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />        
            <Stack.Screen name="InterestCalculator" component={InterestCalculator} />
            <Stack.Screen name="BorrowerDetailScreen" component={BorrowerDetailScreen} />
            <Stack.Screen name="ExpenseTracker" component={ExpenseTracker} />
            <Stack.Screen name="SelfNotes" component={SelfNotes} />
            <Stack.Screen name="EmiCalculator" component={EmiCalculator} />
            <Stack.Screen name="UpdateExpenseScreen" component={UpdateExpenseScreen} />
            <Stack.Screen name="ProfileUpdateScreen" component={ProfileUpdateScreen} />
            <Stack.Screen name="BarrowerProfileScreen" component={BarrowerProfileScreen} />
            <Stack.Screen name="BugReportScreen" component={BugReportScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="BarrowerScreen" component={BarrowerScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
        




            

        </Stack.Navigator>
    )
}

export default StackNavigation