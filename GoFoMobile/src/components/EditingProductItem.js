import React from 'react'
import {View, TouchableOpacity, StyleSheet, StatusBar, ImageBackground} from 'react-native';
import {Appbar, Text, Title} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';

import GlobalStyle from "../style/GlobalStyle";

import moment from "moment";
import IconEntypo from "react-native-vector-icons/Entypo";


function EditingProductItem({item, onEdit, onDelete}) {
    //console.log('MERA ProductItem  ',moment(item.createDate).format("YYYY-MM-DDThh:mm:ssZ"))
    let fortmatString = 'DD/MM/YYYYTHH:mm'
    let time = moment(item.createDate).format(fortmatString)
    let timeString = time.replace('T',' - ')

    function renderImage() {
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
    return (
        <TouchableOpacity
            style={[styles.itemContainer]}


        >
            <View style={styles.itemWrapper}>
                {
                    renderImage()
                }

                <View style={styles.contentInfoView}>
                    <Text style={styles.itemTitle}>
                        {item.productName}
                    </Text>

                    <Text style={styles.normalText}>
                        Ngày đăng:
                    </Text>
                    <Text style={styles.normalText}>
                        {timeString}
                    </Text>
                </View>
                <View style={styles.editingButtonView}>
                    <TouchableOpacity
                        style={[styles.editButton,{backgroundColor:GlobalStyle.colour.grayBackground, marginTop:8}]}
                        onPress={()=> onDelete(item)}
                    >
                        <Text style={styles.editButtonTitle}>Xoá</Text>
                    </TouchableOpacity>
                    <View style={{ height:1, backgroundColor:GlobalStyle.colour.primaryColor}}></View>
                    <TouchableOpacity
                        style={[styles.editButton,{backgroundColor:GlobalStyle.colour.grayBackground, marginBottom:8}]}
                        onPress={()=> onEdit(item)}
                    >
                        <Text style={styles.editButtonTitle}>Sửa</Text>
                    </TouchableOpacity>
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
        flex: 2,
        margin: 8,
        borderRadius: 4,
        backgroundColor: 'gray'
    },
    contentInfoView: {
        flex: 3
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
    },
    editingButtonView: {
        flex:0.75,


    },
    editButton: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
        //borderRadius:4,
    },
    editButtonTitle: {
        fontSize: 15,
        fontWeight: '500'
    }

})

export default EditingProductItem
