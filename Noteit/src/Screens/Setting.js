import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Setting = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Setting Screen</Text>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {

        fontSize: 35,
        color: 'blue',

    }
})