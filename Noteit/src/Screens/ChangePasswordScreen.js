import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useForm } from "react-hook-form";
import CustomFlashMessage from '../Components/CustomFlashMessage';
import UserService from '../UserService/UserService';
import { AuthContext } from '../Context/AuthContext';
import { ActivityIndicator } from 'react-native';

const ChangePasswordScreen = ({ navigation }) => {
    const { userToken, userInfo } = useContext(AuthContext); // Use AuthContext

    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const pwdWatch = watch('password');
    const [loading, setLoading] = useState(false);

    const onSubmitPressed = async (data) => {

        setLoading(true); // Set loading state
        console.log('-----');
        console.log(data, userToken);

        try {
            const response = await UserService.changePassword({
                customerId: userInfo.id, // Ensure userInfo.id is set correctly
                oldPassword: data.oldPassword, // Ensure these field names match with your backend
                newPassword: data.password,
                confirmPassword: data.passwordRepeat
            }, userToken);

            console.log('data', response);

            CustomFlashMessage('success', 'Success', 'Password Changed!');
            navigation.goBack();


        } catch (error) {
            CustomFlashMessage('error', 'Error', 'Something Went Wrong!');
        } finally {
            
            setLoading(false);  // Set loading to false after API call
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Change Password</Text>
                <CustomInput
                    control={control}
                    name="oldPassword"
                    placeholder='Old Password'
                    secureTextEntry={true}
                    rules={{
                        required: 'Password Required',
                        minLength: { value: 4, message: 'Password Should be at least 4 characters' }
                    }}
                />
                <CustomInput
                    control={control}
                    name="password"
                    placeholder='New Password'
                    secureTextEntry={true}
                    rules={{
                        required: 'Password Required',
                        minLength: { value: 4, message: 'Password Should be at least 4 characters' }
                    }}
                />
                <CustomInput
                    control={control}
                    name="passwordRepeat"
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    rules={{
                        required: 'Confirm Password Required',
                        validate: value => value === pwdWatch || 'Passwords do not match'
                    }}
                />
                <CustomButton
                    text="Change Password"
                    onPress={handleSubmit(onSubmitPressed)}
                    loading={loading} // Pass loading prop to disable button
                    type="PRIMARY"
                />
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'grey',
        marginVertical: '10',
    },
    link: {
        color: '#FDB075',
    }
});

export default ChangePasswordScreen;
