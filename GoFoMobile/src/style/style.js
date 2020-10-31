import {StyleSheet} from 'react-native'
import GlobalStyle from "./GlobalStyle";

const AppStyle = StyleSheet.create({

    tabBigButtonWrapper: {
        height: 70,
        width: 70,
        borderWidth:2,
        borderColor:'rgb(210,210,210)',
        //borderColor:'white',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 35,
        //overflow: 'hidden',
        marginBottom:10
    },

    tabBigButton: {
        height: 68,
        width: 68,
        borderWidth:4,
        borderColor:'white',
        //marginBottom:20,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 34,
        backgroundColor: GlobalStyle.colour.primaryColor,
        overflow: 'hidden'
    },


    container: {
        padding: 10,
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor: '$primaryColor',
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    commonButton: {
        borderRadius:10,

    }
});

module.exports = AppStyle
