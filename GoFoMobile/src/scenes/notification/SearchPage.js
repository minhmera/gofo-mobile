/* eslint-disable */

import React, {useState, useEffect} from 'react';
// import all the components we are going to use
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Keyboard, RefreshControl
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';

import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";

import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'
import GlobalStyle from "../../style/GlobalStyle";

function SearchPage({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    const { globalState, dispatch } = useGlobalDataContext();
    console.log('MERA  globalState ==>  ',globalState)
    const [searchText, setSearchText] = useState('');

    const [historySearch, setHistorySearch] = useState(['Nhãn','Vãi','Sầu riêng']);




    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.header}>
                <Text style={{marginTop:68,fontSize:18, fontWeight:'bold', color: GlobalStyle.colour.primaryColor}}>Tìm kiếm</Text>
            </View>

            <View style={styles.searchViewWrapper}>
                <SearchBar
                    placeholder="Bạn muốn mua gì ?"
                    onChangeText={(text) => setSearchText(text)}
                    value={searchText}
                    containerStyle={styles.searchContainer}
                    placeholderTextColor={'#g5g5g5'}
                    searchIcon={false}
                    inputContainerStyle={{backgroundColor: 'transparent'}}
                    inputStyle={{backgroundColor: 'transparent'}}
                    returnKeyType='search'
                    onSubmitEditing={(text) => console.log(' enter to search =>', searchText)}

                />
            </View>
            <View style={styles.body}>
                <View style={styles.historyTitleView}>
                    <View style={{flex:1}}>
                        <Text style={styles.historyTitleText}>Lịch sử tìm kiếm</Text>
                    </View>
                    <View style={{flex:1}}>
                        <Icon
                            style={{textAlign:'right'}}
                            name={'trash'}
                            size={28}
                        />
                    </View>

                </View>

                <FlatList
                    data={historySearch}
                    renderItem={({item}) =>
                        renderHistoryItem(item)
                    }
                    keyExtractor={(item, index) => item}
                />

            </View>





        </TouchableOpacity>
    );

    function renderHistoryItem(item) {
        return (
            <View style={styles.historyItem}>
                <Text>{item}</Text>
            </View>
        )

    }
}

export default SearchPage


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    header: {
        height:96,
        width:'100%',
        backgroundColor:'white',
        //justifyContent:'center',
        alignItems:'center'
    },
    searchViewWrapper: {
        height:38,
        borderRadius:6,
        marginTop:20,
        marginLeft:16,
        marginRight:16,
        backgroundColor:'white',
        borderColor:'#D2CECE',
        borderWidth: 1
    },
    searchContainer: {
        marginTop:-10,
        marginLeft:-8,
        marginRight:1,
        height: 40,
        backgroundColor: 'transparent',

        borderWidth: 0,
        shadowColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'
    },
    body: {
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16
    },
    historyTitleView: {
        height:32,
        flexDirection:'row'
    },
    historyTitleText: {
        fontSize:16,
        fontWeight:'500',
        paddingTop:6
    },

    historyItem: {
        height:32,
        justifyContent:'center',
        //borderStyle:'dashed',
        borderBottomWidth:0.5,
        borderBottomColor: '#DEDDDD'

    }
});
