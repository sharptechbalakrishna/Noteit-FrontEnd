import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import CustomFlashMessage from '../Components/CustomFlashMessage';



const ChangePasswordScreen = ({navigation}) => {
;

    const { control, handleSubmit, watch, formState: { errors } } = useForm();

    const pwdWatch = watch('password');
    const onSubmitPressed = (data) => {
        console.log(data);

        try {

            // Need to call the api here
            CustomFlashMessage('success', 'Success', 'Password Changed!');

            navigation.navigate('SettingScreen');
        } catch (error) {
            CustomFlashMessage('error', 'Error', 'Somthing Went Wrong!');
        }
    }

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}> Change Password </Text>
                <CustomInput
                    control={control}
                    name="password"
                    placeholder='Passwowrd'
                    secureTextEntry={true}
                    rules={{
                        required: 'Password Required',
                        minLength: { value: 4, message: 'Password Should be at least 4 charecter' }
                    }}
                />
                <CustomInput
                    control={control}
                    name="passwordRepeat"
                    placeholder='Confirm Passwowrd'
                    secureTextEntry={false}
                    rules={{ required: 'Confirm Passord Required', validate: value => value == pwdWatch || 'Password Do not Match' }}
                />
                <CustomButton
                    text="Change Passowrd"
                    onPress={handleSubmit(onSubmitPressed)}
                    type="PRIMARY"
                />
            </View>
        </ScrollView>
    )
}

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
})

export default ChangePasswordScreen