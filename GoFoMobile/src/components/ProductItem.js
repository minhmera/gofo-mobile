import React from 'react'
import {View, TouchableOpacity, StyleSheet, Linking, ImageBackground} from 'react-native';
import {Appbar, Text, Title} from 'react-native-paper'
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAnt from "react-native-vector-icons/AntDesign";
import IconFon from "react-native-vector-icons/Fontisto";
import IconION from "react-native-vector-icons/Ionicons";

require('moment/locale/vi.js');
require('moment/locale/es.js');




import GlobalStyle from "../style/GlobalStyle";

import moment from "moment";
import * as Utils from '../utils/AppUtils';

function ProductItem({item, onPress, type}) {
    let fortmatString = 'DD/MM/YYYYTHH:mm'
    let timeString = ""
    if (item.createDate != undefined){
        //let time = moment(item.createDate).format(fortmatString)
        //timeString = time.replace('T',' - ')
        timeString = moment(item.createDate).locale('vi').fromNow()
    }

    function renderImage() {

        if (item.photoUrls !== undefined && item.photoUrls.length > 0){
            console.log('ProductItem photoUrls 1111 ==>  ',item.photoUrls)
            return  (
            <ImageBackground
                imageStyle={{ borderRadius: 4 }}
                style={styles.imageWrapperView}
                source={{uri: item.photoUrls[0]}}
                defaultSource={require('../resources/backGround/ph_product_item.png')}
                >
            </ImageBackground>
            )

        } else {
            console.log('ProductItem photoUrls 2222 ==>  ',item.photoUrls)
            /*return (
                <View style={[styles.imageWrapperView,{backgroundColor:GlobalStyle.colour.grayColor,justifyContent:'center',alignItems:'center'}]} >
                    <IconEntypo
                        name={'images'}
                        size = {48}
                        color = {'white'}
                    />
                </View>
            )*/
            return  (
                <ImageBackground
                    imageStyle={{ borderRadius: 4 }}
                    style={styles.imageWrapperView}
                    source={require('../resources/backGround/ph_product_item.png')}
                    //defaultSource={require('../resources/backGround/ph_product_item.png')}
                >
                </ImageBackground>
            )
        }
    }




    /*let typeString = 'Người bán'
    if (type === 'BUY') {
        typeString = 'Người mua'
    } else if (type === 'SELL') {
        typeString = 'Người bán'
    }*/

    function renderPrice(productItem) {
        let measuringText = ''
        if (item.productPrice === undefined) {
            return (
                <Text style={styles.priceText}>
                    Liên hệ
                </Text>
            )

        } else {
            measuringText = productItem.measuring
            return (
                <Text style={styles.priceText}>
                    {Utils.moneyFormat(productItem.productPrice)} / {measuringText}
                </Text>
            )
        }
    }

    function openCall(phoneNumber){
        const url= `tel:${phoneNumber}`
        Linking.openURL(url)
    }

    return (
        <TouchableOpacity
            style={[styles.itemContainer]}
            onPress={()=> onPress(item)}

        >
            <View style={styles.itemWrapper}>
                {
                    // item.photoUrls != null ? <ImageBackground imageStyle={{ borderRadius: 4 }} source={{uri: item.photoUrls[0]}} style={styles.imageWrapperView}></ImageBackground> : null
                    renderImage()
                }

                <View style={styles.contentInfoView}>
                    <Text numberOfLines={2}  style={styles.itemTitle}>
                        {item.productName}
                    </Text>
                    <View style={[styles.infoRow,{marginTop:8}]}>
                        {/*<Text style={styles.normalText}>
                            {typeString}: {' '}
                        </Text>*/}

                        <IconAnt
                            style={[styles.leftIcon,{marginLeft:-2}]}
                            name={'user'}
                            size = {18}
                            color = { GlobalStyle.colour.grayColor2}
                        />
                        <Text style={styles.sellerText}>
                            {item.fullName}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <IconFon
                            style={[styles.leftIcon,{marginLeft:3}]}
                            name={'dollar'}
                            size = {16}
                            color = { GlobalStyle.colour.grayColor2}
                        />
                        <View

                        >
                            {renderPrice(item)}
                        </View>

                    </View>

                    <View style={styles.infoRow}>

                        <IconION
                            style={styles.leftIcon}
                            name={'call-outline'}
                            size = {18}
                            color = { GlobalStyle.colour.grayColor2}
                        />
                        <TouchableOpacity
                            onPress={()=> openCall(item.sellerPhone)}
                        >
                            <Text style={styles.phoneText}>
                                {item.sellerPhone}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.infoRow}>

                        <IconAnt
                            style={styles.leftIcon}
                            name={'clockcircleo'}
                            size = {15}
                            color = { GlobalStyle.colour.grayColor2}
                        />
                        <TouchableOpacity
                            onPress={()=> openCall(item.sellerPhone)}
                        >
                            <Text style={[styles.priceText, {textTransform: 'capitalize'}]}>
                                {timeString}
                            </Text>
                        </TouchableOpacity>

                    </View>



                </View>

            </View>
        </TouchableOpacity>
    )
}
//textTransform: 'capitalize'
const styles = StyleSheet.create({

    itemContainer: {
       // height: 168,
    },

    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 2,
        marginBottom: 2,
        marginLeft: 8,
        marginRight: 8,
        borderWidth: 1,
        borderRadius: 4,
        //borderColor:'#E8E8E8'
        borderColor: '#E8E8E8',
        shadowColor: "black",


    },
    imageWrapperView: {
        flex: 1,
        margin: 8,
        borderRadius: 4,
        backgroundColor: 'gray'
    },
    contentInfoView: {
        flex: 2,
        marginLeft: 8,

    },
    itemTitle: {
        fontSize:18,
        fontWeight:'500',
        marginTop:6,
        //color:  GlobalStyle.colour.grayColor

    },

    infoRow: {
        flexDirection:'row',
        height:24
    },
    leftIcon: {
        width:32,
        marginTop:2,
        //marginRight: 8
    },
    normalText: {

        color:'#6B6B6B',
        marginTop:4
    },

    sellerText: {
        marginTop:4,
        color: GlobalStyle.colour.orangeColor,
        fontWeight: '500'
    },
    phoneText: {
        fontWeight: 'bold',
        //fontSize: 14,
        marginTop:2,
        color:'#6B6B6B',
        textDecorationLine: "underline",
        textDecorationStyle:'solid',
        //textDecorationStyle: "solid",
        textDecorationColor: GlobalStyle.colour.grayColor2
        //color: 'blue',
    },
    priceText: {
        fontWeight: 'bold',
        //fontSize: 14,
        marginTop:2,
        color:'#6B6B6B',
        textDecorationColor: GlobalStyle.colour.grayColor2
    }
})

export default ProductItem
