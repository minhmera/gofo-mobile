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
    Image
} from 'react-native';

import * as api from '../../services/auth';

import CTA from '../../components/CTA';
import {ErrorText} from '../../components/Shared';
import Header from '../../components/Header';
import ProductPage1 from '../product/ProductPage1';
import t from 'tcomb-form-native';
import AppStyle from '../../style/style';
import GlobalStyle from '../../style/GlobalStyle';
import {Button, Input} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Icon from 'react-native-vector-icons/AntDesign';

//https://medium.com/react-native-development/easily-build-forms-in-react-native-9006fcd2a73b
function Register(props) {
    const {navigation} = props;
    //const {route} = props.route;

    let movies = navigation.getParam('movies');
    console.log('MERA Register ==>  ', movies);

    //1 - DECLARE VARIABLES
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState({});

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({});

    const [confirmPass, setConfirmPass] = useState('');
    const [confirmPassError, setConfirmPassError] = useState({});

    function isValidAllField() {
        let isValidAllFiled = true
        if (userName == "") {
            isValidAllFiled = false
            setUserNameError({style: {borderBottomColor: 'red'}, text: 'User nam can not be empty'})
        } else {
            isValidAllFiled = true
            setUserNameError({style: {}, text: ''})
        }

        if (password == "") {
            isValidAllFiled = false
            setPasswordError({style: {borderBottomColor: 'red'}, text: 'Password can not be empty'})

        } else if (password.length < 8) {
            setPasswordError({style: {borderBottomColor: 'red'}, text: 'Password must be more than 8 char '})
        } else {
            isValidAllFiled = true
            setPasswordError({style: {}, text: ''})

        }

        if (confirmPass != password) {
            isValidAllFiled = false
            setConfirmPassError({style: {borderBottomColor: 'red'}, text: 'Confirm password is diff with password'})

        } else {
            isValidAllFiled = true
            setConfirmPassError({style: {}, text: ''})

        }
        return isValidAllFiled
    }

    async function onSubmit() {
        console.log('MERA Register value: ', isValidAllField());
        if (isValidAllField() === false) {
            return
        }

        let registerObj = {
            "username": userName,
            "password": password,

        }

        try {
            let response = await api.register(registerObj);
            console.log('MERA  Register   ', response);
            setLoading(false);
            Alert.alert(
                'Registration Successful',
                response.message,

                [
                    {text: 'OK'}, //  {text: 'OK', onPress: () => navigation.replace("Login")}
                ],
                {cancelable: false},
            );
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (

        <ImageBackground
            style={{flex: 1, backgroundColor: '#fff'}}
            //source={require('../../resources/backGround/bg1.png')}
            source={{uri: 'https://dongxanh.s3.us-east-2.amazonaws.com/app_resource/bg_01.jpg'}}
        >
            <View style={styles.dimView}>
                <StatusBar barStyle="light-content"/>
                <Header titleText='Đăng Ký Tài Khoảng' navigation={navigation}/>


                <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode={'on-drag'}>
                    <View style={styles.loginContainer}>
                        {/*<Text style={styles.registerText}>Đăng Ký Tài Khoảng</Text>*/}

                        <View style={styles.inputView}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={[styles.inputContainer, userNameError.style]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                //errorStyle={{ color: 'red' }}
                                //placeholderTextColor = {'red'}
                                placeholder='Tên đăng nhập...'
                                //errorMessage={userNameError.text}
                                onChangeText={text => setUserName(text)}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={[styles.inputContainer, passwordError.style]}
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                errorMessage={passwordError.text}
                                placeholder='Mật khẩu...'
                                onChangeText={text => setPassword(text)}

                            />
                        </View>
                        <View style={styles.inputView}>
                            <Input
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={[styles.inputContainer, confirmPassError.style]}
                                errorMessage={confirmPassError.text}
                                placeholder='Confirm Password'
                                placeholderTextColor={GlobalStyle.colour.grayColor2}
                                onChangeText={text => setConfirmPass(text)}

                            />
                        </View>

                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => onSubmit()}
                        >
                            <Text style={styles.loginText}>Đăng ký</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        </ImageBackground>

    );
};

export default Register;


//onPress={() => navigation.replace("Login")}
//onPress={() => navigation.goBack()}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
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
    inputStyle: {
        fontSize: 18,
        color: 'white',
        //paddingTop: 18,
        height: 58,
        fontWeight: '400',
    },
    inputContainer: {
        borderBottomWidth: 0
    },

    inputView: {
        width: "80%",
        //backgroundColor:"#465881",
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        fontSize: 14,
        height: 50,
        color: GlobalStyle.colour.primaryColor
    },
    loginBtn: {
        width: "80%",
        //backgroundColor:"#fb5b5a",
        backgroundColor: GlobalStyle.colour.primaryColor,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white'
    },
});


/*
return (

    <View style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar barStyle="light-content" />
        <Header titleText='Register' navigation={navigation}/>


        <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode = {'on-drag'}>
            <View style={{flex: 1,marginTop:120,marginLeft:32, marginRight:32}}>
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={[styles.basicInput,userNameError.style]}
                    //errorStyle={{ color: 'red' }}
                    placeholder='User name'
                    errorMessage={userNameError.text}
                    onChangeText={text => setUserName(text)}

                />
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={[styles.basicInput,passwordError.style]}
                    errorMessage={passwordError.text}
                    placeholder='Password'
                    onChangeText={text => setPassword(text)}

                />
                <Input
                    inputStyle={styles.inputStyle}
                    inputContainerStyle={[styles.basicInput,confirmPassError.style]}
                    errorMessage={confirmPassError.text}
                    placeholder='Confirm Password'
                    onChangeText={text => setConfirmPass(text)}

                />


                <View style={styles.bottomView}>
                    <Button
                        title="Đăng Ký"
                        onPress={(state) => onSubmit(state)}
                        buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                        containerStyle={styles.buttonContainer}
                    />
                </View>
            </View>
        </KeyboardAwareScrollView>
    </View>

);*/
