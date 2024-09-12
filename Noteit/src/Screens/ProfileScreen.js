import React, { useContext, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
    const { userInfo, setUserInfo } = useContext(AuthContext);

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

    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Ionicons name="menu-outline" size={28} style={[styles.headerIcon, styles.iconBackground]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileUpdateScreen', { customerData: userInfo })}>
                    <FontAwesome name="pencil" size={28} style={[styles.headerIcon, styles.iconBackground, { backgroundColor: '#ff5722' }]} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: "https://i.ibb.co/dD9rntL/Untitled-design.png" }}
                            style={styles.avatar}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <View style={styles.nameContainer}>
                            <Title style={styles.name}>{userInfo.firstName} {userInfo.lastName}</Title>
                        </View>
                    </View>
                </View>

                {/* Headings for Profile Details */}
                <Text style={styles.heading}>User Name</Text>
                <View style={styles.card}>
                    <View style={styles.detailRow}>
                        <Ionicons name="person-outline" size={24} style={[styles.detailIcon, styles.iconBackground, { backgroundColor: '#ff9966' }]} />
                        <Text style={styles.detailText}>{userInfo.userName}</Text>
                    </View>
                </View>

                <Text style={styles.heading}>Email</Text>
                <View style={styles.card}>
                    <View style={styles.detailRow}>
                        <Ionicons name="mail" size={24} style={[styles.detailIcon, styles.iconBackground, { backgroundColor: '#993300' }]} />
                        <Text style={styles.detailText}>{userInfo.email}</Text>
                    </View>
                </View>
                <Text style={styles.heading}>Phone Number</Text>

                <View style={styles.card}>
                    <View style={styles.detailRow}>
                        <FontAwesome name="phone" size={26} style={[styles.detailIcon, styles.iconBackground, { backgroundColor: '#2196f3' }]} />
                        <Text style={styles.detailText}>{userInfo.phone}</Text>
                    </View>
                </View>

                {/* <Text style={styles.heading}>Address</Text>
                <View style={styles.card}>
                    <View style={styles.detailRow}>
                        <MaterialCommunityIcons name="map-marker" size={24} style={[styles.detailIcon, styles.iconBackground, { backgroundColor: '#4caf50' }]} />
                        <Text style={styles.detailText}>Bangalore, India</Text>
                    </View>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#0056b3', // Dark blue background for the header
    },
    headerIcon: {
        color: '#fff',
    },
    iconBackground: {
        borderRadius: 16,
        padding: 8,
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        width: width * 0.4, // Adjust size as needed
        height: width * 0.4, // Adjust size as needed
        borderRadius: (width * 0.4) / 2, // Half of width/height to make it circular
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#fff', // Border color for better visibility
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: (width * 0.4) / 2,
        resizeMode: 'cover',
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: 20,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2, // This is for Android shadow
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIcon: {
        color: '#fff',
        marginRight: 10,
        padding: 8,
        borderRadius: 16,
    },
    detailText: {
        fontSize: 16,
        color: '#333',
    },
});
