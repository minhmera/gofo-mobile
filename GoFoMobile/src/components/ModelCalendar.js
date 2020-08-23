import React from 'react'
import {View, TouchableOpacity, StyleSheet, Text, FlatList} from 'react-native';
import { Appbar, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign';
import GlobalStyle from "../style/GlobalStyle";
import {Button} from 'react-native-elements';
import AppStyle from '../style/style';
import Modal from 'react-native-modal';
import {LocaleConfig, Calendar} from 'react-native-calendars';





function ModelCalendar({isVisible,title,items, callBack}) {

    LocaleConfig.locales['vn'] = {
        monthNames: ['Tháng một','Tháng hai ','Tháng ba','Tháng tư','Tháng năm','Tháng sáu','Tháng bảy ','Tháng tám ','Tháng chín ','Tháng mười ','Tháng mười hai'],
        monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
        dayNames: ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'],
        dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
        today: 'Hôm nay'
    };

    LocaleConfig.defaultLocale = 'vn'
    //console.log('ModelCalendar ==>  ',LocaleConfig)

    return (
        <Modal isVisible={isVisible}>
            <TouchableOpacity style={styles.dropDownContainer} activeOpacity={1} >
                <Text style={styles.dropdownTitle}>{title}</Text>

                <Calendar
                    onDayPress={(day) => callBack(day)}
                    markedDates={{
                        '2020-08-25': { selected: true, selectedColor: GlobalStyle.colour.primaryColor},
                        //'2020-08-26': {dots: [massage, workout], disabled: true}
                    }}
                    markingType={'multi-dot'}
                />

                {/*<View
                    style= {styles.dropDownHideButtonView}>
                    <Button
                        style={{backgroundColor:GlobalStyle.colour.primaryColor,borderRadius:20,}}
                        title="Hide modal"
                        buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                        onPress={()=> callBack()}
                    />
                </View>*/}

            </TouchableOpacity>
        </Modal>
    )

}
export default ModelCalendar

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


