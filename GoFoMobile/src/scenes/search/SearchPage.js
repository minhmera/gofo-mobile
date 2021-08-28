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
import {SEARCH_HISTORY_PRODUCT_KEY,SEARCH_HISTORY_SELLER_KEY, TOKEN_KEY} from "../../config/Contants";
import SegmentedControlTab from "react-native-segmented-control-tab";
function SearchPage({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    const { globalState, dispatch } = useGlobalDataContext();
    //console.log('MERA  globalState ==>  ',globalState)
    const [searchHint, setSearchHint] = useState('Tìm sản phẩm');
    const [searchText, setSearchText] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [historySearchProduct, setHistorySearchProduct] = useState([]);



    function onEnterSearch(searchText) {
        if (selectedIndex === 0) {
            let storageArray = [...historySearchProduct]
            console.log('MERA Enter to search ',searchText, ' historySearchProduct ==>  ',historySearchProduct,' storageArray ==> ',storageArray)
            if (storageArray.length === 0) {
                storageArray.push(searchText);
            } else {
                if(storageArray.indexOf(searchText) === -1) {
                    storageArray.push(searchText);
                }
            }
            setHistorySearchProduct(storageArray)
            console.log('MERA new history search ==>  ',storageArray);
            AsyncStorage.setItem(SEARCH_HISTORY_PRODUCT_KEY,JSON.stringify(storageArray))
                .then(json => console.log('MERA new history search 11  ==>  ',historySearchProduct))
        } else {
            let storageArray = [...historySearchProduct]
            console.log('MERA Enter to search ',searchText, ' historySearchProduct ==>  ',historySearchProduct,' storageArray ==> ',storageArray)
            if (storageArray.length === 0) {
                storageArray.push(searchText);
            } else {
                if(storageArray.indexOf(searchText) === -1) {
                    storageArray.push(searchText);
                }
            }
            setHistorySearchProduct(storageArray)
            console.log('MERA new history search ==>  ',storageArray);
            AsyncStorage.setItem(SEARCH_HISTORY_SELLER_KEY,JSON.stringify(storageArray))
                .then(json => console.log('MERA new history search 22  ==>  ',historySearchProduct))
        }

        navigateToResult(searchText)
    }

    function getHistorySearchProductList(index) {
        console.log('MERA gethistorySearchProductList 00 => ',selectedIndex)
        if (index === 0) {
            AsyncStorage.getItem(SEARCH_HISTORY_PRODUCT_KEY)
                .then(req => JSON.parse(req))
                .then(json => {
                    if (json === null) {
                        setHistorySearchProduct([])
                    } else {
                        setHistorySearchProduct(json)
                    }
                    console.log('MERA gethistorySearchProductList 11 => ',json)
                })
                .catch(error => console.log('error!'));
        } else {
            AsyncStorage.getItem(SEARCH_HISTORY_SELLER_KEY)
                .then(req => JSON.parse(req))
                .then(json => {
                    if (json === null) {
                        setHistorySearchProduct([])
                    } else {
                        setHistorySearchProduct(json)
                    }
                    console.log('MERA gethistorySearchProductList 22 => ',json)
                })
                .catch(error => console.log('error!'));
        }


    }

    function removeSearchHistory() {
        console.log('MERA removeSearchHistory  => ',selectedIndex)

        if (selectedIndex === 0) {
            AsyncStorage.removeItem(SEARCH_HISTORY_PRODUCT_KEY)
            setHistorySearchProduct([])
        } else {
            AsyncStorage.removeItem(SEARCH_HISTORY_SELLER_KEY)
            setHistorySearchProduct([])
        }
    }

    function navigateToResult(text) {
        let searchType = ''
        if (selectedIndex === 0) {
            searchType = 'PRODUCT'
        }else {
            searchType = 'SELLER'
        }
        setSearchText('')
        navigation.push('SearchResultPage',{searchText:text,searchType:searchType})
    }


    useEffect(() => {
        {
            getHistorySearchProductList(selectedIndex)
        }
    }, []);

    function handleIndexChange (index) {
        console.log('handleIndexChange    ',index)
        if (index === 0) {
            setSearchHint('Tìm sản phẩm')
        } else {
            setSearchHint('Tìm người bán')
        }
        setSearchText('')
        setSelectedIndex(index)
        getHistorySearchProductList(index)
    }



    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.topView}>
            <View style={styles.header}>
                <Text style={{marginTop:48,fontSize:18, fontWeight:'bold', color: 'white'}}>Tìm kiếm</Text>
            </View>

            <View style={styles.searchViewWrapper}>
                <SearchBar
                    placeholder={searchHint}
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

            <View style={styles.segmentContainer}>
                <SegmentedControlTab
                    values={["Sản phẩm", "Người bán"]}
                    selectedIndex={selectedIndex}
                    borderRadius = {0}
                    onTabPress={(index) => handleIndexChange(index)}
                    tabsContainerStyle={
                        {height: 40, backgroundColor: GlobalStyle.colour.primaryColor}
                    }
                    tabStyle={{
                        backgroundColor: GlobalStyle.colour.primaryColor,
                        borderWidth: 0,
                        borderColor: 'transparent',
                    }}
                    activeTabStyle={{
                        backgroundColor: GlobalStyle.colour.primaryColor,
                        borderBottomColor: 'white',
                        borderBottomWidth: 6,

                    }}
                    tabTextStyle={{color: GlobalStyle.colour.grayColor}}
                    activeTabTextStyle={{color:'white',fontWeight: 'bold'}}
                />
            </View>
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
                    data={historySearchProduct}
                    renderItem={({item}) =>
                        renderHistoryItem(item)
                    }
                    extraData={historySearchProduct}
                    keyExtractor={(item, index) => item}
                />

            </View>

        </TouchableOpacity>
    );

    function renderHistoryItem(item) {
        console.log('MERA historySearchProduct **==> ',historySearchProduct)
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.historyItem}
                onPress={()=> navigateToResult(item)}

            >
                <Text style={{fontSize:16}}>{item}</Text>
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
    topView: {
        backgroundColor:GlobalStyle.colour.primaryColor,

    },
    segmentContainer: {
        marginTop:12,
        //paddingLeft:16,
        //paddingRight:16
    },

    header: {
        height:66,
        width:'100%',
        //backgroundColor:'white',
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
        // borderTopWidth: 1,
        // borderTopColor:GlobalStyle.colour.grayColor2,
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
        height:44,
        justifyContent:'center',
        //borderStyle:'dashed',
        borderBottomWidth:0.5,
        borderBottomColor: '#DEDDDD'

    }
});
