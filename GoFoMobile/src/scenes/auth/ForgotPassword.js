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

//https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
function ForgotPassword(props) {
    const {navigation} = props;
    //const {route} = props.route;

    let movies = navigation.getParam('movies');
    console.log('MERA Register ==>  ', movies);

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState({});

    const [onConfirmPassSecure, setConfirmPassSecure] = useState(false)

    function isValidAllField() {
        let isValidAllFiled = true
        if (userName == "") {
            isValidAllFiled = false
            setUserNameError({style:{borderColor:'red',paddingTop: 16},text:'Vui lòng nhập tên đăng nhập'})
        } else {
            setUserNameError({style: {marginTop: 0}, text: ''})
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

        console.log('MERA  userName   ', userName);
        setLoading(true);
        try {
            let response = await api.genNewPass(userName);
            console.log('MERA  Register Res ', response);
            setLoading(false);

            if (response ) {
                setLoading(false);
                console.log('MERA RES  ',response)
                Alert.alert(
                    'Khôi phục mật khẩu thành công',
                    "Mật khẩu mới của bạn là " + response.newPass,
                    // [
                    //     {text: 'Xin mời bạn đăng nhập để để tiếp tục', onPress: () => navigation.replace("Login")}
                    // ],
                    {cancelable: false},
                );


            } else {
                console.log('MERA RES Error  ',response)
                Alert.alert('Tên đăng nhập không tồn tại')
            }


        } catch (error) {
            setError(error.message);
            setLoading(false);
        }

    }

    return (

        <ImageBackground
            style={styles.container}
            source={{uri: 'https://dongxanh.s3.us-east-2.amazonaws.com/app_resource/bg_01.jpg'}}
        >

            <View style={styles.dimView}>

                <StatusBar barStyle="light-content"/>
                <Header titleText='Quên Mật Khẩu' navigation={navigation}/>
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
                                onChangeText={text => setUserName(text)}
                            />
                        </View>




                        <TouchableOpacity
                            style={[AppStyle.commonButton,{marginTop:20}]}
                            onPress={() => onSubmit()}
                        >
                            <Text style={styles.loginText}>Khôi Phục Mật Khẩu</Text>
                        </TouchableOpacity>


                    </View>
                </KeyboardAwareScrollView>

            </View>

            {renderLoadingView(loading)}

        </ImageBackground>

    );
};

export default ForgotPassword;


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
    titleText: {
        marginBottom:4,
        fontSize:16,
        color:'white',
        fontWeight:'bold'
    },
});

