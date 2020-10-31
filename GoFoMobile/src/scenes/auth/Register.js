import React, {useState} from 'react';
import {StatusBar, Alert, View, ScrollView, StyleSheet} from 'react-native';

import * as api from '../../services/auth';

import CTA from '../../components/CTA';
import {ErrorText} from '../../components/Shared';
import Header from '../../components/Header';
import ProductPage1 from '../product/ProductPage1';
import t from 'tcomb-form-native';
import AppStyle from '../../style/style';
import GlobalStyle from '../../style/GlobalStyle';
import {Button,Input} from 'react-native-elements';
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
        if (userName == "" ) {
            isValidAllFiled = false
            setUserNameError({style:{borderBottomColor:'red'}, text:'User nam can not be empty'})
        } else {
            isValidAllFiled = true
            setUserNameError({style:{}, text:''})
        }

        if (password == "" ) {
            isValidAllFiled = false
            setPasswordError({style:{borderBottomColor:'red'}, text:'Password can not be empty'})

        }else if (password.length < 8) {
            setPasswordError({style:{borderBottomColor:'red'}, text:'Password must be more than 8 char '})
        } else {
            isValidAllFiled = true
            setPasswordError({style:{}, text:''})

        }

        if (confirmPass != password ) {
            isValidAllFiled = false
            setConfirmPassError({style:{borderBottomColor:'red'}, text:'Confirm password is diff with password'})

        }else {
            isValidAllFiled = true
            setConfirmPassError({style:{}, text:''})

        }
        return  isValidAllFiled
    }

    async function onSubmit() {
        console.log('MERA Register value: ',isValidAllField());
        if (isValidAllField() === false) {
            return
        }

        let registerObj = {
            "username":userName,
            "password":password,

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

    );
};

export default Register;


//onPress={() => navigation.replace("Login")}
//onPress={() => navigation.goBack()}

const styles = StyleSheet.create({
    bottomView: {},
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
        fontSize:16,
        paddingTop:18,
        height: 58,
        fontWeight:'400',
    },
    basicInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#B5B5B5',
    },
});
