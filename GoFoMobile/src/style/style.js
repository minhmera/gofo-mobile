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
    commonButton_1: {
        borderRadius:10,

    },
    inputStyle: {
        fontSize: 16,
        color: 'white',

        height: 58,
        fontWeight: '400',
    },

    inputView: {
        width: "80%",
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },

    commonButton: {
        width: "80%",
        backgroundColor: GlobalStyle.colour.primaryColor,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",

    },
});

module.exports = AppStyle
