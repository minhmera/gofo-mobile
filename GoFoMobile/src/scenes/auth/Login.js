import React, { useState } from 'react';
import {StatusBar, StyleSheet, View,Text} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import * as api from "../../services/auth";
import { useAuth} from "../../contexts/auth";

import CTA from "../../components/CTA";
import {ErrorText} from "../../components/Shared";
import GlobalStyle from '../../style/GlobalStyle';
import Header from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Input} from 'react-native-elements';
import AppStyle from '../../style/style';
import AnimatedLoader from  '../../utils/custom-view/AnimatedLoader'
import {backgroundColor} from 'react-native-calendars/src/style';
import {TOKEN_KEY, USER_ID_KEY, USER_KEY} from "../../config/Contants";


async function getTokenKey() {
    let token = await AsyncStorage.getItem(TOKEN_KEY);
    console.log("MERA getTokenKey   ==> ", token)
}


export default function Login(props) {
    const {navigation} = props;
    const {navigate} = navigation;

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { handleLogin } = useAuth();

    const fields = [
        {name: 'email', label: 'Email Address',autoCapitalize: "none", required: true},
        {name: 'password', label: 'Password', required: true, secure: true}
    ];

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState({});

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({});


    async function onSubmit() {
        let submitObj = { username: userName,  password:password}
        console.log("MERA  onSubmit  ==> ",USER_ID_KEY);
        setLoading(true);

        try {
            let response = await api.login(submitObj);
            //await handleLogin(response);
            setLoading(false);
            console.log('MERA  Log in token  ',response.result.userInfo._id)
            try {
                let token = await AsyncStorage.setItem(TOKEN_KEY, response.result.token)
                let id = await AsyncStorage.setItem(USER_ID_KEY, response.result.userInfo._id)
                //navigate.setParams({"param":"Value cc "})
                navigate('App');
                setLoading(false);

            } catch (error) {
                // Error saving data
                console.log('AsyncStorage Error 1 ',error)
            }


            //check if username is null
            // let username = (response.user.username !== null);
            // if (username) navigate('App');
            // else navigation.replace('Username');
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    function testNavigate() {
        //navigation.navigate('Register');
        //navigation.setParams({ name: 'Lucy' })

        navigation.push('Register',{
            movies: { name: 'Lucy' }
        })
    }

    const {token} = AsyncStorage.getItem(TOKEN_KEY)
    console.log('MERA AAsyncStorage token ==>  ',token)
    ////'default' | 'light-content' | 'dark-content';
    return (

        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <StatusBar barStyle="light-content" />
            <Header titleText='Login' />


            <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode = {'on-drag'}>
                <View style={{flex: 1,marginTop:120}}>
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.basicInput}
                        //errorStyle={{ color: 'red' }}
                        placeholder='User name'
                        //errorMessage={userNameError.text}
                        onChangeText={text => setUserName(text)}

                    />
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.basicInput}
                        //errorMessage={passwordError.text}
                        placeholder='Password'
                        onChangeText={text => setPassword(text)}

                    />





                    <View style={styles.bottomView}>
                        <Button
                            title="Đăng Nhập"
                            onPress={() => onSubmit()}
                            textStyle = {{fontWeight:'800'}}
                            buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                            containerStyle={styles.buttonContainer}
                        />

                        <View style={{flexDirection:'row',paddingTop: 8, alignItems:'center', justifyContent:'center'}}>
                            <Text>Chưa có tài khoản?</Text>
                            <Text
                                style={styles.registerText}
                                onPress={() => testNavigate()}
                            >Đăng Ký</Text>
                        </View>



                    </View>
                </View>


                <AnimatedLoader
                    visible={loading}
                    //overlayColor="rgba(215,215,215,0.55)"
                    overlayColor="rgba(0,0,0,0.55)"
                    animationType = 'slide'
                    animationStyle={styles.lottie}
                    //animationStyle = {{height: 200, width: 200}}
                    loop = {true}
                    speed={1}
                />



            </KeyboardAwareScrollView>
        </View>

    );

};

Login.navigationOptions = ({}) => {
    return {
        title: ``
    }
};



const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    },
    bottomView: {},
    buttonContainer: {
        paddingTop: 40,
        paddingLeft: 32,
        paddingRight: 32,
    },
    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,
        height: 48,

    },
    inputStyle: {

        height:56,
        fontSize:16 ,
        fontWeight:'400',
    },
    basicInput: {
        marginLeft:24,
        marginRight:24,
        borderBottomWidth: 0.5,
        borderBottomColor: '#B5B5B5',
    },
    registerText: {
        paddingLeft: 4,
        color:GlobalStyle.colour.primaryColor,
        fontWeight:'600'
    }

});



