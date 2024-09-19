import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext'; // Ensure AuthContext is correctly imported
import UserService from '../UserService/UserService';
import CustomFlashMessage from '../Components/CustomFlashMessage';
import { CommonActions } from '@react-navigation/native';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Formats to "MM/DD/YYYY" or "DD/MM/YYYY" depending on locale
};

const BarrowerProfileScreen = ({ route, navigation }) => {
    const { barrowerData } = route.params;
    const { userInfo,userToken } = useContext(AuthContext); // Get userInfo from AuthContext

    useEffect(() => {
        if (userInfo && userInfo.id) {
            console.log("BD",barrowerData);
            // Perform any setup or fetch operations if needed
        }
    }, [userInfo]);

    const deleteBorrower = async () => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete this borrower ${barrowerData.borrowerName}?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            const response = await UserService.deleteBorrower(userInfo.id, barrowerData.id, userToken);
                            console.log(response);
                            
                            // First go back to the previous screen
                            navigation.goBack();
                            
                            // Then go back to the BorrowerScreen and refresh it
                            navigation.dispatch(
                                CommonActions.navigate({
                                    name: 'BarrowerScreen',
                                })
                            );
    
                            CustomFlashMessage('success', 'Success', 'Borrower deleted successfully!');
                        } catch (error) {
                            console.error('Error deleting borrower:', error.response ? error.response.data : error.message);
                            CustomFlashMessage('error', 'Error', 'Failed to delete Borrower.');
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Borrower Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileHeader}>
                    {barrowerData.profileImageUrl ? (
                        <Image
                            source={{ uri: barrowerData.profileImageUrl }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.initialsContainer}>
                            <Text style={styles.initialsText}>{barrowerData.borrowerName.charAt(0).toUpperCase()}</Text>
                        </View>
                    )}
                    <Text style={styles.nameText}>{barrowerData.borrowerName}</Text>
                    <Text style={styles.roleText}>Nick Name</Text>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>

                    <View style={styles.infoRow}>
                        <Icon name="call-outline" size={24} color="#1976D2" />
                        <Text style={styles.infoLabel}>Phone Number:</Text>
                        <Text style={styles.infoText}>{barrowerData.phoneNumber}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="mail-outline" size={24} color="#1976D2" />
                        <Text style={styles.infoLabel}>Email:</Text>
                        <Text style={styles.infoText}>{barrowerData.email}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="checkmark-circle-outline" size={24} color="#1976D2" />
                        <Text style={styles.infoLabel}>Credit Status:</Text>
                        <Text style={styles.infoText}>{barrowerData.creditStatus}</Text>
                    </View>
                </View>

                <View style={styles.loanContainer}>
                    <Text style={styles.sectionTitle}>Loan Details</Text>

                    <View style={styles.infoRow}>
                        <Icon name="calendar-outline" size={24} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Borrowed Date:</Text>
                        <Text style={styles.infoText}>{formatDate(barrowerData.borrowedDate)}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="calendar-outline" size={24} color="#D32F2F" />
                        <Text style={styles.infoLabel}>End Date:</Text>
                        <Text style={styles.infoText}>{formatDate(barrowerData.endDate)}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="cash-outline" size={24} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Principal Amount:</Text>
                        <Text style={styles.infoText}>{barrowerData.principalAmount}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="trending-up-outline" size={24} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Interest Rate:</Text>
                        <Text style={styles.infoText}>{barrowerData.interestRate}%</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="time-outline" size={24} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Loan Period:</Text>
                        <Text style={styles.infoText}>{barrowerData.timePeriodNumber} {barrowerData.timePeriodUnit}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="checkmark-circle-outline" size={24} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Status:</Text>
                        <Text style={styles.infoText}>{barrowerData.status || "N/A"}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="checkmark-circle-outline" size={24} color="#D32F2F" />
                        <Text style={styles.infoLabel}>Credit Basis:</Text>
                        <Text style={styles.infoText}>{barrowerData.creditBasis || "N/A"}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.deleteButton} onPress={deleteBorrower}>
                    <Icon name="trash-outline" size={24} color="#fff" />
                    <Text style={styles.deleteButtonText}>Delete Borrower</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#1976D2',
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    profileHeader: {
        backgroundColor: '#1976D2',
        paddingVertical: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,

    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
    },
    initialsContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#BBDEFB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    initialsText: {
        fontSize: 36,
        color: '#1976D2',
        fontWeight: 'bold',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    roleText: {
        fontSize: 16,
        color: '#BBDEFB',
        marginTop: 5,
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    loanContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#1976D2',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 16,
        color: '#555',
        marginLeft: 10,
        flex: 1,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D32F2F',
        paddingVertical: 15,
        borderRadius: 25,
        marginTop: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 5,
        elevation: 3,
    },
    deleteButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default BarrowerProfileScreen;
