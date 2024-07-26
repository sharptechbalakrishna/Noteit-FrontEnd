import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form'

const CustomInput = ({ control, name, rules = {}, placeholder, secureTextEntry }) => {


  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null); // Clear error message after 5 seconds
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer); // Clean up the timer on unmount or state change
    }
  }, [errorMessage]);

  return (

    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (

            <Text style={{ color: 'red', alignSelf: 'stretch' }}>{error.message || "Error"}</Text>
          )}
        </>
      )}
    />

  )
}

export default CustomInput

const styles = StyleSheet.create({
  container: {

    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {

  }
})