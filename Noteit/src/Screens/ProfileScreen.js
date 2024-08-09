import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState, useContext, useCallback } from 'react'
import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import statement
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Correct import statement
import { AuthContext } from '../Context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import UserService from '../UserService/UserService';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileUpdateScreen from './ProfileUpdateScreen';
import AsyncStorage from "@react-native-async-storage/async-storage";


const ProfileScreen = ({ navigation }) => {


    const { userInfo, setUserInfo } = useContext(AuthContext);

    const onPressFavorites = () => {
        console.warn("FavoratePressed");
    }

    // Fetch user info from AsyncStorage
    const fetchUserInfo = async () => {
        try {
            const storedUserInfo = await AsyncStorage.getItem('userInfo');
            if (storedUserInfo) {
                const parsedUserInfo = JSON.parse(storedUserInfo);
                setUserInfo(parsedUserInfo);
            }
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    // Fetch user info whenever the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [])
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }} >
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Icon
                        name="menu"
                        size={25}
                        color="#000"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ProfileUpdateScreen', { customerData: userInfo })}>
                    <Icon
                        name="account-edit-outline"
                        size={29}
                        color="#000"
                    />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.container}>

                <View style={styles.userInfoSection}>
                    {/* <View style={{flexDirection: "row" ,  justifyContent: 'space-between', padding: 10,}}><Text>1</Text><Text>1</Text></View> */}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Avatar.Image
                            source={{
                                uri: 'https://i.ibb.co/N2zmVHw/IMG-20221223-122434.jpg',
                            }}
                            size={80}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Title style={[styles.title, {
                                marginTop: 15,
                                marginBottom: 0,

                            }]}>{userInfo.firstName}</Title>
                            <Caption style={styles.Caption}>{userInfo.userName}</Caption>
                        </View>
                    </View>
                </View>
                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                        <Icon name="map-marker-radius" size={20} color='#777777' />
                        <Text style={{ color: 'green', marginLeft: 10, fontWeight: 'bold' }}>Banglore, India</Text>
                    </View>
                    <View style={styles.row}>
                        <Ionicons name="phone-portrait-outline" size={20} color='#777777' />
                        <Text style={{ color: 'green', marginLeft: 10, fontWeight: 'bold' }}>{userInfo.phone}</Text>
                    </View>
                    <View style={styles.row}>
                        <Icon name="email" size={20} color='#777777' />
                        <Text style={{ color: 'green', marginLeft: 10, fontWeight: 'bold' }}> {userInfo.email}</Text>
                    </View>
                </View>
                <View style={styles.amountBoxWrapper}>
                    <View style={[styles.amountBox, {
                        borderRightColor: "#dddddd",
                        borderRightWidth: 1,
                    }]}>
                        <Title >$ 2454</Title>
                        <Caption>Credit Amount</Caption>
                    </View>
                    <View style={styles.amountBox}>
                        <Title>$ 5454</Title>
                        <Caption>Debit Amount</Caption>
                    </View>

                </View>
                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Icon name="heart-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Your Favorites </Text>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Icon name="credit-card" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Payment </Text>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Icon name="share-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Tell Your Friends</Text>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Icon name="account-check-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Support </Text>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Ionicons name="settings-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Setting </Text>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Ionicons name="settings-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Setting </Text>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Ionicons name="settings-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Setting </Text>

                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={onPressFavorites}>
                        <View style={styles.menueItem}>

                            <Ionicons name="settings-outline" color="#FF6347" size={25} />
                            <Text style={styles.menuItemText}>Setting </Text>

                        </View>
                    </TouchableRipple>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        //    backgroundColor: '#fff' 

    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {

        fontSize: 25,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    amountBoxWrapper: {

        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,

    },
    amountBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {

        marginTop: 10,

    },
    menueItem: {

        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    menuItemText: {

        color: '#777777',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    }


})