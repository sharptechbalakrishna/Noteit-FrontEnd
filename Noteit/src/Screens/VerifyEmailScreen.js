import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';

const VerifyEmailScreen = () => {

    const [code, setCode] = useState('');
    // const [email, setEmail] = useState(''); Kept for Future Use

    const onVerifyPressed = () => {
        console.warn("Verify Sucessfully");
    }

    const onBacktoSignInPressed = () => {
        console.warn("onBacktoSignInPressed");
    }
    const onResendCodePressed = () => {
        console.warn("onResendCodePressed");
    }
    return (

        <ScrollView
            showsVerticalScrollIndicator={false}>
            <View
                style={styles.root}>

                <Text style={styles.title}> Verify Your Email </Text>

                {/* <CustomInput         Kept for Feautrure use
                    placeholder='Email'
                    value={email}
                    setValue={setEmail}
                    secureTextEntry={false}
                /> */}

                <CustomInput
                    placeholder='Enter your Verification code'
                    value={code}
                    setValue={setCode}
                    secureTextEntry={true}
                />
                <CustomButton
                    text="Verify"
                    onPress={onVerifyPressed}
                    type="PRIMARY"
                />

                <CustomButton
                    text="Resend Code "
                    onPress={onResendCodePressed}
                    type="SECONDARY"
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

export default VerifyEmailScreen