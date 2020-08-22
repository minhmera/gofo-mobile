import React from 'react'

import {Text, FAB, List} from 'react-native-paper'
import { View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY} from '../../contexts/auth';


function ProfilePage1({navigation}) {
    //const {navigate} = props.navigation;
    async function logout() {
        AsyncStorage.clear()
        let token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("MERA ProfilePage1  props1   ==> ", token)
        navigation.navigate('Auth')
    }
    return (
        <View>
            <Header titleText='Login'/>
            <Text onPress = {()=> logout()}  >
                Log out
            </Text>
        </View>
    )
}

export default ProfilePage1
