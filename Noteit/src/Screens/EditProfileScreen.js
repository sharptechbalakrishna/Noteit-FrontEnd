import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Edit Screen</Text>
      <Text>The Profile edit will be done form here</Text>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})