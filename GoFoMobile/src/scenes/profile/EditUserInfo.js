import React, {useEffect, useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedLoader from "../../utils/custom-view/AnimatedLoader";
import LottieView from 'lottie-react-native';
import CommonButton from "../../components/CommonButton";
import AsyncStorage from "@react-native-community/async-storage";
import {
    FULL_NAME_KEY,
    PASSWORD_KEY,
    PHONE_NUMBER_KEY,
    TOKEN_KEY,
    USER_ID_KEY,
    USER_NAME_KEY
} from "../../config/Contants";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
function EditUserInfo(props) {
    const {navigation} = props;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState({});


    async function getUserInfo() {
        let phoneNumber = await AsyncStorage.getItem(PHONE_NUMBER_KEY);
        console.log('getUserInfo phoneNumber ==>  ',phoneNumber)
        setPhoneNumber(phoneNumber)
    }

    function isValidAllField() {
        let isValidAllFiled = true
        if (phoneNumber == "") {
            isValidAllFiled = false
            setPhoneNumberError({style:{borderColor:'red'},text:'Vui lòng nhập số điện thoại'})
        } else {
            setPhoneNumberError({style: {marginTop: 0}, text: ''})
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
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        let fullName = await AsyncStorage.getItem(FULL_NAME_KEY);
        let password = await AsyncStorage.getItem(PASSWORD_KEY);


        let editingObj = {
            "phoneNumber": phoneNumber,
            "userId":userId,
            //"fullName":fullName,
            "password":password,
        }

        console.log('MERA  registerObj   ', editingObj);
        setLoading(true);
        try {
            let response = await api.editUserInfo(editingObj);
            console.log('MERA  Register Res ', response);
            setLoading(false);
            AsyncStorage.setItem(PHONE_NUMBER_KEY, phoneNumber)
            console.log('Set phone  ====>  ',phoneNumber)

            Alert.alert(
                'Thành công',
                'Thay đổi số điện thoại thành công',
                [
                    {text: 'OK'}
                ],
                {cancelable: false},
            )




        } catch (error) {

            setError(error.message);
            console.log('MERA Error ', error.message);
            setLoading(false);
            Alert.alert(
                'Lỗi',
                'Xảy ra lỗi, vui lòng thử lại',
                [
                    {text: 'OK'}
                ],
                {cancelable: false},
            );
        }

    }




    function onPhoneChange(phone) {
        const re = /^[0-9\b]+$/;
        console.log('isValid phone ==>   ',re.test(phone))
        if (phone === '' || re.test(phone)) {
            setPhoneNumber(phone)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, []);

    return (

        <ImageBackground
            style={styles.container}
            source={{uri: 'https://dongxanh.s3.us-east-2.amazonaws.com/app_resource/bg_01.jpg'}}
        >

            <View style={styles.dimView}>

                <StatusBar barStyle="light-content"/>
                <Header titleText='Đổi Số Điện Thoại' navigation={navigation}/>
                <View style={{flex: 1}}>
                    <View style={styles.loginContainer}>
                        <View style={[AppStyle.inputView, phoneNumberError.style]}>
                            <Input
                                inputStyle={[AppStyle.inputStyle]}
                                inputContainerStyle={[styles.inputContainer]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                placeholder='Số điện thoại ...'
                                errorMessage={phoneNumberError.text}
                                errorStyle={{marginTop:4}}
                                onChangeText={text => onPhoneChange(text)}
                                keyboardType={'number-pad'}
                                value={phoneNumber}
                                maxLength={16}

                            />
                        </View>
                        <CommonButton
                            title={'OK'}
                            customStyle={{width:'60%',marginTop:24}}
                            onPress={()=> onSubmit()}
                        />

                    </View>
                </View>

            </View>

            {renderLoadingView(loading)}

        </ImageBackground>

    );
};

export default EditUserInfo;


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
        backgroundColor: 'rgba(0,0,0,0.7)',
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

