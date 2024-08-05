import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { Avatar, Title, Caption, TouchableRipple, } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Correct import statement
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Correct import statement
import { AuthContext } from '../Context/AuthContext';

const ProfileScreen = () => {


    const { userInfo } = useContext(AuthContext);

    const onPressFavorites = () => {
        console.warn("FavoratePressed");
    }
    return (
        <ScrollView style={styles.container}>
           
            <View style={styles.userInfoSection}>
            {/* <View style={{flexDirection: "row" ,  justifyContent: 'space-between', padding: 10,}}><Text>1</Text><Text>1</Text></View> */}
                <View style={{ flexDirection: 'row', marginTop: 15 }}>
                    <Avatar.Image
                        source={{
                            uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                        }}
                        size={80}
                    />
                    <View style={{ marginLeft: 20 }}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 0,

                        }]}>{userInfo.name}</Title>
                        <Caption style={styles.Caption}>{userInfo.id}</Caption>
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
                    <Text style={{ color: 'green', marginLeft: 10, fontWeight: 'bold' }}>{userInfo.email}</Text>
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
    )
}

export default ProfileScreen

const styles = StyleSheet.create({

    container: {
        flex: 1,
        // marginBottom: 25,

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