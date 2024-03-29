import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, FlatList, RefreshControl, ImageBackground} from 'react-native'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GlobalStyle from '../../style/GlobalStyle';
import AppStyle from '../../style/style';
import {backgroundColor} from "react-native-calendars/src/style";
import * as api from "../../services/products";
import {setCategories} from "../../contexts/globalDataContext";

console.disableYellowBox = true;


function PostedPage1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    const [customStyleIndex, setCustomStyleIndex] = useState(0);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingBuying, setLoadingBuying] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [refreshingBuying, setRefreshingBuying] = useState(false);
    const [sellingList, setSellingList] = useState([]);
    const [buyingList, setBuyingList] = useState([]);


    //const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [pageBuying, setPageBuying] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);
    const [isListEndBuying, setIsListEndBuying] = useState(false);


    function fetchData(isRefresh) {
        console.log('MERA fetchData ==>  page: ', page, 'isRefresh: ', isRefresh)
        if (isRefresh == true ) {
            setLoading(true)
            api.getSellingProduct2(1).then((response) => {
                console.log('MERA length 11: ',response.data.result.length,' : ', sellingList.length)
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
        }

        if (!loading && !isListEnd) {
            //console.log('MERA fetchData ********************   ')
            setLoading(true)
            api.getSellingProduct2(page).then((response) => {
                //setSellingList(response.data.result)
                if (response.data.result.length > 0) {

                    setPage(page + 1);
                    console.log('MERA length 22: ',response.data.result.length,' : ', sellingList.length)
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
                    setLoading(false);
                    setRefreshing(false)
                }

            });
        }

    }

    function fetchDataBuying(isRefresh) {
        console.log('MERA fetchData ==>  page: ', page, 'isRefresh: ', isRefresh)
        if (isListEndBuying == true ) {
            setLoading(true)
            api.getBuyingProduct(1).then((response) => {
                console.log('MERA length 11: ',response.data.result.length,' : ', sellingList.length)
                if (response.data.result.length > 0) {
                    setBuyingList(response.data.result)
                    setLoadingBuying(false);
                    setRefreshingBuying(false)
                } else {
                    //setIsListEnd(true);
                    setLoadingBuying(false);
                    setRefreshingBuying(false)
                }

            });
        }

        if (!loadingBuying && !isListEndBuying) {
            //console.log('MERA fetchData ********************   ')
            setLoadingBuying(true)
            api.getBuyingProduct(pageBuying).then((response) => {
                //setSellingList(response.data.result)
                if (response.data.result.length > 0) {

                    setPageBuying(pageBuying + 1);
                    console.log('MERA length 22: ',response.data.result.length,' : ', sellingList.length)
                    // After the response increasing the page
                    if (pageBuying == 1) {
                        setBuyingList(response.data.result)
                    } else {
                        setBuyingList([...buyingList, ...response.data.result])
                    }

                    setLoadingBuying(false);
                    setRefreshingBuying(false)
                } else {
                    //setIsListEnd(true);
                    setLoadingBuying(false);
                    setRefreshingBuying(false)
                }

            });
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

    function refreshDataBuying() {

        setLoadingBuying(false);
        setRefreshingBuying(true)
        setIsListEndBuying(false)
        setPageBuying(1);
        console.log('MERA  refreshData page :',page, '  ' ,refreshing)
        fetchDataBuying(true)

    }


    function RenderList(data) {
        //console.log('MERA RenderList data ==> ', data.length)
        if (data.length > 0) {
            return (
                <View style={{marginTop: 0}}>
                    <FlatList
                        data={data}
                        renderItem={({item}) =>
                            RenderItem(item)
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

    function RenderListBuying(data) {
        //console.log('MERA RenderList data ==> ', data.length)
        if (data.length > 0) {
            return (
                <View style={{marginTop: 0}}>
                    <FlatList
                        data={data}
                        renderItem={({item}) =>
                            RenderItem(item)
                        }
                        keyExtractor={(item, index) => item._id}
                        onEndReached={() => fetchDataBuying()}
                        onEndReachedThreshold={0.01}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshingBuying}
                                onRefresh={() => refreshDataBuying()}
                                tintColor={GlobalStyle.colour.primaryColor}
                            />
                        }

                    />
                </View>
            )
        }
    }


    const handleCustomIndexSelect = (index) => {
        setCustomStyleIndex(index);
    };


    function renderBuyingApp() {
        return (
            <View style={{flex: 1}}>

                {RenderListBuying(buyingList)}
            </View>
        )
    }

    function renderSellingApp() {
        return (
            <View style={{flex: 1}}>

                {RenderList(sellingList)}
            </View>
        )
    }


    useEffect(() => {
        fetchData(), fetchDataBuying()
    }, []);

    return (

        <View style={styles.container}>

            <Header titleText='Sản phẩm'/>
            <View style={styles.tabContainer}>

                {/* Simple Segmented with Custom Styling*/}
                <SegmentedControlTab
                    values={['Bán', 'Mua']}
                    selectedIndex={customStyleIndex}
                    onTabPress={handleCustomIndexSelect}
                    borderRadius={0}
                    tabsContainerStyle={{height: 40, backgroundColor: '#F2F2F2'}}
                    tabStyle={{
                        backgroundColor: GlobalStyle.colour.primaryColor,
                        borderWidth: 0,
                        borderColor: 'transparent',
                    }}
                    activeTabStyle={{
                        backgroundColor: GlobalStyle.colour.primaryColor,
                        borderBottomColor: 'white',
                        borderBottomWidth: 2
                    }}
                    tabTextStyle={{color: 'white', fontWeight: 'bold'}}
                    activeTabTextStyle={{color: 'white'}}
                />
                {customStyleIndex === 0 && (
                    renderSellingApp()

                )}
                {customStyleIndex === 1 && (
                    renderBuyingApp()
                )}
            </View>
        </View>
    )
}

export default PostedPage1

function RenderItem(item) {
    return (
        <View style={[styles.itemContainer]}>
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
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#F4F7FB',
    },
    headerText: {
        padding: 8,
        fontSize: 14,
        color: '#444444',
        textAlign: 'center',
    },
    tabContent: {
        color: '#444444',
        fontSize: 24,
        margin: 24,
    },
    seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24,
    },
    tabStyle: {
        //borderColor: '#D52C43',

    },
    activeTabStyle: {
        //backgroundColor: '#D52C43',
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


//PostedPage1    {t('welcome')}