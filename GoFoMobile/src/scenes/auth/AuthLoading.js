import React, {useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import { StackActions } from 'react-navigation';

import {TOKEN_KEY, useAuth} from '../../contexts/auth';
//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage'
export default function AuthLoading(props) {
    const {navigate} = props.navigation;
    const { getAuthState } = useAuth();

    useEffect(() => {
        getTokenKey()
    }, []);


    async function getTokenKey() {
        let token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("MERA getTokenKey11   ==> ", token)
        if (token) {
            navigate('App');

        } else navigate('Auth');
    }

    return (
        <View style={{backgroundColor: "#fff", alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <ActivityIndicator/>
            <Text>{"Loading User Data"}</Text>
        </View>
    );
};
