import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Logo_2 from "../assets/images/Logo_2.png";
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Context/AuthContext';
import CustomFlashMessage from '../Components/CustomFlashMessage';

const SignInScreen = () => {

    const { login } = useContext(AuthContext);

    const navigation = useNavigation();

    const { control, handleSubmit, formState: { errors } } = useForm();

    const [successMessage, setSuccessMessage] = useState('');

    const { height } = useWindowDimensions();

    const onSignInPressed = async (data) => {
        try {
            await login({
                phoneNumber: `+91${data.phoneNumber}`,  // Concatenate +91 with the user input
                password: data.password
            });
            CustomFlashMessage('success', 'Success', 'Logged In Successfully!');
        } catch (error) {
            console.error("Sign In error:", error);
            CustomFlashMessage('error', 'Login Failed', 'Provide valid phone and password!');
        }
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
        navigation.navigate('ForgetPasswordScreen');
    }

    const singnUpPressed = () => {
        console.warn("Singn Up Pressed");
        navigation.navigate('SignUpScreen');
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image source={Logo_2} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
                <Text style={styles.title}>
                    Sign In to your account
                </Text>

                <CustomInput
                    control={control}
                    name='phoneNumber'
                    placeholder='Phone Number'
                    keyboardType='numeric'
                    secureTextEntry={false}
                    maxLength={10}
                    prefix='+91'  // Add prefix here
                    rules={{
                        required: 'Phone Number Required',
                        minLength: { value: 10, message: 'Phone Number Should be 10 Digits' },
                        maxLength: { value: 10, message: 'Phone Number Should be 10 Digits' }
                    }}
                />

                <CustomInput
                    control={control}
                    name='password'
                    rules={{
                        required: 'Password Required',
                        minLength: { value: 3, message: 'Password Should be at least 3 characters' }
                    }}
                    placeholder='Password'
                    secureTextEntry={true}
                />

                <CustomButton
                    text="Sign In"
                    onPress={handleSubmit(onSignInPressed)}
                    type="PRIMARY"
                />
                {successMessage ? (
                    <Text style={{ marginTop: 20, color: 'green', fontSize: 16, textAlign: 'center' }}>{successMessage}</Text>
                ) : null}

                <CustomButton
                    text="Forgot Password?"
                    onPress={onForgotPasswordPressed} type="TERTIARY"
                />

                <CustomButton
                    text="Don't have an account? Sign Up"
                    onPress={singnUpPressed}
                    type="TERTIARY"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    }
});

export default SignInScreen;
