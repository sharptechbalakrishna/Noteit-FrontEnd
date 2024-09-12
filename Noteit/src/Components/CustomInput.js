import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules = {},
  maxLength,
  keyboardType,
  defaultValue,
  prefix
}) => {

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
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View style={[styles.container, { borderColor: error ? 'red' : '#e8e8e8' }]}>
            {prefix && <Text style={styles.prefix}>{prefix}</Text>}
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              maxLength={maxLength}
              keyboardType={keyboardType}
            />
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  prefix: {
    fontSize: 16,
    color: '#051C60',
    marginRight: 10,
  },
  input: {
    flex: 1,
  }
});

export default CustomInput;
