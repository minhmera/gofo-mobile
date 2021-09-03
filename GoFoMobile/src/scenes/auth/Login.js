import React, {useState} from 'react';
import {
    StatusBar,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    Alert,
    Dimensions
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import * as api from "../../services/auth";
import {useAuth} from "../../contexts/auth";

import CTA from "../../components/CTA";
import {ErrorText} from "../../components/Shared";
import GlobalStyle from '../../style/GlobalStyle';
import Header from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Input} from 'react-native-elements';
import AppStyle from '../../style/style';
import AnimatedLoader from '../../utils/custom-view/AnimatedLoader'
import {backgroundColor} from 'react-native-calendars/src/style';
import {TOKEN_KEY, USER_ID_KEY, USER_KEY, USER_NAME_KEY,FULL_NAME_KEY,PASSWORD_KEY,PHONE_NUMBER_KEY} from "../../config/Contants";
import Icon from "react-native-vector-icons/AntDesign";
import LoadingPage from "../../components/LoadingPage";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
    const {handleLogin} = useAuth();

    const fields = [
        {name: 'email', label: 'Email Address', autoCapitalize: "none", required: true},
        {name: 'password', label: 'Password', required: true, secure: true}
    ];

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState({});

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({});
    const [onPassSecure, setPassSecure] = useState(true)



    const [isDisableResButton, setDisableResButton] = useState(false)
    const [isDisableForgotButton, setDisableForgotButton] = useState(false);


    function isValidAllField() {
        let isValidAllFiled = true
        if (userName == "") {
            isValidAllFiled = false
            //setUserNameError({style:{borderColor:'red'},text:'Vui lòng nhập tên đăng nhập'})
            setUserNameError({style:{borderColor:GlobalStyle.colour.errorColor,paddingTop: 8},text:'Vui lòng nhập tên đăng nhập'})
        } else {
            setUserNameError({style: {paddingTop: 0}, text: ''})
        }

        if (password == "") {
            isValidAllFiled = false
            setPasswordError({style: {borderColor: 'red', paddingTop: 14}, text: 'Vui lòng nhập mật khẩu'})

        } else if (password.length < 8) {
            isValidAllFiled = false

            setPasswordError({style: {borderColor: 'red', paddingTop: 14}, text: 'Mật khẩu phải có ít nhất 8 kí tự'})

        } else {


            setPasswordError({style: {paddingTop: 0}, text: ''})
        }

        return isValidAllFiled
    }

    async function onSubmit() {
        console.log('MERA Login submit ')
        if (isValidAllField() === false) {
            return
        }


        let submitObj = {username: userName, password: password}
        console.log("MERA  onSubmit  ==> ", USER_ID_KEY);
        setLoading(true);

        try {
            let response = await api.login(submitObj);
            //await handleLogin(response);

            try {
                let token = await AsyncStorage.setItem(TOKEN_KEY, response.result.token)
                let id = await AsyncStorage.setItem(USER_ID_KEY, response.result.userInfo._id)
                let userName = await AsyncStorage.setItem(USER_NAME_KEY, response.result.userInfo.local.username)
                let fullName = await AsyncStorage.setItem(FULL_NAME_KEY, response.result.userInfo.local.fullName)
                let password = await AsyncStorage.setItem(PASSWORD_KEY, response.result.userInfo.local.password)
                let phoneNumber = await AsyncStorage.setItem(PHONE_NUMBER_KEY, response.result.userInfo.local.phoneNumber)
                navigate('App');
                setLoading(false);

            } catch (error) {
                // Error saving data
                console.log(' ------------------ ERROR 11 -------------- ',error)
                setLoading(false);
                Alert.alert(
                    'Lỗi !!!',
                    'Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại',
                    [
                        {text: 'OK'}
                    ],
                    {cancelable: false},
                )
            }

        } catch (error) {
            console.log(' ------------------ ERROR 22 -------------- ',error)
            setError(error.message);
            setLoading(false)
            Alert.alert(
                'Lỗi !!!',
                'Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại',
                [
                    {text: 'OK'}
                ],
                {cancelable: false},
            )
        }
    }

    function onRegisterClick() {
        console.log('MERA isLoginPressed ')
        setDisableResButton(true)
        if (isDisableResButton === false) {
            navigation.push('Register', {movies: {name: 'Lucy'}})
        }

        setTimeout(() => {
           setDisableResButton(false)
        }, 900);

    }

    function navigateToForgot() {
        console.log('MERA navigateToForgot ')

        setDisableForgotButton(true)
        if (isDisableForgotButton === false) {
            navigation.push('ForgotPassword', {movies: {name: 'Lucy'}})
        }

        setTimeout(() => {
            setDisableForgotButton(false)
        }, 900);
    }

    const {token} = AsyncStorage.getItem(TOKEN_KEY)
    console.log('MERA AAsyncStorage token ==>  ', token)
    return (

        <ImageBackground
            style={styles.container}
            source={require('../../resources/backGround/place_holder_login.png')}
        >
            <StatusBar barStyle="light-content"/>

            <View style={styles.dimView}>
                <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode={'on-drag'}>

                        <View style={styles.loginContainer}>
                        <Text style={styles.logo}>Wanam</Text>
                        <Text style={styles.titleText}>Tên đăng nhập</Text>
                        <View style={[AppStyle.inputView, userNameError.style]}>
                            <Input
                                inputStyle={AppStyle.inputStyle}
                                inputContainerStyle={[styles.inputContainer, userNameError.style]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                placeholder='Tên đăng nhập...'

                                errorMessage={userNameError.text}
                                errorStyle={{marginTop:0}}

                                onChangeText={text => setUserName(text)}


                            />
                        </View>

                        <Text style={styles.titleText}>Mật khẩu</Text>
                        <View style={[AppStyle.inputView, passwordError.style ]}>
                            <Input
                                inputStyle={AppStyle.inputStyle}
                                inputContainerStyle={[styles.inputContainer, userNameError.style]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                placeholder="Mật khẩu..."
                                onChangeText={text => setPassword(text)}
                                secureTextEntry={onPassSecure}

                                errorMessage={passwordError.text}
                                errorStyle={{marginTop:0}}


                                rightIcon={
                                    <Icon
                                        name='eye'
                                        size={24}
                                        color={'white'}
                                        onPress={()=> setPassSecure(!onPassSecure)}
                                    />
                                }
                                rightIconContainerStyle = {{width:80,marginRight:-30}}
                            />
                        </View>
                        <TouchableOpacity
                            style={[AppStyle.commonButton,styles.signupButton,{marginTop:10, marginBottom:-20}]}
                            onPress={() => navigateToForgot() }
                        >
                            <Text style={styles.forgot}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[AppStyle.commonButton,{marginTop:20, marginBottom:0}]}
                            onPress={() => onSubmit()}
                        >
                            <Text style={styles.loginText}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[AppStyle.commonButton,styles.signupButton]}
                            onPress={() => onRegisterClick()}
                            disabled={isDisableResButton}
                        >
                            <Text style={styles.loginText}>Đăng ký</Text>
                        </TouchableOpacity>


                    </View>


                    <LoadingPage
                        isShow={loading}
                    />

                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>

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
    },
    logo: {
        width:'80%',
        marginTop:80,
        marginBottom: 40,
        fontWeight: "bold",
        fontSize: 50,
        color: "white",
        //color: GlobalStyle.colour.primaryColor,

        textAlign:'center'
    },

    dimLoadingView: {
        height: windowHeight,
        width:windowWidth,
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    loginContainer: {
        width:'100%',
        marginTop: 20,
        marginBottom: 60,
        justifyContent: 'center',
        marginLeft:'10%',
        //backgroundColor:'gray'
    },
    registerText: {
        fontSize: 28,
        color: 'white',
        fontWeight:'600',
        marginBottom: 40
    },

    dimView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    buttonContainer: {
        paddingTop: 40,
        // paddingLeft: 32,
        // paddingRight: 32,
    },
    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,
        height: 48,

    },
    titleText: {
        marginBottom:4,
        fontSize:16,
        color:'white',
        fontWeight:'bold'
    },

    inputContainer: {
        borderBottomWidth: 0
    },
    loginText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white'

    },
    signupButton: {
        backgroundColor:'transparent'
    },


    forgot: {
        fontWeight: '600',
        color: 'white',
        fontSize: 12
    }


});




