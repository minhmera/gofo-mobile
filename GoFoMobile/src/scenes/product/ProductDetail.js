import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {
    ScrollView,
    FlatList,
    ImageBackground,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
    Linking
} from 'react-native';
import Header from '../../components/Header'
import GlobalStyle from "../../style/GlobalStyle";
import * as api from "../../services/products";
import Carousel from '../../components/Carousel'
import LoadingPage from "../../components/LoadingPage";
import moment from "moment";
import CommonButton from "../../components/CommonButton";
import Icon from "react-native-vector-icons/AntDesign";
import {color} from "react-native-reanimated";
import * as Utils from "../../utils/AppUtils";
import {Input} from "react-native-elements";

function ProductDetail({navigation}) {
    //const {navigate} = props.navigation;

    let productId = navigation.getParam('productId');
    let type = navigation.getParam('type');
    console.log('MERA ProductDetail ==>  type: ', type);


    const [sellingData, setSellingData] = useState(null);
    const [buyingData, setBuyingData] = useState(null);
    const [loading, setLoading] = useState(false);



    function fetchSellingProductDetail() {
        api.getSellingProductDetail(productId).then((response) => {
            setLoading(false)
            console.log('MERA getSellingProductDetail : ', response.data)
            setSellingData(response.data)
        });
    }

    function fetchBuyingProductDetail() {
        api.getBuyingProductDetail(productId).then((response) => {
            setLoading(false)
            //console.log('MERA getBuyingProductDetail RES : ', response.data.productName)
            setBuyingData(response.data)

        });
    }


    function renderProductImages(item) {
        if (item === null) {
            return null
        } else {
            if (item.photoUrls === null || item.photoUrls === undefined) {
                return null
            }
        }

        let images = item.photoUrls

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
        if (type === 'SELL') {
            fetchSellingProductDetail()
        } else {
            fetchBuyingProductDetail()
        }
    }

    function openCall(){
        //const url='tel://:+0946334909'
        let url='tel:0946334909'
        console.log('phoneNumber: ',sellingData.phoneNumber)
        if (type === 'SELL') {
            url= `tel:${sellingData.sellerPhone}`
        } else {
            url= `tel:${buyingData.sellerPhone}`
        }
        console.log('openCall ==>  ',url)
        Linking.openURL(url)
    }

    useEffect(() => {
        getDefaultData(),setLoading(true);
    }, []);
    return (

        <View style={styles.container}>
            <Header titleText='Chi Tiết Sản Phẩm' navigation={navigation}/>
            <ScrollView >
                {renderInfo()}


                <View style={{alignItems:'center', marginTop:24, marginBottom:48}}>
                    <CommonButton
                        title={'Gọi'}
                        iconName={'phone'}
                        iconSize={24}
                        iconStyle={{color: 'white'}}
                        onPress={()=> openCall()}
                    />
                </View>

            </ScrollView>
            <LoadingPage
                isShow={loading}
            />
        </View>

    )

    function renderInfo() {
        if (type === 'SELL') {
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
                    {renderProductImages(buyingData)}
                    {renderProductInfoView(buyingData)}
                    {renderPersonInfoView(buyingData)}
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
        let seller = ''
        if (type === 'SELL') {
            title = 'Thông tin người bán'
            seller = 'Người bán'
        } else {
            title = 'Thông tin người mua'
            seller = 'Người mua'
        }




        return (
            <View style={styles.personView}>
                <View style={styles.personWrapperView}>

                    <View style={styles.titleView}>
                        <View style={styles.separatorLineView}></View>
                        <Text style={styles.titleText} >{title}</Text>
                    </View>

                    <View style={styles.detailInfoView}>
                        <View style={styles.itemView}>
                            <Text style= {styles.itemTitleText}>
                                {seller}:
                            </Text>

                            <Text style = {styles.itemContentText}>
                                {' '}{ data.fullName}
                            </Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style= {styles.itemTitleText}>
                                Điện thoại:
                            </Text>
                            <Text style={styles.itemContentText}>
                                {' '} {data.sellerPhone}
                            </Text>
                        </View>



                    </View>


                </View>
            </View>
        )
    }

    function renderPrice(productItem) {
        let measuringText = ''
        if (productItem.productPrice === undefined) {
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

    function renderProductInfoView(data) {
        let fortmatString = 'DD/MM/YYYY'
        let timeString = ""
        if (data === null) {
            return null
        }
        if (data.createDate != undefined){
            let time = moment(data.cropDay).format(fortmatString)
            timeString = time.replace('T',' - ')
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
                        <View style={styles.itemView}>
                            <Text style = {styles.itemTitleText}>
                                Sản phẩm:
                            </Text>
                            <Text style = {styles.itemContentText}>
                                {' '} {data.productName}
                            </Text>
                        </View>

                        <View style={styles.itemView}>
                            <Text style = {styles.itemTitleText}>
                                Gía:
                            </Text>
                            <Text style = {styles.itemContentText}>
                                {' '} {renderPrice(data)}
                            </Text>
                        </View>

                        <View style={styles.itemView}>
                            <Text style = {styles.itemTitleText}>
                                Nơi trồng:
                            </Text>
                            <Text style= {styles.itemContentText}>
                                {' '} {data.districtName}, {data.provinceName}
                            </Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style = {styles.itemTitleText}>
                                Thời điểm thu hoạch:
                            </Text>
                            <Text style= {styles.itemContentText}>
                                {' '} {timeString}
                            </Text>
                        </View>



                        <View
                            style={[styles.selectionItem,{flex:1,flexDirection:'column',alignItems:'flex-start',marginTop:12,marginRight:8}]}>
                            <View style={[styles.selectionTitleView,{flex:1}]}>
                                <Text style={styles.itemTitleText}>Mô tả sản phẩm:</Text>
                            </View>
                            <View style={{width:'100%',marginTop:4,marginLeft:0,marginBottom:8}}>
                                <Text style= {styles.itemContentText}>
                                    {' '} {data.description !== undefined ? data.description : ''}
                                </Text>
                            </View>
                        </View>



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
        backgroundColor: GlobalStyle.colour.grayBackground,

    },
    infoView: {
        flex: 1
    },

    productImageContainer: {},
    productImage: {
        height: 300
    },
    personView: {
        marginTop: 16,
        height: 140,
        justifyContent:'center'
    },

    personWrapperView: {
        flex:1,
        marginLeft: 8,
    },

    productView: {
        marginTop: 16,
        //height: 160,
        justifyContent:'center'

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
        paddingLeft:8,
        borderColor:GlobalStyle.colour.grayColor
    },
    itemTitleText: {
        color:GlobalStyle.colour.grayColor3,
        //fontWeight: '500',
        //fontSize: 16
    },
    itemContentText: {
        fontSize: 16
    },

    itemView: {
        height:32,
        flexDirection: 'row',
        alignItems:'center',

    }


});
