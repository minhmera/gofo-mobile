
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
import SellerItem from "../../components/SellerItem";

function FollowingUser({navigation}) {
    //const {navigate} = props.navigation;

    let sellerInfo = navigation.getParam('sellerInfo');

    console.log('sellerInfo  ==>   ',sellerInfo)

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [followingList, setFollowingList] = useState([]);

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


    async function getUserDetail() {
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        let submitObj = {
            userId: userId
        }
        //console.log('getUserDetail sellerInfo ==> ',sellerInfo)
        authApi.getUserDetail(submitObj).then((user)=> {
            console.log('getUserDetail res ==>  ',user)
            if (user) {
                setUserInfo(user)
                let followingIdsString = ""
                if (user.local.followingSellers.length > 0) {
                    user.local.followingSellers.map((item,index) => {
                        if  (index === 0) {
                            followingIdsString = followingIdsString + item
                        } else {
                            followingIdsString = followingIdsString + ','+ item
                        }

                    })
                }

                if (followingIdsString !== '') {
                    authApi.getFollowingUser(followingIdsString).then((response) =>{
                        setLoading(false)
                        if (response) {
                            console.log('getFollowingUser  ==>  ',response.data)
                            setFollowingList(response.data)
                            //this.setState({followingList: response.data})
                        }
                    })
                } else {
                    setLoading(false)
                }
                console.log('getUserDetail followingIdsString ==> ',followingIdsString)
            }
        })
    }


    function refreshData() {
        setLoading(false);
        setRefreshing(true)
        setIsListEnd(false)
        setPage(1);
        console.log('MERA  refreshData page :',page, '  ' ,refreshing)


    }
    useEffect(() => {
        getUserDetail(),getTokenKey(), setLoading(true);
    }, []);

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
                        onEndReached={() => getUserDetail()}
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
                        <Text style = {styles.noItemText} >Bạn chưa theo dõi bất cứ người bán nào</Text>
                    </View>
                )
            }

        }
    }


    return (

        <View style={styles.container}>
            <Header titleText='Đang Theo Dõi' navigation={navigation}/>
            <View style={{flex:1, marginTop:0}}>
                {RenderList(navigation,followingList)}
            </View>

            <LoadingPage
                isShow={loading}
            />

        </View>
    )
}


function RenderItem(navigation,item) {
    return (
        <SellerItem
            item = {item}
            onPress = {() => navigateToSellingByUser(navigation,item)}
        />
    )
}

function navigateToSellingByUser(navigation, user) {
    console.log("MERA navigateToSellingByUser ==> user: ",user)
    navigation.push('SellingByUserPage',{sellerInfo:user})
}


export default FollowingUser

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
