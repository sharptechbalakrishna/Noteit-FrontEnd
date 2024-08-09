import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import SettingScreen from '../Screens/SettingScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import IconIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


const TabNavigator = () => {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                // tabBarInactiveTintColor: '#fff',
                tabBarActiveTintColor: 'tomato',

                tabBarStyle: {
                    backgroundColor: '#f9f9f9',

                    elevation: 5, // Add shadow for Android
                    shadowOpacity: 0.1, // Add shadow for iOS
                    shadowRadius: 10, // Add shadow for iOS
                    borderRadius: 30, // Round all corners
                    marginBottom: 5,
                    height: 70
                    // position: 'absolute',
                    // padding: 1,
                    // borderTopWidth: 0,


                }




            }}>
            <Tab.Screen name='HomeStack' component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconIcons name="home-outline" color={color} size={size} />
                    ),
                }} />
            <Tab.Screen name='Setting' component={SettingScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <IconIcons name='settings-outline' color={color} size={size} />
                    ),
                }} />
            <Tab.Screen name='Profile' component={ProfileScreen}
                options={{
                    headerTitle: false,

                    // headerLeft: () => (
                    //     <Icon.Button
                    //         name="menu"
                    //         size={25}
                    //         backgroundColor="#fff"
                    //         color="grey"
                    //         onPress={() => navigation.openDrawer()} />
                    // ),
                    // headerRight: () => (

                    //     <MaterialCommunityIcons.Button
                    //         name="account-edit-outline"
                    //         size={29}
                    //         backgroundColor="#fff"
                    //         color="#000"
                    //         onPress={() => navigation.navigate('ProfileUpdateScreen')} />

                    // ),
                    tabBarIcon: ({ color, size }) => (
                        <IconIcons name="person-outline" color={color} size={size} />
                    ),

                }}
            />
        </Tab.Navigator>

    )
}

export default TabNavigator