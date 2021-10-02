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
import {MINIMUM_4_CHAR, SPECIAL_CHAR_WARNING} from "../../contants/appContants";
import * as AppUtils from "../../utils/AppUtils";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
function EditUserInfo(props) {
    const {navigation} = props;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [shopPath, setShopPath] = useState('');
    const [orgShopPath, setOrgShopPath] = useState('');
    const [orgFullName, setOrgFullName] = useState('');

    const [fullNameError, setFullNameError] = useState({});
    const [shopPathError, setShopPathError] = useState({});

    async function getUserInfo() {
        //let phoneNumber = await AsyncStorage.getItem(PHONE_NUMBER_KEY);
        //setPhoneNumber(phoneNumber)
        setLoading(true)

        let userId = await AsyncStorage.getItem(USER_ID_KEY);

        if (userId) {
            console.log('getUserInfo with userId ==>  ',userId)
            let submitObj = {
                userId: userId,
            }
            let response = await api.getUserDetail(submitObj);

            setLoading(false)
            if (response.local) {
                console.log("getUserDetail   ===>  ",response.local)
                setPhoneNumber(response.local.phoneNumber)
                setFullName(response.local.fullName)
                if  (response.local.shopPath !== undefined) {
                    setShopPath(response.local.shopPath)
                }


                setOrgFullName(response.local.fullName)
                setOrgShopPath(response.local.shopPath)

            }




        }

    }

    function isValidAllField() {
        let isValidAllFiled = true

        if (fullName === "") {
            console.log('MERA isValidAllField ');
            isValidAllFiled = false
            setFullNameError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:'Vui lòng nhập tên bán hàng'})
        } else {
            if (fullName.length < 4) {
                isValidAllFiled = false
                setFullNameError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:"Tên bán hàng " + MINIMUM_4_CHAR})
            } else {

                if (AppUtils.isFullNameError(fullName) === true) {
                    isValidAllFiled = false
                    setFullNameError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:SPECIAL_CHAR_WARNING})
                } else {
                    setFullNameError({style: {marginTop: 0}, text: ''})
                }
            }
        }

        if (shopPath === "") {
            isValidAllFiled = false
            setShopPathError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:'Vui lòng nhập shop URL'})
        } else {
            if (shopPath.length < 4) {
                isValidAllFiled = false
                setShopPathError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:"URL " + MINIMUM_4_CHAR})
            } else {

                if (AppUtils.isShopPathError(shopPath) === true) {
                    isValidAllFiled = false
                    setShopPathError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:SPECIAL_CHAR_WARNING})
                } else {
                    setShopPathError({style: {marginTop: 0}, text: ''})
                }
            }
        }
        console.log('MERA Register value: ',"shopPath: ",shopPath,"fullName: ", fullName,' ==>   ', isValidAllFiled);
        return isValidAllFiled
    }

    function renderLoadingView(isShow) {
        if (isShow === false) {
            return  null
        }

        return (
            <View style={styles.dimLoadingView}>
                <View style={{width:80, height:80}}>
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
        console.log(' shopPath ==>   ',shopPath)

        if (isValidAllField() === false) {
            return
        }
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        let password = await AsyncStorage.getItem(PASSWORD_KEY);

        let upDateShopPath = ""
        let upDateFullName = ""
        if (fullName !== orgFullName) {
            upDateFullName = fullName
        }

        if (shopPath !== orgShopPath) {
            upDateShopPath = shopPath
        }

        let editingObj = {
            userId: userId,
            password: password,
            fullName: upDateFullName,
            shopPath: upDateShopPath
        }

        console.log('MERA  registerObj   ', editingObj);
        setLoading(true);
        try {
            let response = await api.changeUserDetail(editingObj);
            console.log('MERA  changeUserDetail Res11 ', response);
            setLoading(false);
            //AsyncStorage.setItem(PHONE_NUMBER_KEY, phoneNumber)

            if (response) {
                if (response.fullNameError) {
                    setFullNameError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:'Tên này đã được sử dụng'})
                }
                if (response.shopPathError) {
                    setShopPathError({style:{borderColor:GlobalStyle.colour.errorColor, paddingTop: 16},text:'Tên này đã được sử dụng'})
                }

                if (response.shopPathError === undefined && response.fullNameError === undefined ) {
                    Alert.alert(
                        'Thành công',
                        'Thay đổi thông tin thành công',
                        [
                            {text: 'OK'}
                        ],
                        {cancelable: false},
                    )
                }


            }


            console.log('Set phone  ====>  ',phoneNumber)



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


    function onFullNameChange(fullName) {
        setFullName(fullName)

    }
    function onShopPathChange(fullName) {
        setShopPath(fullName)
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
            source={require('../../resources/backGround/place_holder_login.png')}
        >

            <View style={styles.dimView}>

                <StatusBar barStyle="light-content"/>
                <Header titleText='Đổi Thông Tin Cá Nhân' navigation={navigation}/>
                <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode={'on-drag'}>
                    <View style={{flex: 1}}>
                        <View style={styles.loginContainer}>
                            <Text style={styles.titleText}>Số điện thoại</Text>
                            <View style={[AppStyle.inputView]}>
                                <Input
                                    inputStyle={[AppStyle.inputStyle]}
                                    inputContainerStyle={[styles.inputContainer]}
                                    placeholderTextColor={GlobalStyle.colour.grayColor2}
                                    placeholder='Số điện thoại ...'
                                    errorStyle={{marginTop: 4}}
                                    //onChangeText={text => onPhoneChange(text)}
                                    keyboardType={'number-pad'}
                                    value={phoneNumber}
                                    maxLength={16}
                                    disabled={true}

                                />
                            </View>

                            <Text style={styles.titleText}>Tên bán hàng</Text>
                            <View style={[AppStyle.inputView, fullNameError.style]}>
                                <Input
                                    inputStyle={[AppStyle.inputStyle]}
                                    inputContainerStyle={[styles.inputContainer]}
                                    placeholderTextColor={GlobalStyle.colour.grayColor2}
                                    placeholder='Tên bán hàng ...'
                                    errorMessage={fullNameError.text}
                                    errorStyle={{marginTop: 4}}
                                    onChangeText={text => onFullNameChange(text)}
                                    value={fullName}
                                    maxLength={16}
                                    disabled={true}

                                />
                            </View>


                            <Text style={styles.titleText}>Shop URL</Text>
                            <Text
                                style={styles.descText}>(Link trang web tới shop của bạn)</Text>
                            <View style={[AppStyle.inputView, shopPathError.style]}>
                                <Input
                                    inputStyle={[AppStyle.inputStyle]}
                                    inputContainerStyle={[styles.inputContainer]}
                                    placeholderTextColor={GlobalStyle.colour.grayColor2}
                                    placeholder='Shop URL'
                                    errorMessage={shopPathError.text}
                                    errorStyle={{marginTop: 4}}
                                    onChangeText={text => onShopPathChange(text)}
                                    //keyboardType={'number-pad'}
                                    value={shopPath}
                                    maxLength={16}

                                />
                            </View>

                            <Text style={styles.descText}>
                                Ví dụ Shop URL của bạn là abc
                            </Text>
                            <Text style={styles.descText}>
                                 Thì link trang web tới shop của bạn là:
                            </Text>
                            <Text style={[styles.descText,{marginTop:4}]}>
                                 wanam.vn/shopPage?abc
                            </Text>
                            <CommonButton
                                title={'OK'}
                                customStyle={{width: '80%', marginTop: 24}}
                                onPress={() => onSubmit()}
                            />

                        </View>
                    </View>
                </KeyboardAwareScrollView>





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
        //alignItems: 'center',
        //justifyContent: 'center'
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
        //flex:1,
        marginTop: 20,
        marginBottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'red',
        //marginLeft:'5%'
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
    titleText: {
        width:'80%',
        marginBottom:4,
        fontSize:16,
        color:'white',
        fontWeight:'bold'
    },

    descText: {
        marginTop:-2,
        fontSize:12,
        color:GlobalStyle.colour.grayColor,
        width:'80%',
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


