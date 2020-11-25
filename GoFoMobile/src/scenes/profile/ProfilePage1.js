import React from 'react'

import {Text, FAB, List} from 'react-native-paper'
import { View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_NAME_KEY} from "../../config/Contants";


function ProfilePage1({navigation}) {
    //const {navigate} = props.navigation;
    async function logout() {
        AsyncStorage.clear()
        let token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("MERA ProfilePage1  props1   ==> ", token)
        navigation.navigate('Auth')
    }

    async function testFunc() {
        let userName = await AsyncStorage.getItem(USER_NAME_KEY);
        console.log('MERA ==> userName  ',userName)
    }
    return (
        <View >
            <Header titleText='Login'/>
            <Text style={{height:50, textAlign:'center'}} onPress = {()=> logout()}  >
                Log out
            </Text>
            <Text style={{height:50,textAlign:'center'}} onPress = {()=> testFunc()}  >
                Test some thing here (check log to watch what happen)
            </Text>
        </View>
    )
}

export default ProfilePage1
