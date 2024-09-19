import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, } from 'react-native';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import UserService from '../UserService/UserService';

const ForgetPasswordScreen = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm();
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/;
    const [loading, setLoading] = useState(false);

    const onSendPressed = async (data) => {
        const { email } = data;

        try {
            setLoading(true);
            console.log('Email for password reset:', email);
            const response = await UserService.passwordforgot({ email });
            console.log("Response Data:", response);
            
            navigation.navigate('VerifyOtpScreen', { email });
            Alert.alert('Success', response.message);

        } catch (error) {
            console.error("Error during password reset:", error);
            Alert.alert('Error', 'Something went wrong, please try again!');
        }
        finally {
           setLoading(false);
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Enter your email address</Text>
                <CustomInput
                    control={control}
                    name="email"
                    placeholder="Email"
                    secureTextEntry={false}
                    rules={{
                        required: 'Email required',
                        pattern: {
                            value: emailRegex,
                            message: 'Invalid email format'
                        }
                    }}
                />
                <CustomButton
                    text="Send"
                    loading={loading} // Pass loading prop to disable button
                    onPress={handleSubmit(onSendPressed)}
                    type="PRIMARY"
                />
                <CustomButton
                    text="Back to Sign In"
                    onPress={() => navigation.navigate('SignInScreen')}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,                     // Allows the container to fill the available space
        justifyContent: 'center',   // Centers the content vertically
        alignItems: 'center',       // Centers the content horizontally
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        marginBottom: 20, // Space between title and input field
    },
});


export default ForgetPasswordScreen;
