import React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Text, FlatList, Alert} from 'react-native';
import {Appbar, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import GlobalStyle from '../style/GlobalStyle';
import {Button} from 'react-native-elements';
import AppStyle from '../style/style';
import Modal, { SlideAnimation, ModalContent } from 'react-native-modal';


function ModelList({isVisible, title, items, customField, customItemId, style, callBack}) {
    //console.log('MERA ModelList 11 ==> ', items);

    function RenderCategoryItem(item, customField) {
        if (customField === undefined) {
            return (
                <TouchableOpacity
                    style={styles.dropdownItem}
                    key={item}
                    onPress={() => callBack(item)}
                >
                    <Text>
                        {item}
                    </Text>
                </TouchableOpacity>
            );
        } else {
            //console.log('MERA ModelList ==> RenderCategoryItem  ', item, '|| 22  customField ==> ', customField, 'item.customField ', item.title_vi);
            return (
                <TouchableOpacity
                    style={styles.dropdownItem}
                    key={item[`${customItemId}`]}
                    onPress={() => callBack(item)}
                >
                    <Text>
                        {item[`${customField}`]}
                    </Text>
                </TouchableOpacity>
            );
        }

    }

    function renderDropdown(items, customField) {

        if (items.length > 0) {
            return (
                <View style={{flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10}}>
                    <FlatList
                        data={items}
                        renderItem={({item}) =>
                            RenderCategoryItem(item, customField)
                        }

                        keyExtractor={(item, index) => customField === undefined ? item : item[`${customItemId}`]}
                    />
                </View>
            );
        }
    }

    let customStyle = {};
    if (style !== undefined) {
        customStyle = style;
    }
    return (
        <Modal
            isVisible={isVisible}
            //modalAnimation="slide"
            animationIn = {'slideInUp'}
            animationInTiming = {100}
        >
            <TouchableOpacity style={styles.container} activeOpacity = {1} onPress={() => callBack('')} >
                <TouchableOpacity style={[styles.dropDownContainer, customStyle]} activeOpacity={1}
                                  onPress={() => callBack('')}>
                    <Text style={styles.dropdownTitle}>{title}</Text>
                    {renderDropdown(items, customField)}

                    {/*<View
                    style={styles.dropDownHideButtonView}>
                    <Button
                        style={{backgroundColor: GlobalStyle.colour.primaryColor, borderRadius: 20}}
                        title="Hide modal"
                        buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                        onPress={() => callBack()}
                    />
                </View>*/}

                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );

}

export default ModelList;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: GlobalStyle.colour.primaryColor,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        //textAlign: 'center',


    },
    backButtonView: {
        width: 40,
        //backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',

    },
    titleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropDownContainer: {
        height: '80%',
        borderRadius: 6,
        backgroundColor: 'white',


    },
    dropDownHideButtonView: {
        width: '80%',
        marginBottom: 20,
        alignSelf: 'center',


    },
    dropdownTitle: {
        color: GlobalStyle.colour.primaryColor,
        fontSize: 20,
        fontWeight: '700',
        alignSelf: 'center',
        paddingTop: 20,
    },

    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,

    },

    dropdownItem: {
        height: 40,
        //backgroundColor:'yellow',
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,

        justifyContent: 'center',
        alignItems: 'center',
    },

});




