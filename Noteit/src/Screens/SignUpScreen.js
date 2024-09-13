import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import UserService from '../UserService/UserService';
import { ActivityIndicator } from 'react-native-paper';
import CustomFlashMessage from '../Components/CustomFlashMessage';


const SignUpScreen = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const { control, handleSubmit, watch } = useForm({
        // defaultValues:{
        //     phoneNumber: "9449983623"
        // }
    });
    const Email_Pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,}$/
    const pwdWatch = watch('password');


    // const onSignUpPressed = async (register) => {

    //     console.log("SignUp Successfully");  // While Deploying need to Commit this line
    //     console.log("In Sign UP", register);               // While Deploying need to Commit this line

    //     try {
    //         const response = await UserService.register(register);

    //         console.log("Response Data in Sign up:", response.data);
    //         navigation.navigate('SignInScreen');
    //     } catch (error) {
    //         console.error("Signup:", error);
    //     }
    // }

    const onSignUpPressed = async (register) => {
        console.log("In Sign UP", register);
        setIsLoading(true);
    
        try {
            const response = await UserService.register({
                firstName: register.firstName,
                userName: register.userName,
                phone: `+91${register.phone}`,
                email: register.email,
                password: register.password
            });
    
            CustomFlashMessage('success', 'Success', 'Registered Successfully!');
            navigation.navigate('SignInScreen');
        } catch (error) {
            console.error("Signup Error:", error);
            console.error("Error Response:", error.response?.data); // Log the actual error response
            
            // Handle different error statuses
            let errorMessage = 'Something Went Wrong!';
            if (error.response?.status === 409) {
                errorMessage = 'Phone number or email already registered.';
            } else if (error.response?.status === 400) {
                errorMessage = 'Invalid data. Please check the form.';
            } else if (error.response?.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            }
    
            // Display the appropriate error message to the user
            CustomFlashMessage('error', 'Error', errorMessage);
        }
    
        setIsLoading(false);
    };
    


    const onSignPressed = () => {

        console.warn("SingnIn Pressed");
        navigation.navigate('SignInScreen');
    }
    const onTermsOfUsePressed = () => {
        console.warn("Terms of use pressed");
    }
    const onPrivacyPolicyPressed = () => {
        console.warn("Privacy Policy Pressed");
    }

    if (isLoading) {
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
    return (

        <ScrollView
            showsVerticalScrollIndicator={false}>
            <View
                style={styles.root}>

                <Text style={styles.title}> Create an accoount </Text>

                <CustomInput
                    control={control}
                    name="firstName"
                    placeholder='Name'
                    secureTextEntry={false}
                    rules={{ required: 'Name Required' }}
                />
                <CustomInput
                    control={control}
                    name="userName"
                    placeholder='User Name'
                    secureTextEntry={false}
                    rules={{ required: 'Name Required' }}
                />
                <CustomInput
                    control={control}
                    name="phone"
                    placeholder='PhoneNumber'
                    secureTextEntry={false}
                    keyboardType='numeric'
                    prefix='+91'  // Add prefix here
                    maxLength={10}
                    rules={{
                        required: 'Phone Number Required',
                        minLength: { value: 10, message: 'Phone Number Exactly 10 Digits' },
                    }}
                />

                <CustomInput
                    control={control}
                    name="email"
                    placeholder='Email'
                    secureTextEntry={false}
                    rules={{ required: 'Email required', pattern: { value: Email_Pattern, message: 'Email is Invalid' } }}
                />

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
                    text="SignUp"
                    onPress={handleSubmit(onSignUpPressed)}
                    type="PRIMARY"
                />

                <Text style={styles.text}>By SignUp, you confirm that you accept our
                    <Text style={styles.link} onPress={onTermsOfUsePressed}> Terms of Use </Text> and
                    <Text style={styles.link} onPress={onPrivacyPolicyPressed}> Privacy Policy </Text>
                </Text>

                <CustomButton text="Have an a account ? SignIn " onPress={onSignPressed} type="TERTIARY" />

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

export default SignUpScreen