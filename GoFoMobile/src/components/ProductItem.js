import React from 'react'
import {View, TouchableOpacity, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import {Appbar, Text, Title} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';

import GlobalStyle from "../style/GlobalStyle";

import moment from "moment";


function ProductItem({item, onPress}) {
    //console.log('MERA ProductItem  ',moment(item.createDate).format("YYYY-MM-DDThh:mm:ssZ"))
    let fortmatString = 'DD/MM/YYYYTHH:mm'
    console.log('MERA ProductItem time  ',moment(item.createDate).locale('vi').format(fortmatString), ' --- ',item.createDate)
    let time = moment(item.createDate).format(fortmatString)
    let timeString = time.replace('T',' - ')
    return (
        <TouchableOpacity
            style={[styles.itemContainer]}
            onPress={()=> onPress(item)}

        >
            <View style={styles.itemWrapper}>
                {
                    item.photoUrls != null ? <ImageBackground imageStyle={{ borderRadius: 4 }} source={{uri: item.photoUrls[0]}} style={styles.imageWrapperView}></ImageBackground> : null
                }

                <View style={styles.contentInfoView}>
                    <Text style={styles.itemTitle}>
                        {item.productName}
                    </Text>
                    <Text style={styles.normalText}>
                        Người bán: {item.fullName}
                    </Text>
                    <Text style={styles.normalText}>
                        Liên hệ: {item.sellerPhone}
                    </Text>
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
        // shadowOffset: {
        //     width: 0,
        //     height: 0.25,
        // },
        //shadowOpacity: 0.2,
        //shadowRadius: 0.5,

    },
    imageWrapperView: {
        flex: 1,
        margin: 8,
        borderRadius: 4,
        backgroundColor: 'gray'
    },
    contentInfoView: {
        flex: 2
    },
    itemTitle: {
        //color: GlobalStyle.colour.primaryColor,
        fontSize:16,
        fontWeight:'500',
        marginTop:6,
        color: '#3C3C3D'

    },
    normalText: {
        color:'#6B6B6B',
        marginTop:4
    }
})

export default ProductItem
