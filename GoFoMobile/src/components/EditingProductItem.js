import React from 'react'
import {View, TouchableOpacity, StyleSheet, StatusBar, ImageBackground, Linking} from 'react-native';
import {Appbar, Text, Title} from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';

import GlobalStyle from "../style/GlobalStyle";

import moment from "moment";
import * as Utils from "../utils/AppUtils";
import {useGlobalDataContext} from "../contexts/globalDataContext";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconFon from "react-native-vector-icons/Fontisto";
import IconEntypo from 'react-native-vector-icons/Entypo';
import OctIcon from "react-native-vector-icons/Octicons";


function EditingProductItem({item, onEdit, onDelete}) {
    //console.log('MERA ProductItem  ',moment(item.createDate).format("YYYY-MM-DDThh:mm:ssZ"))
    let fortmatString = 'DD/MM/YYYYTHH:mm'
    let time = moment(item.createDate).format(fortmatString)
    let timeString = time.replace('T',' - ')

    const {globalState, dispatch} = useGlobalDataContext();

    function renderImage() {
        console.log('')
        if (item.photoUrls !== undefined && item.photoUrls.length > 0){
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
                <Text style={styles.normalText}>
                    {Utils.moneyFormat(productItem.productPrice)} / {measuringText}
                </Text>
            )
        }
    }


    function renderCategory() {
        const index = globalState.categories.findIndex(x => x.type === item.categoryId);
        let categoryObj = globalState.categories[index]

        return (
            <View style={{flexDirection:'row',marginTop:12}}>
                <OctIcon
                    style={[styles.leftIcon,{marginLeft:3}]}
                    name={'list-unordered'}
                    size = {16}
                    color = { GlobalStyle.colour.grayColor2}
                />
                <View>
                    <Text style={styles.normalText}>
                        {categoryObj.title_vi}
                    </Text>
                </View>

            </View>
        )
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

                    {renderCategory()}
                    <View style={{flexDirection:'row',marginTop:4}}>
                        <IconFon
                            style={[styles.leftIcon,{marginLeft:3}]}
                            name={'dollar'}
                            size = {16}
                            color = { GlobalStyle.colour.grayColor2}
                        />
                        <TouchableOpacity
                            onPress={()=> Linking.canOpenURL(item.sellerPhone)}
                        >
                            {renderPrice(item)}
                        </TouchableOpacity>

                    </View>


                    <View style={{flexDirection:'row',marginTop:4}}>
                        <IconAnt
                            style={[styles.leftIcon,{marginTop: 6,marginLeft:2}]}
                            name={'clockcircleo'}
                            size = {14}
                            color = { GlobalStyle.colour.grayColor2}
                        />
                        <View>
                            <Text style={styles.normalText}>
                                {timeString}
                            </Text>
                        </View>

                    </View>



                </View>

                <View style={styles.editingButtonView}>
                    <TouchableOpacity
                        style={[styles.editButton,{backgroundColor:GlobalStyle.colour.grayBackground, marginTop:8}]}
                        onPress={()=> onDelete(item)}
                    >
                        <Text style={[styles.editButtonTitle,{color:GlobalStyle.colour.redColor}]}>Xoá</Text>
                    </TouchableOpacity>
                    <View style={{ height:1, backgroundColor:GlobalStyle.colour.primaryColor}}/>
                    <TouchableOpacity
                        style={[styles.editButton,{backgroundColor:GlobalStyle.colour.grayBackground, marginBottom:8}]}
                        onPress={()=> onEdit(item)}
                    >
                        <Text style={[styles.editButtonTitle,{color: GlobalStyle.colour.primaryColor}]}>Sửa</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </TouchableOpacity>
    )
}
//
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
        color: 'black',
        fontSize:16,
        fontWeight:'500',
        marginTop:6,
        //color: '#3C3C3D'

    },
    normalText: {
        color: GlobalStyle.colour.grayColor3,
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
        fontWeight: '500',

    },
    priceText: {
        fontWeight: 'bold',
        //fontSize: 14,
        marginTop:4,
        color:'#6B6B6B',
        textDecorationColor: GlobalStyle.colour.grayColor2
    },

    leftIcon: {
        width:24,
        marginTop:2,
        //marginRight: 8
    }

})

export default EditingProductItem
