import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Linking, ImageBackground} from 'react-native';

import GlobalStyle from "../style/GlobalStyle";
import Icon from "react-native-vector-icons/AntDesign";

function DropdownButton({title, onPress, isError,containerStyle}) {
    let errorStyle = null
    if (isError === true) {
        errorStyle = {
            borderBottomColor: GlobalStyle.colour.errorColor,
            color: GlobalStyle.colour.errorColor
        }
    }

    return (
        <TouchableOpacity
            style={[styles.dropdownButton,containerStyle, errorStyle]}
            activeOpacity={1}
            onPress={() => onPress()}
        >
            <View style={{flex: 4}}>
                <Text style={[styles.dropdownButtonTitle, errorStyle]}>
                    {title}
                </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', marginRight: 4}}>
                <Icon
                    name='caretdown'
                    size={10}
                    color={errorStyle ? 'red' : 'black'}
                />
            </View>

        </TouchableOpacity>
    )
}
export default DropdownButton

const styles = StyleSheet.create({

    dropdownButton: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',

        marginLeft: 8,
        marginRight: 8,
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,
    },
    dropdownButtonTitle: {
        color: 'black'
    },
    dropdownItem: {
        justifyContent: 'center',
        height: 40,
        ///backgroundColor:'yellow',
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,
    },
})

