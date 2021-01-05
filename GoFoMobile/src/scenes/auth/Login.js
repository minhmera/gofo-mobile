import React, { useState } from 'react';
import {StatusBar,TextInput,TouchableOpacity, StyleSheet, View,Text} from 'react-native';

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
import {TOKEN_KEY, USER_ID_KEY, USER_KEY,USER_NAME_KEY} from "../../config/Contants";


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
            console.log('MERA  Login Result  ',response.result.userInfo.local.fullName)
            try {
                let token = await AsyncStorage.setItem(TOKEN_KEY, response.result.token)
                let id = await AsyncStorage.setItem(USER_ID_KEY, response.result.userInfo._id)
                let userName = await AsyncStorage.setItem(USER_NAME_KEY, response.result.userInfo.local.fullName)
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

        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            {/*<Header titleText='Login' />*/}
            <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode = {'on-drag'}>

                <View style={styles.loginContainer}>
                    <Text style={styles.logo}>MP Food</Text>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder="Email..."
                            placeholderTextColor="#B5B5B5"
                            onChangeText={text => setUserName(text)}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            secureTextEntry
                            style={styles.inputText}
                            placeholder="Password..."
                            placeholderTextColor="#B5B5B5"

                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => onSubmit()}
                    >
                        <Text style={styles.loginText}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => testNavigate()}
                    >
                        <Text style={styles.loginText}>Đăng ký</Text>
                    </TouchableOpacity>


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
    container: {
        flex: 1,
        backgroundColor: '#003248',
        //backgroundColor:GlobalStyle.colour.primaryColor,
    },

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
    },

    loginContainer: {
        flex: 1,
        marginTop: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        //color:"#fb5b5a",
        color:'white',
        marginBottom:40
    },
    inputView:{
        width:"80%",
        //backgroundColor:"#465881",
        borderWidth:0.5,
        borderColor:'white',
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        fontSize:14,
        height:50,
        color:'white'
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        //backgroundColor:"#fb5b5a",
        backgroundColor:GlobalStyle.colour.primaryColor,
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        fontWeight:'700',
        color:"white"
    },

    signUpText: {
        fontWeight:'700',
       color:GlobalStyle.colour.primaryColor,
    },

});



