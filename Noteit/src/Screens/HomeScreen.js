import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import CustomInput from '../Components/CustomInput';
import { useForm, Controller } from "react-hook-form";
import CustomButton from '../Components/CustomButton';
import { AuthContext } from '../Context/AuthContext';
import Carousel from '../Components/Carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Correct import statement
import Foundation from 'react-native-vector-icons/Foundation'; // Correct import statement
import Entypo from 'react-native-vector-icons/Entypo'; // Correct import statement
import InterestCalculator from './InterestCalculator';


const HomeScreen = ({ navigation }) => {


  const { userInfo } = useContext(AuthContext);

  const onBarrower = () => {
    // console.warn("Barrower Pressed");
    navigation.navigate('BarrowerScreen');

  }
  const onSelfNotes = () => {
    console.warn("SelfNotes Pressed");
    navigation.navigate('SelfNotes');

  }
  const onExpenseTracker = () => {
    console.warn("ExpenseTracker Pressed");
    navigation.navigate('ExpenseTracker');

  }
  const onInterestCalculator = () => {
    console.warn("InterestCalculator Pressed");
    navigation.navigate('InterestCalculator');

  }
  const onemiCalculator = () => {
    console.warn(" Emi Calculator Pressed");
    navigation.navigate('EmiCalculator');

  }
  const onDraggableBox = () => {
    navigation.navigate('DraggableBox');

  }

  const { control, handleSubmit, formState: { errors } } = useForm();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 20 }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <Text style={{ fontSize: 18, fontFamily: 'Roboto-Medium', color: 'black' }}>Hello {userInfo.firstName}</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={{ width: 35, height: 35 }}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>
        <Carousel />
        <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.box} onPress={onBarrower}>
            <FontAwesome5 name="rupee-sign" color="#45D48D" size={100} />
            <Text style={styles.boxText}>Borrowers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={onSelfNotes}>
            <Foundation name="clipboard-notes" color="#45D48D" size={100} />
            <Text style={styles.boxText}>Self Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={onExpenseTracker}>
            <Entypo name="wallet" color="#45D48D" size={100} />
            <Text style={styles.boxText}>Expense Tracker</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onInterestCalculator}>
            <ImageBackground
              source={require('../assets/images/Cal.png')}
              style={styles.boxIcon}
            />
            <Text style={styles.boxText}>Interest Calculator</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={onemiCalculator}>

            <Text style={styles.boxText}>EMI Calculator</Text>


          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={onDraggableBox}>

            <Text style={styles.boxText}>DraggableBox</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>

    </SafeAreaView >
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  box: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#e0e0e0',
    // ImageBackground: linear-gradient(to, bottom, '#7fb3e6', '#1d4f91'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  boxIcon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});