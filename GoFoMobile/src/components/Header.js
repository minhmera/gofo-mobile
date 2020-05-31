import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Appbar, Title } from 'react-native-paper'

import GlobalStyle from "../style/GlobalStyle";


function Header({ titleText }) {
  return (
    <Appbar.Header style={styles.headerContainer}>
      <View style={styles.container}>
        <Title style={styles.title}>{titleText}</Title>
      </View>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: GlobalStyle.colour.primaryColor
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white'
  }
})

export default Header
