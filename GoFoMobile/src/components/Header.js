import React from 'react'
import {View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { Appbar, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';

import GlobalStyle from "../style/GlobalStyle";


function Header({ titleText,navigation }) {
  //console.log('MERA Header ==>  navigation  ',navigation)
  function goBack() {
    console.log('MERA Header ==>  navigation  ',navigation)
    //navigation.replace("Login")
    navigation.goBack()
  }
  if (navigation) {
    return (
        <Appbar.Header style={styles.headerContainer}>
          <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButtonView}
                onPress={() => goBack()}
            >
              <Icon
                  name='arrowleft'
                  size={26}
                  color={'white'}
              />
            </TouchableOpacity>
            <View style={styles.titleView}>
              <Title style={[styles.titleText,{marginLeft:-40}]}>{titleText}</Title>
            </View>

          </View>
        </Appbar.Header>
    )
  }  else {
    return (
        <Appbar.Header style={styles.headerContainer}>
          <View style={styles.container}>
            <View style={styles.titleView}>
              <Title style={styles.titleText}>{titleText}</Title>
            </View>

          </View>
        </Appbar.Header>
    )
  }

}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: GlobalStyle.colour.primaryColor
  },
  container: {
    flex:1,
    flexDirection:'row',
    //justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center'
  },
  backButtonView: {
    width:40,
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleView: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Header
