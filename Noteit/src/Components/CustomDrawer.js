import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Context/AuthContext';

const CustomDrawer = (props) => {

    const { logout, userInfo } = useContext(AuthContext);


    const onLogoutPressed = () => {
        Alert.alert(
            "Logout Confirmation",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Logout Cancelled"),
                    style: "cancel"
                },
                {
                    text: "Logout",
                    onPress: () => logout(),
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    }
    return (

        <View style={{ flex: 1, }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                <ImageBackground

                    source={require("../assets/images/menu-bg.jpeg")}
                    style={{ padding: 20 }} >
                    <Image
                        source={require('../assets/images/user-profile.jpg')}
                        style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                    />
                    <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Robot-Medium' }}>  {userInfo.firstName}</Text>

                </ImageBackground>

                <View style={{ flex: 1, backgroundColor: '#ffff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 8, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                {/* <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Ionicons name='share-social-outline' size={22} />
                        <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Robot-Medium', marginLeft: 10, }}> Tell your Friends</Text>
                    </View>

                </TouchableOpacity> */}
                <TouchableOpacity onPress={onLogoutPressed} style={styles.logoutButton}>
                    <View style={styles.logoutContainer}>
                        <Ionicons name='exit-outline' size={22} style={styles.logoutIcon} />
                        <Text style={styles.logoutText}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logoutButton: {
        paddingVertical: 15,
    },
    logoutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutIcon: {
        color: '#FF4500', // Customize the color of the icon
    },
    logoutText: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'Roboto-Medium',
        marginLeft: 10,
        color: '#FF4500', // Customize the color of the text
    },
});

export default CustomDrawer;