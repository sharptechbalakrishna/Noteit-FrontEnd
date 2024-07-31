import { View, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './Auth';
import { AuthContext } from '../Context/AuthContext';
import StackNavigation from './StackNavigation';

const AppNav = () => {
    const { isLoading, userToken } = useContext(AuthContext);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
    return (
        <NavigationContainer>
            {userToken !== null ? <StackNavigation /> : <Auth />}
        </NavigationContainer>
    );
};

export default AppNav;
