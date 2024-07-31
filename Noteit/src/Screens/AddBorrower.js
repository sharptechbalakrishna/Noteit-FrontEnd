import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { AuthContext } from '../Context/AuthContext';


const AddBorrower = ({ visible, onClose, addBorrower }) => {
    const { userInfo } = useContext(AuthContext);

    const [borrowerName, setBorrowerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [principalAmount, setPrincipalAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [creditBasis, setCreditBasis] = useState('Free Hands');
    const [creditStatus, setCreditStatus] = useState('Unsecured');
    const [timePeriodUnit, setTimePeriodUnit] = useState('Months');
    const [timePeriodNumber, setTimePeriodNumber] = useState('');
    const [borrowedDate, setBorrowedDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [showBorrowedDatePicker, setShowBorrowedDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    useEffect(() => {
        if (borrowedDate && endDate) {
            const diffInYears = endDate.getFullYear() - borrowedDate.getFullYear();
            const diffInMonths = endDate.getMonth() - borrowedDate.getMonth() + (diffInYears * 12);
            const diffInWeeks = Math.floor((endDate - borrowedDate) / (1000 * 60 * 60 * 24 * 7));

            if (timePeriodUnit === 'Years') {
                setTimePeriodNumber(diffInYears.toString());
            } else if (timePeriodUnit === 'Months') {
                setTimePeriodNumber(diffInMonths.toString());
            } else if (timePeriodUnit === 'Weeks') {
                setTimePeriodNumber(diffInWeeks.toString());
            }
        }
    }, [borrowedDate, endDate, timePeriodUnit]);

    useEffect(() => {
        if (!visible) {
            handleClear();
        }
    }, [visible]);

    const handleSubmit = async () => {
        const borrowerData = {
            borrowerName,
            phoneNumber,
            email,
            principalAmount: parseFloat(principalAmount),
            interestRate: parseFloat(interestRate),
            creditBasis,
            creditStatus,
            timePeriodUnit,
            timePeriodNumber: parseInt(timePeriodNumber),
            borrowedDate,
            endDate,
        };

        try {
            const response = await fetch(`http://192.168.3.53:8080/${userInfo.id}/borrowers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(borrowerData),
            });

            if (!response.ok) {
                throw new Error('Failed to add borrower');
            }

            const data = await response.json();
            addBorrower(borrowerData);
            handleClear();
            onClose();
        } catch (error) {
            console.error('Error adding borrower:', error);
            alert('Failed to add borrower. Please check your network connection and try again.');
        }
    };

    const handleClear = () => {
        setBorrowerName('');
        setPhoneNumber('');
        setEmail('');
        setPrincipalAmount('');
        setInterestRate('');
        setCreditBasis('Free Hands');
        setCreditStatus('Unsecured');
        setTimePeriodUnit('Months');
        setTimePeriodNumber('');
        setBorrowedDate(null);
        setEndDate(null);
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Add Borrower</Text>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Borrower Name"
                            value={borrowerName}
                            onChangeText={setBorrowerName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Principal Amount"
                            keyboardType="numeric"
                            value={principalAmount}
                            onChangeText={setPrincipalAmount}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Interest Rate"
                            keyboardType="numeric"
                            value={interestRate}
                            onChangeText={setInterestRate}
                        />

                        <TouchableOpacity style={styles.input} onPress={() => setShowBorrowedDatePicker(true)}>
                            <Text style={styles.dateText}>{borrowedDate ? borrowedDate.toDateString() : 'Borrowed Date'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.input} onPress={() => setShowEndDatePicker(true)}>
                            <Text style={styles.dateText}>{endDate ? endDate.toDateString() : 'End Date'}</Text>
                        </TouchableOpacity>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Time Period:</Text>
                            <View style={styles.pickerContainer}>
                                <TextInput
                                    style={styles.numberInput}
                                    placeholder="Number"
                                    keyboardType="numeric"
                                    value={timePeriodNumber}
                                    onChangeText={setTimePeriodNumber}
                                />
                                <TouchableOpacity
                                    style={styles.selectInput}
                                    onPress={() => {
                                        const newUnit = timePeriodUnit === 'Months' ? 'Weeks' : timePeriodUnit === 'Weeks' ? 'Years' : 'Months';
                                        setTimePeriodUnit(newUnit);
                                    }}>
                                    <Text style={styles.selectText}>{timePeriodUnit}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Credit Details:</Text>
                            <View style={styles.creditDetailsContainer}>
                                <TouchableOpacity
                                    style={styles.selectInput}
                                    onPress={() => {
                                        const newBasis = creditBasis === 'Free Hands' ? 'Pledge' : 'Free Hands';
                                        setCreditBasis(newBasis);
                                        setCreditStatus(newBasis === 'Free Hands' ? 'Unsecured' : 'Secure');
                                    }} >
                                    <Text style={styles.selectText}>{creditBasis}</Text>
                                </TouchableOpacity>
                                <Text style={styles.creditStatus}>{creditStatus}</Text>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.clearButton, { backgroundColor: '#FF6347' }]} // Custom color for Clear button
                                onPress={handleClear}
                            >
                                <Text style={styles.buttonText}>Clear</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.submitButton, { backgroundColor: '#32CD32' }]} // Custom color for Save button
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                <DatePicker
                    modal
                    mode="date"
                    open={showBorrowedDatePicker}
                    date={borrowedDate || new Date()}
                    onConfirm={(date) => {
                        setShowBorrowedDatePicker(false);
                        setBorrowedDate(date);
                    }}
                    onCancel={() => {
                        setShowBorrowedDatePicker(false);
                    }}
                />
                <DatePicker
                    modal
                    mode="date"
                    open={showEndDatePicker}
                    date={endDate || new Date()}
                    onConfirm={(date) => {
                        setShowEndDatePicker(false);
                        setEndDate(date);
                    }}
                    onCancel={() => {
                        setShowEndDatePicker(false);
                    }}
                />
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '95%',
        maxHeight: '75%',
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 25,
        elevation: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 15,
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 20,
        color: '#333333',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#AD40AF',
        marginBottom: 15,
        fontSize: 18,
        paddingVertical: 10,
    },
    dateText: {
        fontSize: 18,
        color: '#333333',
    },
    fieldContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 5,
    },
    creditDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AD40AF',
        paddingVertical: 10,
        justifyContent: 'center',
    },
    selectText: {
        fontSize: 18,
        color: '#333333',
    },
    creditStatus: {
        fontSize: 18,
        color: '#007bff',
        fontWeight: '600',
        marginLeft: 10,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    numberInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#AD40AF',
        paddingVertical: 10,
        fontSize: 18,
        marginRight: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    clearButton: {
        flex: 1,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
    },
});

export default AddBorrower;
