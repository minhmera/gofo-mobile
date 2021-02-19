import React from 'react'
import {View, TouchableOpacity, StyleSheet, StatusBar, ImageBackground, Dimensions, Text} from 'react-native';
import LottieView from "lottie-react-native";
import AppStyle from "../style/style";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function CommonButton({title,customStyle,onPress}) {
    console.log(' -------------  LoadingPage ----------------------')


    return (
        <TouchableOpacity
            style={[AppStyle.commonButton,customStyle]}
            onPress={() => onPress()}
        >
            <Text style={styles.loginText}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

    dimLoadingView: {
        height: windowHeight,
        width:windowWidth,
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    loginText: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white'
    },
})

export default CommonButton
