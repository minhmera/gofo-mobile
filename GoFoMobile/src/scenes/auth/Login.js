import React, { useState } from 'react';
import {StatusBar, View} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'

import * as api from "../../services/auth";
import {TOKEN_KEY, useAuth, USER_KEY} from "../../providers/auth";

import Form from 'react-native-basic-form';
import CTA from "../../components/CTA";
import {Header, ErrorText} from "../../components/Shared";
import Header2 from '../../components/Header';
import GlobalStyle from '../../style/GlobalStyle';


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



    async function onSubmit(state) {
        console.log("MERA  onSubmit  ==> ",state);
        setLoading(true);

        try {
            let response = await api.login(state);
            //await handleLogin(response);
            setLoading(false);
            console.log('MERA  Log in token  ',response.result.token)
            try {
                let token = await AsyncStorage.setItem(TOKEN_KEY, response.result.token)
                //navigate.setParams({"param":"Value cc "})
                navigate('App');

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

    let formProps = {title: "Login", fields, onSubmit, loading};
    const {token} = AsyncStorage.getItem(TOKEN_KEY)
    console.log('MERA AAsyncStorage token ==>  ',token)
    return (
        <View style={{flex: 1, paddingHorizontal: 16, backgroundColor:"#fff"}}>
            <Header title={"Login"}/>
            <StatusBar barStyle="light-content" />
            <View style={{flex: 1}}>
                <ErrorText error={error}/>
                <Form
                    {...formProps}
                    buttonStyle={{borderRadius:24, height:48, backgroundColor:GlobalStyle.colour.primaryColor}}

                    autoCapitalize = {true}
                >
                    <CTA
                        ctaText={"Forgot Password?"}
                        //onPress={() => navigation.navigate("ForgotPassword")}
                        onPress={() => testNavigate()  }
                        style={{marginTop: 20}}/>

                    <CTA
                        title={"Don't have an account?"}
                        ctaText={"Register"}
                        //onPress={() => navigation.replace("Register")}
                        onPress={() => getTokenKey()}

                        style={{marginTop: 50}}/>
                </Form>
            </View>
        </View>


    );
};

Login.navigationOptions = ({}) => {
    return {
        title: ``
    }
};
