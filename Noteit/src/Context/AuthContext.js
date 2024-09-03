import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import UserService from "../UserService/UserService";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    // const login = async (data) => {
    //     setIsLoading(true);
    //     const { phoneNumber, password } = data;

    //     try {
    //         const response = await UserService.login(phoneNumber, password)
    //         let userInfo = response;
    //         setUserInfo(userInfo);
    //         setUserToken(userInfo.id);

    //         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    //         AsyncStorage.setItem('userToken', JSON.stringify(userInfo.id));
    //         AsyncStorage.setItem('userToken', JSON.stringify(userInfo.id));

    //         console.log("User Info", userInfo);
    //         console.log("User Token by id ", userInfo.id);

    //     } catch (error) {
    //         throw error;
    //     } finally {
    //         setIsLoading(false);
    //     }


    //     // AsyncStorage.setItem('userToken', 'token');
    //     setIsLoading(false);
    // }



    const login = async (data) => {
        setIsLoading(true);
        const { phoneNumber, password } = data;
    
        try {
            const userInfo = await UserService.login(phoneNumber, password);
            setUserInfo(userInfo);
            setUserToken(userInfo.jwtToken);  // Use jwtToken from the response
    
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            await AsyncStorage.setItem('userToken', userInfo.jwtToken);  // Save JWT token
    
            console.log("User Info", userInfo);
            console.log("User Token", userInfo.jwtToken);
    
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };




    const logout = async () => {

        setIsLoading(true);
        try {

            await UserService.logout(userInfo.id);
            setUserToken(null);
            AsyncStorage.removeItem('userInfo');
            AsyncStorage.removeItem('userToken');
        } catch (error) {
            console.log("Error : ", error);

        } finally {
            setIsLoading(false);
        }

    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);
            if (userInfo) {

                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);

        } catch {
            console.log(`isLOgged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}