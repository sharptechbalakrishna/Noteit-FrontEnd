import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";


const ForgetPasswordScreen = (forgotpassword) => {

    const navigation = useNavigation();

    const { control, handleSubmit, formState : {errors} } = useForm();


    const onSendPressed = () => {
        console.warn("Send Sucessfully");
        console.warn(forgotpassword);
        navigation.navigate('NewPasswordScreen');
    }

    const onBacktoSignInPressed = () => {
        console.warn("onBacktoSignInPressed");
        navigation.navigate('SignInScreen');
    }

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}>
            <View
                style={styles.root}>

                <Text style={styles.title}> Reset Your Password </Text>
                <CustomInput

                    control={control}
                    name="email"
                    placeholder='Email'
                    secureTextEntry={false}
                    rules={{ required: 'Email required', }}
                />
                <CustomButton
                    text="Send"
                    onPress={handleSubmit(onSendPressed)}
                    type="PRIMARY"
                />

                <CustomButton text="Back to Sign In " onPress={onBacktoSignInPressed} type="TERTIARY" />
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

export default ForgetPasswordScreen