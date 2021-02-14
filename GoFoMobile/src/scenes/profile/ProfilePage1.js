import React from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {StyleSheet, View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_NAME_KEY} from "../../config/Contants";
import GlobalStyle from "../../style/GlobalStyle";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";


function ProfilePage1({navigation}) {
    //const {navigate} = props.navigation;
    async function logout() {
        AsyncStorage.clear()
        let token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("MERA ProfilePage1  props1   ==> ", token)
        navigation.navigate('Auth')
    }

    async function testFunc() {
        let userName = await AsyncStorage.getItem(USER_NAME_KEY);
        console.log('MERA ==> userName  ', userName)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>

            </View>


                <View style={styles.body}>
                    <KeyboardAwareScrollView  keyboardDismissMode={'on-drag'}>
                        <View>
                            <Text> aaa 1 </Text>
                        </View>
                    </KeyboardAwareScrollView>
                </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 1,
        backgroundColor: GlobalStyle.colour.primaryColor
    },
    body: {
        flex: 4
    }
})

export default ProfilePage1
