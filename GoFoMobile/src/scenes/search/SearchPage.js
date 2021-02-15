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
import AsyncStorage from '@react-native-community/async-storage'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";

import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'
import GlobalStyle from "../../style/GlobalStyle";
import {SEARCH_HISTORY_KEY, TOKEN_KEY} from "../../config/Contants";
function SearchPage({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    const { globalState, dispatch } = useGlobalDataContext();
    //console.log('MERA  globalState ==>  ',globalState)
    const [searchText, setSearchText] = useState('');

    const [historySearch, setHistorySearch] = useState([]);

    function onEnterSearch(searchText) {


        let storageArray = [...historySearch]
        console.log('MERA Enter to search ',searchText, ' historySearch ==>  ',historySearch,' storageArray ==> ',storageArray)
        if (storageArray.length === 0) {
            storageArray.push(searchText);
        } else {
            if(storageArray.indexOf(searchText) === -1) {
                storageArray.push(searchText);

            }
        }
        setHistorySearch(storageArray)
        console.log('MERA new history search ==>  ',storageArray);
        AsyncStorage.setItem(SEARCH_HISTORY_KEY,JSON.stringify(storageArray))
            .then(json => console.log('MERA new history search 22  ==>  ',historySearch))
    }

    function getHistorySearchList() {
        AsyncStorage.getItem(SEARCH_HISTORY_KEY)
            .then(req => JSON.parse(req))
            .then(json => {
                if (json === null) {
                    setHistorySearch([])
                } else {
                    setHistorySearch(json)
                }
                console.log('MERA getHistorySearchList 2 => ',json)
            })
            .catch(error => console.log('error!'));

    }

    function removeSearchHistory() {
        AsyncStorage.removeItem(SEARCH_HISTORY_KEY)
        setHistorySearch([])
    }

    function navigateToResult(text) {
        navigation.push('SearchResultPage',{searchText:text})
    }


    useEffect(() => {
        {
            getHistorySearchList()
        }
    }, []);

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
                    onSubmitEditing={(text) => onEnterSearch(searchText)}

                />
            </View>
            <View style={styles.body}>
                <View style={styles.historyTitleView}>
                    <View style={{flex:1}}>
                        <Text style={styles.historyTitleText}>Lịch sử tìm kiếm</Text>
                    </View>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{flex:1}}
                        onPress={()=> removeSearchHistory()}
                    >
                        <Icon
                            style={{textAlign:'right'}}
                            name={'trash'}
                            size={28}
                        />
                    </TouchableOpacity>

                </View>

                <FlatList
                    data={historySearch}
                    renderItem={({item}) =>
                        renderHistoryItem(item)
                    }
                    extraData={historySearch}
                    keyExtractor={(item, index) => item}
                />

            </View>

        </TouchableOpacity>
    );

    function renderHistoryItem(item) {
        console.log('MERA historySearch **==> ',historySearch)
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.historyItem}
                onPress={()=> navigateToResult(item)}

            >
                <Text>{item}</Text>
            </TouchableOpacity>
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
