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
    Keyboard, RefreshControl, ImageBackground
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-community/async-storage'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";

import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'
import GlobalStyle from "../../style/GlobalStyle";
import {SEARCH_HISTORY_KEY, TOKEN_KEY} from "../../config/Contants";
import * as api from "../../services/products";



function SearchResultPage({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    let searchText = navigation.getParam('searchText');
    console.log('MERA searchText ==>  ',searchText)

    const [locations, setLocations] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    let [isShowCityDropdown, setShowCityDropdown] = useState(false);
    const [cities, setCities] = useState({});

    const [page, setPage] = useState(1);
    const [loadingBuying, setLoadingBuying] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [refreshingBuying, setRefreshingBuying] = useState(false);
    const [sellingList, setSellingList] = useState([]);
    const [buyingList, setBuyingList] = useState([]);

    const  [provinceId, setProvinceId] = useState(0);

    const [isListEnd, setIsListEnd] = useState(false);

    function fetchData(isRefresh) {

        if (isRefresh === true ) {
            console.log('MERA  =======================  fetchData ============== page:',page, 'isRefresh:',isRefresh)
            setLoading(true)
            api.searchSellingProduct(searchText,1).then((response) => {
                //console.log('MERA length 11: ',response.data.result.length,' : ', sellingList.length)
                if (response.data.result.length > 0) {
                    setSellingList(response.data.result)
                    setLoading(false);
                    setRefreshing(false)
                } else {
                    //setIsListEnd(true);
                    setLoading(false);
                    setRefreshing(false)
                }

            });
        } else {
            if (!loading && !isListEnd) {
                console.log('MERA ......................  LOAD MORE  ........................   page: ',page, 'isRefresh:',isRefresh, 'loading: ',loading,'  isListEnd:',isListEnd)
                setLoading(true)
                api.searchSellingProduct(searchText,page).then((response) => {
                    //setSellingList(response.data.result)
                    console.log('MERA LOAD MORE Lenght:  ',response.data.result.length,' =====:===== ', sellingList.length)
                    if (response.data.result.length > 0) {

                        setPage(page + 1);

                        // After the response increasing the page
                        if (page == 1) {
                            setSellingList(response.data.result)
                        } else {
                            setSellingList([...sellingList, ...response.data.result])
                        }

                        setLoading(false);
                        setRefreshing(false)
                    } else {
                        //setIsListEnd(true);
                        //setSellingList([])
                        setLoading(false);
                        setRefreshing(false)
                    }

                });
            }
        }



    }

    function refreshData() {
        setLoading(false);
        setRefreshing(true)
        setIsListEnd(false)
        setPage(1);
        console.log('MERA  refreshData page :',page, '  ' ,refreshing)
        fetchData(true)

    }

    function RenderList(navigation,data) {
        //console.log('MERA RenderList data ==> ', data.length)
        if (data.length > 0) {
            return (
                <View style={{flex:1,marginTop: 0}}>
                    <FlatList
                        style={{flex:1}}
                        data={data}
                        renderItem={({item}) =>
                            RenderItem(navigation,item)
                        }
                        keyExtractor={(item, index) => item._id}
                        onEndReached={() => fetchData()}
                        onEndReachedThreshold={0.01}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => refreshData()}
                                tintColor={GlobalStyle.colour.primaryColor}
                            />
                        }

                    />
                </View>
            )
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <View
            style={styles.container}
        >
            <Header titleText='Tìm kiếm' navigation={navigation} />
            <Text style={styles.searchResultTitle}>Kết quả tìm kiếm cho '{searchText}'</Text>
            <View style={{flex:1, marginTop:8}}>
                {RenderList(navigation,sellingList)}
            </View>
        </View>
    );


}

export default SearchResultPage

function RenderItem(navigation,item) {
    return (
        <TouchableOpacity
            style={[styles.itemContainer]}
            onPress={()=> navigateToDetail(navigation, item._id)}

        >
            <View style={styles.itemWrapper}>
                {
                    item.photoUrls != null ? <ImageBackground imageStyle={{ borderRadius: 4 }} source={{uri: item.photoUrls[0]}} style={styles.imageWrapperView}></ImageBackground> : null
                }

                <View style={styles.contentInfoView}>
                    <Text style={styles.itemTitle}>
                        {item.productName}
                    </Text>
                    <Text style={styles.normalText}>
                        Người bán: {item.fullName}
                    </Text>
                    <Text style={styles.normalText}>
                        Liên hệ: {item.sellerPhone}
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchResultTitle: {
        fontSize:16,
        fontWeight:'500',
        marginTop:8,
        marginLeft:16
    },

    content: {
        flex: 1,
        //justifyContent: 'center',
        padding: 8,
    },

    dropdownButton: {
        height:42,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'white',

        marginTop:8,
        marginLeft: 10,
        marginRight: 10,
        borderRadius:4,
        borderColor:GlobalStyle.colour.grayColor,
        borderWidth:1
    },

    dropdownItem: {
        justifyContent:'center',
        height:40,
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,
    },
    dropdownList: {
        flex:1,
        height:150,
        backgroundColor:'red'
    },

    dropdownButtonTitle: {
        fontSize: 16,
        textAlign:'center',
        fontWeight: '400',
        marginLeft: 56,
        color: GlobalStyle.colour.primaryColor

    },

    itemContainer: {
        height: 150,
    },

    itemWrapper: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
        borderWidth: 1,
        borderRadius: 4,
        //borderColor:'#E8E8E8'
        borderColor: '#E8E8E8',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,

    },
    imageWrapperView: {
        flex: 1,
        margin: 8,
        borderRadius: 4,
        backgroundColor: 'gray'
    },
    contentInfoView: {
        flex: 2
    },
    itemTitle: {
        color: GlobalStyle.colour.primaryColor,
        fontSize:15,
        fontWeight:'500',
        marginTop:6
    },
    normalText: {
        color: 'black',
        fontSize:13,
        marginTop:4
    }
});
