import React, { useState } from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import * as api from "../../services/auth";
import {TOKEN_KEY, useAuth, USER_KEY} from "../../contexts/auth";

import CTA from "../../components/CTA";
import {ErrorText} from "../../components/Shared";
import GlobalStyle from '../../style/GlobalStyle';
import Header from '../../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Input} from 'react-native-elements';
import AppStyle from '../../style/style';
import AnimatedLoader from  '../../utils/custom-view/AnimatedLoader'
import {backgroundColor} from 'react-native-calendars/src/style';



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
        console.log("MERA  onSubmit  ==> ");
        setLoading(true);

        try {
            let response = await api.login(submitObj);
            //await handleLogin(response);
            setLoading(false);
            console.log('MERA  Log in token  ',response.result)
            try {
                let token = await AsyncStorage.setItem(TOKEN_KEY, response.result.token)
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

        <View style={{flex: 1, backgroundColor: '#fff'}}>

            <Header titleText='Login' />


            <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode = {'on-drag'}>
                <View style={{flex: 1,marginTop:20}}>
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.basicInput}
                        //errorStyle={{ color: 'red' }}
                        placeholder='User name'
                        //errorMessage={userNameError.text}
                        onChangeText={text => setUserName(text)}

                    />
                    <Input
                        inputStyle={styles.inputStyle}
                        inputContainerStyle={styles.basicInput}
                        //errorMessage={passwordError.text}
                        placeholder='Password'
                        onChangeText={text => setPassword(text)}

                    />



                    <View style={styles.bottomView}>
                        <Button
                            title="Login"
                            onPress={() => onSubmit()}
                            buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                            containerStyle={styles.buttonContainer}
                        />
                        <Button
                            title="Register"
                            onPress={() => testNavigate()}
                            buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                            containerStyle={styles.buttonContainer}
                        />

                    </View>
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
    lottie: {
        width: 100,
        height: 100
    },
    bottomView: {},
    buttonContainer: {
        paddingTop: 40,
        padding: 20,
    },
    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,
        height: 40,

    },
    inputStyle: {
        fontSize:16 ,
        fontWeight:'400',
    },
    basicInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#B5B5B5',
    },

});



// return (
//     <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
//         <Header title={"Login"}/>
//         <StatusBar barStyle="light-content" />
//         <View style={{flex: 1}}>
//             <ErrorText error={error}/>
//             <Form
//                 {...formProps}
//                 buttonStyle={{borderRadius:24, height:48, backgroundColor:GlobalStyle.colour.primaryColor}}
//
//                 autoCapitalize = {true}
//             >
//                 <CTA
//                     ctaText={"Forgot Password?"}
//                     //onPress={() => navigation.navigate("ForgotPassword")}
//                     onPress={() => getTokenKey()}
//                     style={{marginTop: 20}}/>
//
//                 <CTA
//                     title={"Don't have an account?"}
//                     ctaText={"Register"}
//                     //onPress={() => navigation.replace("Register")}
//
//                     onPress={() => testNavigate()  }
//
//                     style={{marginTop: 50}}/>
//             </Form>
//         </View>
//     </View>
//
//
// );
