import React, {useState} from 'react';
import {
    StatusBar,
    Alert,
    View,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    Dimensions
} from 'react-native';

import * as api from '../../services/auth';

import CTA from '../../components/CTA';
import {ErrorText} from '../../components/Shared';
import Header from '../../components/Header';
import CategoryPage from '../product/CategoryPage';
import t from 'tcomb-form-native';
import AppStyle from '../../style/style';
import GlobalStyle from '../../style/GlobalStyle';
import {Button, Input} from 'react-native-elements';
import CommonButton from '../../components/CommonButton'

import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-community/async-storage";
import {PASSWORD_KEY, PHONE_NUMBER_KEY, USER_ID_KEY} from "../../config/Contants";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ChangePassword(props) {
    const {navigation} = props;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);



    const [oldPassword, setOldPassword] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState({});


    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({});

    const [confirmPass, setConfirmPass] = useState('');
    const [confirmPassError, setConfirmPassError] = useState({});

    const [onPassSecure, setPassSecure] = useState(true)
    const [onConfirmPassSecure, setConfirmPassSecure] = useState(true)

    function isValidAllField() {
        let isValidAllFiled = true
        console.log('isValidAllField ==>  ',oldPassword)



        if (password == "") {
            isValidAllFiled = false
            setPasswordError({style: {borderColor: 'red', marginTop: 10}, text: 'Vui lòng nhập mật khẩu'})

        } else if (password.length < 8) {
            setPasswordError({style: {borderColor: 'red', marginTop: 10}, text: 'Mật khẩu phải có ít nhất 8 kí tự'})
        } else {
            setPasswordError({style: {marginTop: 0}, text: ''})
        }

        if (confirmPass != password) {
            isValidAllFiled = false
            setConfirmPassError({style: {borderColor: 'red',marginTop: 10}, text: 'Mật khẩu không trùng khớp'})

        } else {
            setConfirmPassError({style: {marginTop: 0}, text: ''})

        }
        return isValidAllFiled
    }

    function renderLoadingView(isShow) {
        if (isShow === false) {
            return  null
        }

        return (
            <View style={styles.dimLoadingView}>
                <View style={{width:100, height:100}}>
                    <LottieView
                        source = {require('../../utils/custom-view/LoadingJSON/spinning-circle.json')}
                        autoPlay={true}
                        speed={1}
                    >
                    </LottieView>
                </View>

            </View>
        )
    }

    async function onSubmit() {
        console.log('MERA Register value: ', isValidAllField());

        if (isValidAllField() === false) {
            return
        }
        let curPass = await AsyncStorage.getItem(PASSWORD_KEY);
        let userId = await AsyncStorage.getItem(USER_ID_KEY);

        let changePassObject = {
            "userId": userId,
            "password": curPass,
            "newPassword": password,

        }

        console.log('MERA  changePassObject   ', changePassObject);
        setLoading(true);
        try {
            let response = await api.changePassword(changePassObject);
            setLoading(false);

            console.log('MERA  Change pass Res ', response);
            setLoading(false);
            //AsyncStorage.setItem(PASSWORD_KEY, response.local.password)
            Alert.alert(
                'Thành công',
                'Đổi mật khẩu thành công, vui lòng đăng nhập lại để sử dụng tiếp tục',
                [
                    {text: 'OK',onPress:()=> logout()}
                ],
                {cancelable: false},
            )


        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

    }

    async function logout() {
        console.log(' ********** Log out  ***************')
        AsyncStorage.clear()
        navigation.navigate('Auth')


    }


    function onPasswordChange(password) {
        const re = /^[A-Za-z0-9]+$/;
        console.log('isValid pass ==>   ',re.test(password))
        if (password === '' || re.test(password)) {
            setPassword(password)
        }
    }




    function setConfirmPassPress() {
        console.log('MERA  onConfirmPassSecure==> ', onConfirmPassSecure)
        setConfirmPassSecure(!onConfirmPassSecure)
    }
    return (

        <ImageBackground
            style={styles.container}
            source={require('../../resources/backGround/place_holder_login.png')}
        >

            <View style={styles.dimView}>

                <StatusBar barStyle="light-content"/>
                <Header titleText='Đổi Mật Khẩu' navigation={navigation}/>
                <View style={{flex: 1}}>
                    <View style={styles.loginContainer}>


                        <View style={[AppStyle.inputView, passwordError.style ]}>
                            <Input
                                inputStyle={[AppStyle.inputStyle]}
                                inputContainerStyle={[styles.inputContainer]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                errorMessage={passwordError.text}
                                errorStyle={{marginTop:0}}
                                placeholder='Mật khẩu mới...'
                                maxLength={16}
                                value={password}
                                onChangeText={text => onPasswordChange(text)}
                                secureTextEntry={onPassSecure}

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
                        <View style={[AppStyle.inputView,confirmPassError.style]}>
                            <Input
                                inputStyle={AppStyle.inputStyle}
                                inputContainerStyle={[styles.inputContainer]}
                                errorMessage={confirmPassError.text}
                                errorStyle={{marginTop:4}}
                                placeholder='Xác nhận mật khẩu... '
                                maxLength={16}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                secureTextEntry={onConfirmPassSecure}
                                onChangeText={text => setConfirmPass(text)}

                                rightIcon={
                                    <Icon
                                        name='eye'
                                        size={24}
                                        color={'white'}
                                        onPress={()=> setConfirmPassPress(!onPassSecure)}
                                    />
                                }
                                rightIconContainerStyle = {{width:80,marginRight:-30}}
                            />
                        </View>

                        <CommonButton
                            title={'OK'}
                            customStyle={{marginTop:24}}
                            onPress={()=> onSubmit()}
                        />


                    </View>
                </View>

            </View>

            {renderLoadingView(loading)}

        </ImageBackground>

    );
};

export default ChangePassword;


//onPress={() => navigation.replace("Login")}
//onPress={() => navigation.goBack()}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dimLoadingView: {
        height: windowHeight,
        width:windowWidth,
        //top:200,
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    loginContainer: {
        flex: 1,
        marginTop: 60,
        alignItems: 'center',
        //justifyContent: 'center',
    },
    registerText: {
        fontSize: 28,
        color: 'white',
        fontWeight:'600',
        marginBottom: 40
    },

    dimView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
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

    inputContainer: {
        borderBottomWidth: 0
    },
    loginText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white'
    },
});

