import React from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AppStyle from "../style/style";
import {Button} from "react-native-elements";
import GlobalStyle from '../style/GlobalStyle';
function LoginWarningView({navigation}) {

    function onLoginPress() {
        console.log('MERA  navigation ',navigation)
        navigation.navigate('Login')
    }

    function onRegisterPress() {
        console.log('MERA  navigation ',navigation)
        navigation.navigate('Register')
    }

    return (
        <View style={styles.container}>
            <Text style={{textAlign:'center',margin:16}} >
                Vui lòng đăng nhập để sử dụng chức năng này
            </Text>
            <Text style={{margin:16,textAlign:'center'}} >
                Nếu bạn chưa có tài khoảng vui lòng đăng ký thành viên
            </Text>

            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.leftButtonView}
                    onPress={()=> onLoginPress()}
                >
                    <Text style={[styles.buttonText,{textAlign:'right', marginRight:16}]}>
                        Đăng nhập
                    </Text>
                </TouchableOpacity>
                <View style={styles.separateView}></View>
                <TouchableOpacity
                    style={styles.rightButtonView}
                    onPress={()=> onRegisterPress()}
                >
                    <Text style={[styles.buttonText,{textAlign:'left', marginLeft:16}]}>
                        Đăng ký
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default LoginWarningView

const styles = StyleSheet.create({
    container: {
        marginTop:108,
        marginLeft:16,
        marginRight:16,
        borderRadius:8,
        borderColor: GlobalStyle.colour.primaryColor,
        borderWidth:1
    },

    buttonView: {
        flexDirection:'row',
        height:32,
        marginTop:48,
        marginBottom:48,
        justifyContent:'center',
    },

    leftButtonView: {
        width: '50%',
        justifyContent:'center',
        //backgroundColor:'red'
    },

    rightButtonView: {
        width: '50%',
        justifyContent:'center',
        borderRightColor:GlobalStyle.colour.primaryColor,
        //backgroundColor:'blue'
    },
    separateView: {
        width: 2,
        height: 24,
        marginTop:4,
        backgroundColor:GlobalStyle.colour.primaryColor
    },

    buttonText: {
        fontSize:16,
        fontWeight:'700',
        color: GlobalStyle.colour.primaryColor
    }



})
