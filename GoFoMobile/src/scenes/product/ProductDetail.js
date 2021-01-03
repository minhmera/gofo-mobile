import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {ScrollView, FlatList, ImageBackground, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_NAME_KEY} from "../../config/Contants";
import GlobalStyle from "../../style/GlobalStyle";
import Icon from "react-native-vector-icons/AntDesign";
import * as api from "../../services/products";
import ModelList from "../../components/ModelList";
import Carousel from '../../components/Carousel'

function ProductDetail({navigation}) {
    //const {navigate} = props.navigation;

    let productId = navigation.getParam('productId');
    let type = navigation.getParam('type');
    console.log('MERA ProductDetail ==>  type: ', type);


    const [sellingData, setSellingData] = useState(null);
    const [buyingData, setBuyingData] = useState(null);


    function fetchSellingProductDetail() {
        api.getSellingProductDetail(productId).then((response) => {
            console.log('MERA getSellingProductDetail : ', response.data.productName)
            setSellingData(response.data)
        });
    }

    function fetchBuyingProductDetail() {
        api.getBuyingProductDetail(productId).then((response) => {
            console.log('MERA getBuyingProductDetail : ', response.data.productName)
            setBuyingData(response.data)

        });
    }


    function renderProductImages(item) {
        if (item === null) {
            return null
        } else {
            if (item.photoUrls === null) {
                return null
            }
        }
        /* At the moment just show 1  */
        console.log('MERA  renderProductImages    ', item)
        let images = item.photoUrls
        let image = images[0]
        /*return (
            <View style={styles.productImageContainer}>
                <ImageBackground style={styles.productImage} source={{uri: image}}>

                </ImageBackground>
                <View style={{height: 2, backgroundColor: GlobalStyle.colour.grayColor}}></View>
            </View>
        )*/

        return (
            <View style={styles.productImageContainer}>
                <Carousel
                    slideList = { images}
                />
                <View style={{height: 2, backgroundColor: GlobalStyle.colour.grayColor}}></View>
            </View>
        )
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
            <ScrollView>
                {renderInfo()}
            </ScrollView>

        </View>

    )

    function renderInfo() {
        if (type === 'SELLING') {
            return (
                <View style={styles.infoView}>
                    {renderProductImages(sellingData)}
                    {renderProductInfoView(sellingData)}
                    {renderPersonInfoView(sellingData)}

                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }

    // Seller or Buyer info
    function renderPersonInfoView(data) {
        if (data === null) {
            return null
        }

        let title = ''
        if (type === 'SELLING') {
            title = 'Thông tin người bán'
        } else {
            title = 'Thông tin người mua'
        }


        return (
            <View style={styles.personView}>
                <View style={styles.personWrapperView}>

                    <View style={styles.titleView}>
                        <View style={styles.separatorLineView}>
                        </View>
                        <Text style={styles.titleText} >{title}</Text>
                    </View>

                    <View style={styles.detailInfoView}>
                        <Text>
                            {data.fullName}
                        </Text>
                    </View>


                </View>
            </View>
        )
    }

    function renderProductInfoView(data) {
        if (data === null) {
            return null
        }
        return (
            <View style={styles.productView}>
                <View style={styles.productWrapperView}>

                    <View style={styles.titleView}>
                        <View style={styles.separatorLineView}>
                        </View>
                        <Text style={styles.titleText} >Thông tin sản phâm</Text>
                    </View>

                    <View style={styles.detailInfoView}>
                        <Text>
                            {data.productName}
                        </Text>
                    </View>


                </View>
            </View>
        )
    }


}

export default ProductDetail

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    infoView: {
        flex: 1
    },

    productImageContainer: {},
    productImage: {
        height: 300
    },
    personView: {
        marginTop: 24,
        height: 280,
    },

    personWrapperView: {
        flex:1,
        marginLeft: 8,
    },

    productView: {
        marginTop: 24,
        height: 280,
    },

    productWrapperView: {
        flex:1,
        marginLeft: 8,
        marginRight:8

    },

    separatorLineView: {
        width: 4,
        height: 16,
        backgroundColor: GlobalStyle.colour.primaryColor

    },

    titleView: {
        flexDirection:'row'
    },

    titleText: {
        marginLeft:4,
        color:'#9E9E9E',
        fontSize:16,
        fontWeight:'bold'
    },

    detailInfoView: {
        flex: 1,
        marginTop: 8,
        borderRadius:4,
        backgroundColor: 'white',
        borderWidth:0.5,
        borderColor:GlobalStyle.colour.grayColor
    }


});
