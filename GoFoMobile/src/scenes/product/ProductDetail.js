
import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {FlatList, ImageBackground, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_NAME_KEY} from "../../config/Contants";
import GlobalStyle from "../../style/GlobalStyle";
import Icon from "react-native-vector-icons/AntDesign";
import * as api from "../../services/products";
import ModelList from "../../components/ModelList";


function ProductDetail({navigation}) {
    //const {navigate} = props.navigation;

    let productId = navigation.getParam('productId');
    let type = navigation.getParam('type');
    console.log('MERA ProductDetail ==>  type: ', type);


    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cities, setCities] = useState({});



    function fetchSellingProductDetail() {
        api.getSellingProductDetail(productId).then((response) => {
            console.log('MERA getSellingProductDetail : ',response.data.productName)

        });
    }

    function fetchBuyingProductDetail() {
        api.getBuyingProductDetail(productId).then((response) => {
            console.log('MERA getSellingProductDetail : ',response.data.productName)

        });
    }

    function getDefaultData() {
        if (type === 'SELLING') {
            fetchSellingProductDetail()
        } else {
            fetchBuyingProductDetail()
        }
    }

    useEffect(() => {
        getDefaultData();
    }, []);
    return (
        <View style={styles.container}>
            <Header titleText='Product Detail' navigation={navigation}/>
        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },


});
