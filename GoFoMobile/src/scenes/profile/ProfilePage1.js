import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {Alert, Linking, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_ID_KEY, FULL_NAME_KEY} from "../../config/Contants";
import GlobalStyle from "../../style/GlobalStyle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info';
import * as api from "../../services/home";


function ProfilePage1({navigation}) {
    //const {navigate} = props.navigation;

    let [token, setToken] = useState(null);
    let [userName, setUserName] = useState(null);
    let [userId, setUserId] = useState(null);
    let [fbGroupUrl, setFbGroupUrl] = useState(null);


    async function logout() {
        console.log(' ********** Log out  ***************')
        AsyncStorage.clear()
        navigation.navigate('Auth')


    }

    function navigateFollowingSeller() {
        console.log('------------------------   navigateFollowingSeller ------------------------')
        navigation.push('FollowingSeller',{userId:userId})
    }

    function navigateSellingPost() {
        navigation.push('SellingByUser',{userId:userId})
    }

    function navigateBuyingPost() {
        navigation.push('BuyingByUser',{userId:userId})
    }



    async function getUserInfo() {
        let token = await AsyncStorage.getItem(TOKEN_KEY);
        let fullName = await AsyncStorage.getItem(FULL_NAME_KEY);
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        console.log('MERA Token ==> ',token)
        setToken(token)
        setUserId(userId)
        setUserName(fullName)

        console.log("MERA getUserInfo   ==> token: ", token,'userName ==>  ', userName)
    }

    async function getAppInfo() {
        try {
            let response = await api.getAppGeneralInfo();
            console.log('getAppGeneralInfo 22  ======>    ',response)
            if (response) {
                setFbGroupUrl(response.appInfo.fbGroupUrl)
            }


            //setLoading(false);

        } catch (error) {

        }
    }

    function renderUserName() {
        if (userName === null) {
            return (

                <TouchableOpacity
                    style={styles.userNameView}
                    onPress={()=> onLoginPress() }
                >
                    <Text style={styles.userNameText}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>

            )
        } else {
            return (
                <View style={styles.userNameView}>
                    <Text style={styles.userNameText}>
                        {userName}
                    </Text>
                </View>

            )
        }
    }

    function onCommunityClick() {
        Linking.canOpenURL(fbGroupUrl).then(supported => {
            supported && Linking.openURL(fbGroupUrl);
        }, (err) => console.log(err));
    }

    function onChangeUserInfo() {
        console.log('MERA onTestPress')
        navigation.push('EditUserInfo')
    }

    function onChangePassword() {
        console.log('MERA onTestPress')
        navigation.push('ChangePassword')
    }

    function onLoginPress() {
        console.log('MERA  navigation ',navigation)
        navigation.navigate('Login')
    }

    function renderBody() {
        if (userName === null) {
            return (
                <View style={styles.body}>
                    <KeyboardAwareScrollView  keyboardDismissMode={'on-drag'}>
                        {renderItem('Cộng đồng','team',()=> onCommunityClick())}

                    </KeyboardAwareScrollView>
                </View>
            )
        } else {
            return (
                <View style={styles.body}>
                    <KeyboardAwareScrollView  keyboardDismissMode={'on-drag'}>
                        {renderItem('Đổi thông tin cá nhân','setting',()=> onChangeUserInfo())}
                        {renderItem('Đang theo dõi','export',()=> navigateFollowingSeller())}
                        {renderItem('Tin bán đã đăng','export',()=> navigateSellingPost())}
                        {renderItem('Tin mua đã đăng','book',()=> navigateBuyingPost())}
                        {renderItem('Đổi mật khẩu','setting',()=> onChangePassword())}
                        {renderItem('Cộng đồng','team',()=> onCommunityClick())}
                        {renderItem('Đăng xuất','logout',()=> logout())}

                    </KeyboardAwareScrollView>
                </View>
            )
        }
    }

    useEffect(() => {
        {
            getUserInfo(),getAppInfo()
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {renderUserName()}
            </View>
            {renderBody()}
            <View style={{marginBottom:12,alignItems:'center'}}>
                <Text style = {{color: GlobalStyle.colour.grayColor}}>Phiên bản: {DeviceInfo.getVersion()}</Text>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.bottomTitle}>Thông tin nhà phát triển</Text>
                <Text style={styles.bottomText}>Điện thoại:  0976999864</Text>
                <Text style={styles.bottomText}>Email:  nhatminhn900@gmail.com</Text>

            </View>

        </View>
    )
}

function renderItem(name,iconName, func) {
    return(
        <TouchableOpacity
            activeOpacity={1}
            style={styles.itemView}
            onPress={func}
        >
            <Icon
                name = {iconName}
                size = {24}
                color={GlobalStyle.colour.primaryColor}
            />
            <Text style = {styles.itemTitle}>
                {name}
            </Text>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flex: 1,
        backgroundColor: GlobalStyle.colour.primaryColor
    },
    body: {
        flex: 3,
        marginTop:20,
        marginLeft:16,
    },




    userNameView: {
        flex: 1,
        justifyContent:'flex-end'
    },
    userNameText: {
        color:'white',
        marginBottom:20,
        marginLeft:16,
        fontSize:24,
        fontWeight:'bold'
    },
    itemView: {
        height:60,
        flexDirection:'row',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 16,
        marginLeft:8,

    },
    bottom: {
        flex: 1,
        backgroundColor:GlobalStyle.colour.grayBackground,
        paddingTop: 16,
        paddingLeft: 12,

    },
    bottomTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4
    },
    bottomText: {
        fontSize: 13,
        marginTop: 4
    }

})

export default ProfilePage1
