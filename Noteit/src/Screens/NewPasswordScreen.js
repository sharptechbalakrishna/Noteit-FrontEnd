import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";



const NewPasswordScreen = () => {

    const navigation = useNavigation();

    const { control, handleSubmit, formState : {errors} } = useForm();

    const onSubmitPressed = (resetpassword) => {

        console.warn("Submit Sucessfully");
        console.warn(resetpassword);
        navigation.navigate('SignInScreen');
    }

    const onBacktoSignInPressed = () => {

        console.warn("onBacktoSignInPressed");
        navigation.navigate('SignInScreen');
    }

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}> New Password </Text>
                <CustomInput
                    control={control}
                    name="code"
                    placeholder='Enter your Code'
                    secureTextEntry={false}
                    rules={{ required: 'Code Required', }}
                />

                <CustomInput
                    control={control}
                    name="password"
                    placeholder='Passwowrd'
                    secureTextEntry={true}
                    rules={{ required: 'Password Required', }}
                />
                <CustomButton
                    text="Submit"
                    onPress={handleSubmit(onSubmitPressed)}
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

export default NewPasswordScreen