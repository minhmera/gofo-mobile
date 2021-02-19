import React from 'react'
import {View, TouchableOpacity, StyleSheet, StatusBar, ImageBackground, Dimensions} from 'react-native';
import LottieView from "lottie-react-native";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function LoadingPage({isShow, spinnerStyle}) {
    console.log(' -------------  LoadingPage ----------------------')
    if (isShow === false) {
        return  null
    }

    return (
        <TouchableOpacity style={styles.dimLoadingView}>
            <View style={[{width:80, height:80},spinnerStyle]}>
                <LottieView
                    source = {require('../utils/custom-view/LoadingJSON/spinning-circle.json')}
                    autoPlay={true}
                    speed={2}
                >
                </LottieView>
            </View>

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
})

export default LoadingPage
