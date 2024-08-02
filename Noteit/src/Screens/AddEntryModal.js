import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';

const AddEntryModal = ({ visible, onClose, onSubmit, borrowerName }) => {
  const [interestAmount, setInterestAmount] = useState('');

  const handleAddEntry = () => {
    onSubmit({ interestAmount });
    setInterestAmount('');
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Details</Text>
          <Text style={styles.borrowerName}>{borrowerName}</Text>
          <TextInput
            style={styles.input}
            placeholder="Interest Amount"
            value={interestAmount}
            onChangeText={setInterestAmount}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleAddEntry} color="#007bff" />
            <View style={styles.buttonSpacer} />
            <Button title="Cancel" onPress={onClose} color="red" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  borrowerName: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSpacer: {
    width: 10,
  },
});

export default AddEntryModal;
