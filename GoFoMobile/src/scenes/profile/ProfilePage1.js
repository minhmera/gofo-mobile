import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_ID_KEY, FULL_NAME_KEY} from "../../config/Contants";
import GlobalStyle from "../../style/GlobalStyle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/AntDesign';

function ProfilePage1({navigation}) {
    //const {navigate} = props.navigation;

    let [token, setToken] = useState(null);
    let [userName, setUserName] = useState(null);
    let [userId, setUserId] = useState(null);


    async function logout() {
        console.log(' ********** Log out  ***************')
        AsyncStorage.clear()
        navigation.navigate('Auth')


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
                        {renderItem('Cộng đồng','team',()=> onChangeUserInfo())}

                    </KeyboardAwareScrollView>
                </View>
            )
        } else {
            return (
                <View style={styles.body}>
                    <KeyboardAwareScrollView  keyboardDismissMode={'on-drag'}>
                        {renderItem('Tin bán đã đăng','export',()=> navigateSellingPost())}
                        {renderItem('Tin mua đã đăng','book',()=> navigateBuyingPost())}
                        {renderItem('Đổi số điện thoại','setting',()=> onChangeUserInfo())}
                        {renderItem('Đổi mật khẩu','setting',()=> onChangePassword())}
                        {renderItem('Cộng đồng','team',()=> onChangeUserInfo())}
                        {renderItem('Đăng xuất','logout',()=> logout())}

                    </KeyboardAwareScrollView>
                </View>
            )
        }
    }

    useEffect(() => {
        {
            getUserInfo()
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {renderUserName()}
            </View>
            {renderBody()}
            <View style={{marginBottom:12,alignItems:'center'}}>
                <Text style = {{color: GlobalStyle.colour.grayColor}}>Phiên bản 0.35</Text>
            </View>
            <View style={styles.bottom}>
                <Text>Thông tin nhà phát triển</Text>
                <Text>Nhật Minh</Text>
                <Text>Liên hệ: 0976999864 - nhatminhn900@gmail.com</Text>
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
    bottom: {
        flex: 1,
        backgroundColor:GlobalStyle.colour.grayBackground,
        justifyContent: 'center'
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

    }
})

export default ProfilePage1
