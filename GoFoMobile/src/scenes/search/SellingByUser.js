
import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {
    FlatList,
    ImageBackground,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Header from '../../components/Header'
import GlobalStyle from "../../style/GlobalStyle";
import Icon from "react-native-vector-icons/AntDesign";
import * as api from "../../services/products";
import * as authApi from "../../services/auth";
import ModelList from "../../components/ModelList";
import ProductItem from "../../components/ProductItem";
import LoadingPage from "../../components/LoadingPage";
import AsyncStorage from "@react-native-community/async-storage";
import {PASSWORD_KEY, USER_ID_KEY, TOKEN_KEY, PHONE_NUMBER_KEY} from "../../config/Contants";
import * as c from "../../contants/apiConstants";

function SellingProduct({navigation}) {
    //const {navigate} = props.navigation;

    let sellerInfo = navigation.getParam('sellerInfo');

    console.log('sellerInfo  ==>   ',sellerInfo)

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [sellingList, setSellingList] = useState([]);

    const [isListEnd, setIsListEnd] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);


    const [userInfo, setUserInfo] = useState({});
    let [token, setToken] = useState(null);
    let [userId, setUserId] = useState(null);

    async function getTokenKey() {
        let token = await AsyncStorage.getItem(TOKEN_KEY);
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        setToken(token)
        setUserId(userId)
    }


    function fetchData(isRefresh) {

        if (isRefresh === true ) {
            console.log('MERA  =======================  fetchData ============== page:',page, 'isRefresh:',isRefresh)
            api.getSellingByFullName(sellerInfo.local.fullName,1).then((response) => {
                //console.log('MERA length 11: ',response.data.result.length,' : ', sellingList.length)
                if (response.data.result.length > 0) {
                    setSellingList(response.data.result)
                    setLoading(false);
                    setRefreshing(false)
                } else {
                    //setIsListEnd(true);
                    setLoading(false);
                    setRefreshing(false)
                }

            });
        } else {
            if (!loading && !isListEnd) {
                console.log('MERA ......................  LOAD MORE  ........................   page: ',page, 'isRefresh:',isRefresh, 'loading: ',loading,'  isListEnd:',isListEnd)
                setLoading(false)
                api.getSellingByFullName(sellerInfo.local.fullName,1).then((response) => {
                    //setSellingList(response.data.result)
                    console.log('MERA LOAD MORE Lenght:  ',response.data.result.length,' =====:===== ', sellingList.length)
                    if (response.data.result.length > 0) {

                        setPage(page + 1);

                        // After the response increasing the page
                        if (page == 1) {
                            setSellingList(response.data.result)
                        } else {
                            setSellingList([...sellingList, ...response.data.result])
                        }

                        setLoading(false);
                        setRefreshing(false)
                    } else {

                        setLoading(false);
                        setRefreshing(false)
                    }

                });
            }
        }



    }


    async function getUserDetail() {
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        let submitObj = {
            userId: userId
        }
        console.log('getUserDetail sellerInfo ==> ',sellerInfo)
        authApi.getUserDetail(submitObj).then((user)=> {
            console.log('getUserDetail res ==>  ',user)
            if (user) {
                setUserInfo(user)

                if (user.local ) {
                    if (user.local.followingSellers.length > 0 ) {
                        let sellerUserId = sellerInfo._id
                        let index  =  user.local.followingSellers.indexOf(sellerUserId)
                        if (index !== -1) {
                            setIsFollowed(true)
                        }
                        console.log('getUserDetail index ',index)
                    }
                }


            }
        })
    }


    function refreshData() {
        setLoading(false);
        setRefreshing(true)
        setIsListEnd(false)
        setPage(1);
        console.log('MERA  refreshData page :',page, '  ' ,refreshing)
        fetchData(true)

    }

    function RenderList(navigation,data) {
        console.log('MERA RenderList data ==> ', data)
        if (data === null) {
            return (
                <View style={styles.noItemView}>
                    <Text style = {styles.noItemText} >ahihi</Text>
                </View>
            )
        }
        if (data.length > 0) {
            return (
                <View style={{marginTop: 0}}>
                    <FlatList
                        style={{height:'100%'}}
                        data={data}
                        renderItem={({item}) =>
                            RenderItem(navigation,item)
                        }
                        keyExtractor={(item, index) => item._id}
                        onEndReached={() => fetchData()}
                        onEndReachedThreshold={0.01}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => refreshData()}
                                tintColor={GlobalStyle.colour.primaryColor}
                            />
                        }

                    />
                </View>
            )
        } else {
            if (loading === true) {
                return (
                    <View style={styles.noItemView}>
                    </View>
                )
            } else {
                return (
                    <View style={styles.noItemView}>
                        <Text style = {styles.noItemText} >Không có sản phẩm nào đang bán</Text>
                    </View>
                )
            }

        }
    }

    useEffect(() => {
        fetchData(),getUserDetail(),getTokenKey(), setLoading(true);
    }, []);


    function onFollowClick() {
        let followingId = sellerInfo._id
        console.log('onFollowClick  ==>  ', followingId)

        if (isFollowed === true) {
            authApi.unFollowSeller(userId,followingId).then((response) =>{
                console.log('onFollowClick un ==>  ',response)
                if (response) {
                    if(response.data.success === true) {
                        setIsFollowed(false)
                    }
                }
            })
        } else {
            authApi.followSeller(userId,followingId).then((response) =>{
                console.log('onFollowClick fo ==>  ',response)
                if (response) {
                    if(response.data.success === true) {
                        setIsFollowed(true)
                    }
                }
            })
        }


    }
    function renderFollowButton() {
     console.log( 'token ==>  ',token)
     let text = 'Theo dõi'
     if (isFollowed === true) {
         text = 'Đang theo dõi'
     }
    if (token !== null) {
        return (
            <TouchableOpacity
                style={styles.followButton}
                onPress={()=> onFollowClick()}>
                <Text style = {styles.followText}>
                    {text}
                </Text>
            </TouchableOpacity>
        )
    } else {
        return  null
    }

    }

    return (

        <View style={styles.container}>
            <Header titleText='Sản Phẩm Đang Bán' navigation={navigation}/>
            <View style={styles.topBar}>
                <View style={styles.topBarLeft}>

                    <Text style ={styles.sellerNameText}>
                        {sellerInfo.local.fullName} đang bán
                    </Text>

                </View>

                <View style={styles.topBarRight}>
                    {renderFollowButton()}
                </View>

            </View>
            <View style={{flex:1, marginTop:0}}>
                {RenderList(navigation,sellingList)}
            </View>

            <LoadingPage
                isShow={loading}
            />

        </View>
    )
}


function RenderItem(navigation,item) {
    return (
        <ProductItem
            item = {item}
            onPress = {() => navigateToDetail(navigation,item._id)}
        />
    )
}

function navigateToDetail(navigation, productId) {
    console.log("MERA navigateToDetail ==> productId: ",productId)
    navigation.push('ProductDetail',{productId:productId, type:'SELL'})
}

export default SellingProduct

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    topBar: {
        marginTop:4,
        height:40,
        marginLeft:8,
        marginRight:8,
        paddingLeft:4,
        paddingRight:4,

        backgroundColor:'white',
        borderRadius: 4,
        flexDirection:'row',
        alignItems: 'center'
    },

    topBarLeft: {
        flex:2,
        alignItems: 'flex-start'

    },
    sellerNameText: {
        color:GlobalStyle.colour.primaryColor,
        fontSize: 15,
        fontWeight:'500'
    },


    topBarRight: {
        flex:1,
        alignItems: 'flex-end'
    },

    followButton: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop:4,
        paddingBottom:4,
        borderColor: GlobalStyle.colour.primaryColor,
        borderWidth:1,
        borderRadius:4
    },

    followText: {
        color:GlobalStyle.colour.primaryColor,
        //fontSize: 14,
    },


    content: {
        flex: 1,
        padding: 8,
    },

    noItemView: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white'
    },

    noItemText: {
        fontSize:16,
        padding: 16,
        textAlign:'center'
    }




});
