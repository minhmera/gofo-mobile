import React from 'react'
import {View, TouchableOpacity, StyleSheet, Linking, ImageBackground} from 'react-native';
import {Appbar, Text, Title} from 'react-native-paper'
import IconEntypo from 'react-native-vector-icons/Entypo';

import GlobalStyle from "../style/GlobalStyle";

import moment from "moment";
import {func} from "prop-types";


function ProductItem({item, onPress, type}) {
    let fortmatString = 'DD/MM/YYYYTHH:mm'
    let timeString = ""
    if (item.createDate != undefined){
        let time = moment(item.createDate).format(fortmatString)
        timeString = time.replace('T',' - ')
    }

    function renderImage() {
        console.log('ProductItem photoUrls ==> 1 ',item)
        if (item.photoUrls !== undefined){
            return  <ImageBackground imageStyle={{ borderRadius: 4 }} source={{uri: item.photoUrls[0]}} style={styles.imageWrapperView}></ImageBackground>
        } else {
            return (
                <View style={[styles.imageWrapperView,{backgroundColor:GlobalStyle.colour.grayColor,justifyContent:'center',alignItems:'center'}]} >
                    <IconEntypo

                        name={'images'}
                        size = {48}
                        color = {'white'}
                    />
                </View>
            )
        }
    }

    let typeString = 'Người bán'
    if (type === 'BUY') {
        typeString = 'Người mua'
    } else if (type === 'SELL') {
        typeString = 'Người bán'
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
                    <Text style={styles.itemTitle}>
                        {item.productName}
                    </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.normalText}>
                            {typeString}: {' '}
                        </Text>
                        <Text style={styles.sellerText}>
                            {item.fullName}
                        </Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.normalText}>
                            Liên hệ: {' '}
                        </Text>
                        <TouchableOpacity
                            onPress={()=> Linking.canOpenURL(item.sellerPhone)}
                        >
                            <Text style={styles.fontText}>
                                {item.sellerPhone}
                            </Text>
                        </TouchableOpacity>

                    </View>


                    <Text style={styles.normalText}>
                        Ngày đăng: {timeString}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    itemContainer: {
        height: 150,
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
    normalText: {
        color:'#6B6B6B',
        marginTop:4
    },

    sellerText: {
        marginTop:4,
        color: GlobalStyle.colour.orangeColor,
        fontWeight: '500'
    },
    fontText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop:2,
        color:'#6B6B6B',
        textDecorationLine: "underline",
        textDecorationStyle:'solid',
        //textDecorationStyle: "solid",
        textDecorationColor: GlobalStyle.colour.grayColor2
        //color: 'blue',
    }
})

export default ProductItem
