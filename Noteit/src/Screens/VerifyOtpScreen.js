import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import UserService from '../UserService/UserService';
import { useState } from 'react';

const VerifyOtpScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const pwd = watch('newPassword'); // Watch the new password field
    const [loading, setLoading] = useState(false);

    const onSubmitPressed = async (data) => {
        const { otp, newPassword } = data;
        const { email } = route.params;

        try {
            setLoading(true);
            console.log('OTP and New Password:', otp, newPassword);
            const response = await UserService.verifyOtpAndSetPassword({ email, otp, newPassword });
            console.log("Response Data:", response);
            Alert.alert('Success', 'Password reset successful!');
            navigation.navigate('SignInScreen');
        } catch (error) {
            console.error("Error during OTP verification and password reset:", error);
            Alert.alert('Error', 'Something went wrong, please try again!');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset Your Password</Text>
            <CustomInput
                name="otp"
                control={control}
                placeholder="Enter OTP"
                rules={{ required: 'OTP is required' }}
                error={errors.otp}
                style={styles.input}
            />
            <CustomInput
                name="newPassword"
                control={control}
                placeholder="New Password"
                secureTextEntry
                rules={{ required: 'New Password is required' }}
                error={errors.newPassword}
                style={styles.input}
            />
            <CustomInput
                name="reenterPassword"
                control={control}
                placeholder="Re-enter New Password"
                secureTextEntry
                rules={{
                    validate: value => value === pwd || 'Passwords do not match',
                }}
                error={errors.reenterPassword}
                style={styles.input}
            />
            <CustomButton
                text="Reset Password"
                onPress={handleSubmit(onSubmitPressed)}
                loading={loading} // Pass loading prop to disable button
                type="PRIMARY"
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,

        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 20,
    },
});

export default VerifyOtpScreen;
