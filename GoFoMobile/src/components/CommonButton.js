import React from 'react'
import {View, TouchableOpacity, StyleSheet, StatusBar, ImageBackground, Dimensions, Text} from 'react-native';
import LottieView from "lottie-react-native";
import AppStyle from "../style/style";
import Icon from "react-native-vector-icons/AntDesign";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function CommonButton({title,textStyle,customStyle,onPress,iconName,iconSize,iconStyle}) {

    function renderIcon(){
        if (iconName === undefined) {
            return  null
        } else {
            return (
                <Icon
                    name = {iconName}
                    style = {[{marginLeft:8,marginBottom:4},iconStyle]}
                    size={iconSize}
                />
            )
        }
    }

    return (
        <TouchableOpacity
            style={[{flexDirection:'row'},AppStyle.commonButton,customStyle]}
            onPress={() => onPress()}
        >
            <Text style={[styles.loginText,textStyle]}>{title}</Text>
            {renderIcon()}
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
