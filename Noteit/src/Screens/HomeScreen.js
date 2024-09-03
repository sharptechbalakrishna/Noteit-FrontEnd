import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext } from 'react';
import CustomInput from '../Components/CustomInput';
import { useForm } from "react-hook-form";
import CustomButton from '../Components/CustomButton';
import { AuthContext } from '../Context/AuthContext';
import Carousel from '../Components/Carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; // Correct import statement
import Foundation from 'react-native-vector-icons/Foundation'; // Correct import statement
import Entypo from 'react-native-vector-icons/Entypo'; // Correct import statement

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);

  const onBarrower = () => {
    navigation.navigate('BarrowerScreen');
  }
  const onSelfNotes = () => {
    navigation.navigate('SelfNotes');
  }
  const onExpenseTracker = () => {
    navigation.navigate('ExpenseTracker');
  }
  const onInterestCalculator = () => {
    navigation.navigate('InterestCalculator');
  }
  const { control, handleSubmit, formState: { errors } } = useForm();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ padding: 20 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}> Hello! Welcome back,</Text>
            <Text style={styles.userName}>{userInfo.firstName} {userInfo.lastName}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={styles.profileImage}
              imageStyle={{ borderRadius: 25 }}
            />
          </TouchableOpacity>
        </View>

        <Carousel />

        <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.box} onPress={onBarrower}>
            <ImageBackground
              source={require('../assets/images/Borrower_1.png')}
              style={styles.boxIcon}
            />
            <Text style={styles.boxText}>Borrowers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={onSelfNotes}>
            <ImageBackground
              source={require('../assets/images/Note.png')}
              style={styles.boxIcon}
            />
            <Text style={styles.boxText}>Self Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={onExpenseTracker}>
            <ImageBackground
              source={require('../assets/images/exp_1.png')}
              style={styles.boxIcon}
            />
            <Text style={styles.boxText}>Expense Tracker</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box} onPress={onInterestCalculator}>
            <ImageBackground
              source={require('../assets/images/Calcy_Cal.png')}
              style={styles.boxIcon}
            />
            <Text style={styles.boxText}>Interest Calculator</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#5D8FBB',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
  },
  greeting: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    color: '#ffffff',
  },
  userName: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: '#ffffff',
    paddingLeft:5,
  },
  profileImage: {
    width: 50,
    height: 50,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  box: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
  },
  boxIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,

    color: '#0056b3',
    textAlign: 'center',
  },
});
