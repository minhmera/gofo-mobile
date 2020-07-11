import React from 'react'
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import { Appbar, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import GlobalStyle from "../style/GlobalStyle";
import {Button} from 'react-native-elements';
import AppStyle from '../style/style';
import Modal from 'react-native-modal';


function ModelList({isVisible,title,items, callBack}) {
    function RenderCategoryItem(item) {
        return (
            <TouchableOpacity
                style={styles.dropdownItem}
                key = {item}
                onPress={()=> callBack(item)}
            >
                <Text>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    }
    function renderDropdown(items) {
        //console.log('RenderCategoryList  data1 ==> ', data)
        if (items.length > 0) {
            return (
                <View style={{flex:1,marginLeft: 10,marginRight: 10, marginTop:10}}>
                    <FlatList
                        data={items}
                        renderItem={({item}) =>
                            RenderCategoryItem(item)
                        }

                        keyExtractor={(item, index) => item}
                    />
                </View>
            )
        }
    }
    return (
        <Modal isVisible={isVisible}>
            <View style={styles.dropDownContainer}>
                <Text style={styles.dropdownTitle}>{title}</Text>
                {renderDropdown(items)}

                {/*<View
                    style= {styles.dropDownHideButtonView}>
                    <Button
                        style={{backgroundColor:GlobalStyle.colour.primaryColor,borderRadius:20,}}
                        title="Hide modal"
                        buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                        onPress={()=> callBack()}
                    />
                </View>*/}

            </View>
        </Modal>
    )

}
export default ModelList

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
    },
    dropDownContainer: {
        //flex:1,
        height:'80%',
        borderRadius:6,
        backgroundColor:'white',



    },
    dropDownHideButtonView: {
        width:'80%',
        marginBottom:20,
        alignSelf: 'center',


    },
    dropdownTitle: {
        color:GlobalStyle.colour.primaryColor,
        fontSize:20,
        fontWeight:'700',
        alignSelf:'center',
        paddingTop:20,
    },

    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,

    },

    dropdownItem: {
        height:40,
        //backgroundColor:'yellow',
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,

        justifyContent:'center',
        alignItems:'center'
    },

})


