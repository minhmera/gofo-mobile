
import React from 'react'

import {Text, FAB, List} from 'react-native-paper'
import { View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_NAME_KEY} from "../../config/Contants";


function SellingProduct({navigation}) {
    //const {navigate} = props.navigation;

    let categoryItem = navigation.getParam('categoryItem');
    console.log('MERA SellingProduct ==>  ', categoryItem.title_vi);

    return (
        <View >
            <Header titleText='Selling List' navigation={navigation}/>

        </View>
    )
}

export default SellingProduct
