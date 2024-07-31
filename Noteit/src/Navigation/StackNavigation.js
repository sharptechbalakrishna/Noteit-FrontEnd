import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import BarrowerScreen from '../Screens/BarrowerScreen';
import InterestCalculator from '../Screens/InterestCalculator';
import Navigation from './Navigation';
import BorrowerDetailScreen from '../Screens/BorrowerDetailScreen';

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
            <Stack.Screen name="BarrowerScreen" component={BarrowerScreen} />
            <Stack.Screen name="InterestCalculator" component={InterestCalculator} />
            <Stack.Screen name="BorrowerDetailScreen" component={BorrowerDetailScreen} />

        </Stack.Navigator>
    )
}

export default StackNavigation