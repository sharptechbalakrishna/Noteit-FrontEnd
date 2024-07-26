import { View, Text, ActivityIndicator } from 'react-native'
import React, { useContext } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import Auth from './Auth'
import Navigation from './Navigation'
import { AuthContext } from '../Context/AuthContext'

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
            {userToken !== null ? <Navigation /> : <Auth />}
        </NavigationContainer>


    )
}

export default AppNav