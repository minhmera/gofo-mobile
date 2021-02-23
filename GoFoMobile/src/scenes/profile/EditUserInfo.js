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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/AntDesign';
import AnimatedLoader from "../../utils/custom-view/AnimatedLoader";
import LottieView from 'lottie-react-native';
import CommonButton from "../../components/CommonButton";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
function EditUserInfo(props) {
    const {navigation} = props;
    //const {route} = props.route;

    let movies = navigation.getParam('movies');
    //console.log('MERA Register ==>  ', movies);

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState({});

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState({});


    function isValidAllField() {
        let isValidAllFiled = true

        if (fullName == "") {
            isValidAllFiled = false
            setFullNameError({style:{borderColor:'red'},text:'Vui lòng nhập tên đăng nhập'})
        } else {
            setFullNameError({style: {marginTop: 0}, text: ''})
        }

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

        let editingObj = {
            "fullName": fullName,
            "phoneNumber": phoneNumber,
        }

        console.log('MERA  registerObj   ', editingObj);
        setLoading(true);
        try {
            let response = await api.editUserInfo(editingObj);
            console.log('MERA  Register Res ', response);
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
            setFullName(username)
        }

    }

    function onPhoneChange(phone) {
        const re = /^[0-9\b]+$/;
        console.log('isValid phone ==>   ',re.test(phone))
        if (phone === '' || re.test(phone)) {
            setPhoneNumber(phone)
        }
    }

    return (

        <ImageBackground
            style={styles.container}
            source={{uri: 'https://dongxanh.s3.us-east-2.amazonaws.com/app_resource/bg_01.jpg'}}
        >

            <View style={styles.dimView}>

                <StatusBar barStyle="light-content"/>
                <Header titleText='Thay Đổi Thông Tin' navigation={navigation}/>
                <View style={{flex: 1}}>
                    <View style={styles.loginContainer}>

                        <View style={[AppStyle.inputView, fullNameError.style]}>
                            <Input
                                inputStyle={[AppStyle.inputStyle]}
                                inputContainerStyle={[styles.inputContainer]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                placeholder='Tên đầy đủ...'
                                errorMessage={fullNameError.text}
                                errorStyle={{marginTop:4}}
                                onChangeText={text => onUsernameChange(text)}
                                value={fullName}tên
                                maxLength={16}

                            />
                        </View>


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
                                maxLength={16}

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

