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
import Header from '../../components/Header';
import CategoryPage from '../product/CategoryPage';
import t from 'tcomb-form-native';
import AppStyle from '../../style/style';
import GlobalStyle from '../../style/GlobalStyle';
import {Button, Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedLoader from "../../utils/custom-view/AnimatedLoader";
import LottieView from 'lottie-react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import * as AppUtils from '../../utils/AppUtils'

import {
    SPECIAL_CHAR_WARNING,
    PHONE_NUMBER_ERROR,
    MINIMUM_4_CHAR,
    MINIMUM_8_CHAR
} from '../../contants/appContants'



//https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
function Register(props) {
    const {navigation} = props;
    //const {route} = props.route;

    let movies = navigation.getParam('movies');
    //console.log('MERA Register ==>  ', movies);

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState({});

    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState({});

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState({});

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({});

    const [confirmPass, setConfirmPass] = useState('');
    const [confirmPassError, setConfirmPassError] = useState({});

    const [onPassSecure, setPassSecure] = useState(true)
    const [onConfirmPassSecure, setConfirmPassSecure] = useState(true)

    function isValidAllField() {
        let isValidAllFiled = true

        if (userName === "") {
            isValidAllFiled = false
            setUserNameError({style:{borderColor:GlobalStyle.colour.errorColor,paddingTop: 16},text:'Vui lòng nhập tên đăng nhập'})
        } else {
            if (userName.length < 4) {
                isValidAllFiled = false
                setUserNameError({style:{borderColor:GlobalStyle.colour.errorColor,paddingTop: 16},text:"Tên đăng nhập " + MINIMUM_4_CHAR})
            }  else  {
                if (AppUtils.isFullNameError(userName) === true) {
                    setUserNameError({style:{borderColor:GlobalStyle.colour.errorColor,paddingTop: 16},text:SPECIAL_CHAR_WARNING})
                } else {
                    setUserNameError({style: {marginTop: 0}, text: ''})
                }
            }

        }

        if (fullName === "") {
            isValidAllFiled = false
            setFullNameError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:'Vui lòng nhập tên đầy đủ'})
        } else {
            if (fullName.length < 4) {
                isValidAllFiled = false
                setFullNameError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:"Tên đầy đủ " + MINIMUM_4_CHAR})
            } else {
                if (AppUtils.isFullNameError(fullName) === true) {
                    isValidAllFiled = false
                    setFullNameError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:SPECIAL_CHAR_WARNING})
                } else {
                    setFullNameError({style: {marginTop: 0}, text: ''})
                }
            }
        }

        if (phoneNumber === "") {
            isValidAllFiled = false
            setPhoneNumberError({style:{borderColor:GlobalStyle.colour.errorColor,paddingTop: 16},text:'Vui lòng nhập số điện thoại'})
        } else {
            if (AppUtils.isPhoneNumberError(phoneNumber)) {
                isValidAllFiled = false
                setPhoneNumberError({style:{borderColor:GlobalStyle.colour.errorColor,paddingTop: 16},text:PHONE_NUMBER_ERROR})
            } else {
                setPhoneNumberError({style: {marginTop: 0}, text: ''})
            }

        }

        if (password === "") {
            isValidAllFiled = false
            setPasswordError({style: {borderColor: GlobalStyle.colour.errorColor, paddingTop: 16}, text: 'Vui lòng nhập mật khẩu'})

        } else if (password.length < 8) {
            isValidAllFiled = false
            setPasswordError({style: {borderColor: GlobalStyle.colour.errorColor, paddingTop: 16}, text: "Mật khẩu " + MINIMUM_8_CHAR})
        } else {
            setPasswordError({style: {marginTop: 0}, text: ''})

        }

        if (confirmPass !== password) {
            isValidAllFiled = false
            setConfirmPassError({style: {borderColor:GlobalStyle.colour.errorColor,paddingTop: 16}, text: 'Mật khẩu không trùng khớp'})

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

        let registerObj = {
            "username": userName,
            "password": password,
            "fullName": fullName,
            "phoneNumber": phoneNumber,

        }

        console.log('MERA  registerObj   ', registerObj);
        setLoading(true);
        try {
            let response = await api.register(registerObj);
            setLoading(false);

            if (response ) {
                setLoading(false);
                console.log('MERA RES  ',response.result.message)
                if (response.result.success === true ){
                    console.log('MERA RES 11  ',response.result.message)
                    Alert.alert(
                        'Đăng kí tài khoảng thành công',
                        response.message,

                        [
                            {text: 'Xin mời bạn đăng nhập để để tiếp tục', onPress: () => navigation.replace("Login")}
                        ],
                        {cancelable: false},
                    );
                } else {
                    console.log('MERA RES 22  ',response.result.message)
                    let errorText = response.result.message
                    Alert.alert(errorText)
                }
            }

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    function onUsernameChange(username) {
        const re = /^[A-Za-z0-9]+$/;
        console.log('isValid username1 ==>   ',re.test(username))
        if (username === '' || re.test(username)) {
            setUserName(username)
        }
    }

    function onPhoneChange(phone) {
        const re = /^[0-9\b]+$/;
        console.log('isValid phone ==>   ',re.test(phone))
        if (phone === '' || re.test(phone)) {
            setPhoneNumber(phone)
        }
    }

    function onFullNameChange(fullName) {
        setFullName(fullName)
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
            //source={{uri:'https://dongxanh.s3.us-east-2.amazonaws.com/app_resource/bg_01.jpg'}}
            source={require('../../resources/backGround/place_holder_login.png')}
        >

            <View style={styles.dimView}>

                <StatusBar barStyle="light-content"/>
                <Header titleText='Đăng Ký Tài Khoản' navigation={navigation}/>
                <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode={'on-drag'}>
                    <View style={styles.loginContainer}>

                        <Text style={styles.titleText}>Tên đăng nhập</Text>
                        <View style={[AppStyle.inputView, userNameError.style]}>
                            <Input
                                inputStyle={[AppStyle.inputStyle]}
                                inputContainerStyle={[styles.inputContainer]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                placeholder='Tên đăng nhập...'
                                errorMessage={userNameError.text}
                                errorStyle={{marginTop:0}}
                                onChangeText={text => onUsernameChange(text)}
                                value={userName}
                                maxLength={16}

                            />
                        </View>

                        <Text style={styles.titleText}>Tên đầy đủ</Text>
                        <Text style={{marginTop:-2,fontSize:12, color:GlobalStyle.colour.grayColor}}>(Đây là tên sẽ hiển thị khi bạn đăng tin mua bán)</Text>
                        <View style={[AppStyle.inputView,fullNameError.style]}>
                            <Input
                                inputStyle={[AppStyle.inputStyle]}
                                inputContainerStyle={[styles.inputContainer]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                placeholder='Tên đầy đủ...'
                                errorMessage={fullNameError.text}
                                errorStyle={{marginTop:0}}
                                onChangeText={text => onFullNameChange(text)}
                                value={fullName}
                                maxLength={16}

                            />
                        </View>

                        <Text style={styles.titleText}>Số điện thoại</Text>
                        <Text style={{marginTop:-2,fontSize:12, color:'white'}}>(Số điện thoại để liên lạc khi bạn đăng tin mua bán)</Text>
                        <View style={[AppStyle.inputView, phoneNumberError.style]}>
                            <Input
                                inputStyle={[AppStyle.inputStyle]}
                                inputContainerStyle={[styles.inputContainer]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                placeholder='Số điện thoại...'
                                errorMessage={phoneNumberError.text}
                                errorStyle={{marginTop:0}}
                                onChangeText={text => onPhoneChange(text)}
                                keyboardType={'number-pad'}
                                maxLength={16}

                            />
                        </View>

                        <Text style={styles.titleText}>Mật khẩu</Text>
                        <View style={[AppStyle.inputView, passwordError.style ]}>
                            <Input
                                inputStyle={[AppStyle.inputStyle]}
                                inputContainerStyle={[styles.inputContainer]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                errorMessage={passwordError.text}
                                errorStyle={{marginTop:0}}
                                placeholder='Mật khẩu...'
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

                        <Text style={styles.titleText}>Nhập lại mật khẩu</Text>
                        <View style={[AppStyle.inputView,confirmPassError.style]}>
                            <Input
                                inputStyle={AppStyle.inputStyle}
                                inputContainerStyle={[styles.inputContainer]}
                                errorMessage={confirmPassError.text}
                                errorStyle={{marginTop:0}}
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


                        <TouchableOpacity
                            style={[AppStyle.commonButton,{marginTop:20}]}
                            onPress={() => onSubmit()}
                        >
                            <Text style={styles.loginText}>Đăng ký</Text>
                        </TouchableOpacity>


                    </View>
                </KeyboardAwareScrollView>

            </View>

            {renderLoadingView(loading)}

        </ImageBackground>

    );
};

export default Register;


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginLeft:'10%'
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
});

