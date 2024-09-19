import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Menu, Divider, Provider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const BorrowerDetailView = ({
    selectedTab,
    setSelectedTab,
    reversedLedgerData,
    ledgerData,
    onhandleEdit,
    onhandleDelete,
    lastBefore
}) => {

    const [visible, setVisible] = useState(null);
    const openMenu = (index) => setVisible(index);
    const closeMenu = () => setVisible(null);

    const handleEdit = () => {
        closeMenu();
        onhandleEdit()
    };

    const handleDelete = () => {
        // Your delete logic here
        closeMenu();
        onhandleDelete(lastBefore)

    };

    return (
        <Provider>
            <SafeAreaView>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={{ paddingBottom: 20 }}>
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tabButton, selectedTab === 'card' && styles.tabButtonActive]}
                                onPress={() => setSelectedTab('card')}
                            >
                                <Text style={[styles.tabButtonText, selectedTab === 'card' && styles.tabButtonTextActive]}>Card View</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tabButton, selectedTab === 'table' && styles.tabButtonActive]}
                                onPress={() => setSelectedTab('table')}
                            >
                                <Text style={[styles.tabButtonText, selectedTab === 'table' && styles.tabButtonTextActive]}>Table View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {selectedTab === 'card' ? (
                        reversedLedgerData.map((item, index) => (
                            <View style={styles.card} key={index}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardMonth}>{item.month}</Text>
                                    {(item.id === lastBefore && reversedLedgerData.length > 1) && (
                                        <Menu
                                            visible={visible === index}
                                            onDismiss={closeMenu}
                                            anchor={
                                                <TouchableOpacity onPress={() => openMenu(index)}>
                                                    <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                                                </TouchableOpacity>
                                            }
                                        >
                                            <Menu.Item onPress={handleEdit} title="Edit" />
                                            <Menu.Item onPress={handleDelete} title="Delete" />
                                            <Divider />
                                            <Menu.Item onPress={closeMenu} title="Cancel" />
                                        </Menu>
                                    )}
                                </View>
                                <View style={styles.cardContent}>
                                    <View style={styles.cardRow}>
                                        <Text style={styles.cardLabel}>S No:</Text>
                                        <Text style={styles.cardData}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <Text style={styles.cardLabel}>Int Amt:</Text>
                                        <Text style={styles.cardData}>{item.interestAmount}</Text>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <Text style={styles.cardLabel}>Days:</Text>
                                        <Text style={styles.cardData}>{item.days}</Text>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <Text style={styles.cardLabel}>Principal Amount:</Text>
                                        <Text style={styles.cardData}>{item.principalAmount}</Text>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <Text style={styles.cardLabel}>Locked:</Text>
                                        <Text style={styles.cardData}>{item.locked ? "Paid" : "Pending"}</Text>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <Text style={styles.cardLabel}>Interest Paid:</Text>
                                        <Text style={styles.cardData}>{item.interestPaid}</Text>
                                    </View>
                                    <View style={styles.cardRow}>
                                        <Text style={styles.cardLabel}>Status:</Text>
                                        <Text style={styles.cardData}>{item.status}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.table}>
                            <View style={styles.tableRowHeader}>
                                <Text style={styles.tableHeaderText}>S No.</Text>
                                <Text style={styles.tableHeaderText}>Int Amt</Text>
                                <Text style={styles.tableHeaderText}>Month</Text>
                                <Text style={styles.tableHeaderText}>Days</Text>
                                <Text style={styles.tableHeaderText}>Principal Amount</Text>
                                <Text style={styles.tableHeaderText}>Locked</Text>
                                <Text style={styles.tableHeaderText}>Interest Paid</Text>
                                <Text style={styles.tableHeaderText}>Status</Text>
                            </View>
                            {ledgerData.map((item, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{index + 1}</Text>
                                    <Text style={styles.tableCell}>{item.interestAmount}</Text>
                                    <Text style={styles.tableCell}>{item.month}</Text>
                                    <Text style={styles.tableCell}>{item.days}</Text>
                                    <Text style={styles.tableCell}>{item.principalAmount}</Text>
                                    <Text style={styles.tableCell}>{item.interestPaid}</Text>
                                    <Text style={styles.tableCell}>{item.status}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        padding: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        height: 44,
        width: '100%',
        backgroundColor: '#C0C0C0',
        borderRadius: 10,
        borderColor: '#AD40AF',
        justifyContent: 'center',
    },
    tabButton: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C0C0C0',
    },
    tabButtonActive: {
        backgroundColor: '#AD40AF',
    },
    tabButtonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#AD40AF',
    },
    tabButtonTextActive: {
        color: 'white',
    },
    card: {
        borderColor: '#dee2e6',
        borderWidth: 1,
        padding: 15,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardMonth: {
        fontSize: 22,
        fontFamily: 'Roboto-Bold',
        color: '#007bff',
    },
    cardContent: {
        backgroundColor: '#f8f9fa',
        borderRadius: 10,
        padding: 15,
        borderColor: '#ced4da',
        borderWidth: 1,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomColor: '#ced4da',
        borderBottomWidth: 1,
    },
    cardLabel: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#495057',
        flex: 1,
    },
    cardData: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: '#212529',
        flex: 1,
        textAlign: 'right',
    },
    table: {
        borderWidth: 1,
        borderColor: '#ddd',
    },
    tableRowHeader: {
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        padding: 10,
    },
    tableHeaderText: {
        flex: 1,
        fontFamily: 'Roboto-Bold',
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tableCell: {
        flex: 1,
        fontFamily: 'Roboto-Regular',
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default BorrowerDetailView;
