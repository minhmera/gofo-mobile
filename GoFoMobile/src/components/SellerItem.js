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

function SellerItem({item, onPress, type}) {

    console.log('ProductItem ===>  ', item)

    return (
        <TouchableOpacity
            style={[styles.itemContainer]}
            onPress={() => onPress(item)}

        >
            <View style={styles.itemWrapper}>
                <View style={styles.contentInfoView}>
                    <View style={[styles.infoRow, {marginTop: 8}]}>
                        <Text style={styles.normalText}>
                            Tên
                        </Text>
                        <Text style={styles.sellerText}>
                            {item.local.fullName}
                        </Text>
                    </View>
                    <View style={[styles.infoRow, {marginTop: 8}]}>
                        <Text style={styles.normalText}>
                            Điện thoại
                        </Text>
                        <Text style={styles.sellerText}>
                            {item.local.phoneNumber}
                        </Text>

                    </View>

                    <View style={[styles.infoRow, {marginTop: 8}]}>
                        <Text style={styles.normalText}>
                            Shop URL
                        </Text>
                        <Text style={styles.sellerText}>
                            {item.local.shopPath}
                        </Text>

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

        paddingBottom:10


    },

    contentInfoView: {
        flex: 2,
        marginLeft: 8,

    },


    infoRow: {
        flexDirection: 'row',
        height: 24
    },

    normalText: {
        width: '30%',
        color: '#6B6B6B',
        marginTop: 4
    },

    sellerText: {
        marginTop: 4,
        color: GlobalStyle.colour.grayColor3,
        fontWeight: 'bold'
    },

})

export default SellerItem
