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
    const [refreshing, setRefreshing] = useState(false);
    const [sellingList, setSellingList] = useState([]);


    //const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);

    /*async function fetchData() {

        //console.log('MERA ==>  loading: ',loading, '||   isListEnd: ',loading, '||  offset: ',offset)
        if (!loading && !isListEnd && offset < 30) {
            setLoading(true)
            try {
                let response = await api.getSellingProduct(offset);
                console.log('MERA getSellingProduct ==> ',response.result.length)
                setSellingList(response.result)
                if (response.result.length > 0) {
                    setOffset(offset + 1);
                    // After the response increasing the offset
                    setSellingList([...setSellingList, ...response.result]);
                    setLoading(false);
                } else {
                    setIsListEnd(true);
                    setLoading(false);
                }


            } catch (error) {
                setError(error.message);
                setLoading(false)
            }
        }

    }*/

     function fetchData() {
        //console.log('MERA ==>  loading: ',loading, '||   isListEnd: ',loading, '||  offset: ',offset)
        if (!loading && !isListEnd) {
            setLoading(true)
            api.getSellingProduct2(offset).then((response) => {
                //setSellingList(response.data.result)
                if (response.data.result.length > 0) {
                    console.log('MERA getSellingProduct ==> ',response.data.result.length,'setSellingList ==> ', sellingList.length)
                    setOffset(offset + 1);
                    // After the response increasing the offset
                    setSellingList([...sellingList, ...response.data.result]);
                    setLoading(false);
                } else {
                    setIsListEnd(true);
                    setLoading(false);
                }

            });
        }

    }

    function RenderList(data,refreshing,onRefresh) {
        //console.log('MERA RenderList data ==> ', data.length)
        if (data.length > 0) {
            return (
                <View style={{marginTop:8}} >
                    <FlatList
                        data={data}
                        renderItem={({item}) =>
                            RenderItem(item)
                        }

                        keyExtractor={(item, index) => item._id}
                        onEndReached={fetchData()}
                        onEndReachedThreshold={0.5}
                        /*refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor = {GlobalStyle.colour.primaryColor}
                            />
                        }*/

                    />
                </View>
            )
        }
    }




    async function refreshData() {
        setRefreshing(true);
        try {
            let response = await api.getSellingProduct();
            //console.log('MERA getSellingProduct ==> ',response.result.length)
            setSellingList(response.result)
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    const handleCustomIndexSelect = (index) => {
        setCustomStyleIndex(index);
    };


    function renderBuyingApp() {
        return (
            <View>
                <Text>
                    Mua
                </Text>

            </View>
        )
    }

    function renderSellingApp() {
        return (
            <View style={{flex:1}}>

                { RenderList(sellingList,refreshing, ()=> refreshData())   }
            </View>
        )
    }


    useEffect(() => {
        fetchData();
    }, []);

    return (

        <View style={styles.container}>

            <Header titleText='Sản phẩm' />
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
                        backgroundColor:GlobalStyle.colour.primaryColor,
                        borderBottomColor:'white',
                        borderBottomWidth:2
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
        <View style={[styles.itemContainer]} >
            <View style={styles.itemWrapper}>
                <View style={styles.imageWrapperView}>

                </View>
                <View style={styles.contentInfoView}>
                    <Text style={styles.itemTitle} >
                        {item.productName}
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
        height:150,
    },

    itemWrapper: {
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        marginTop: 4,
        marginBottom: 4,
        marginLeft:8,
        marginRight:8,
        borderWidth:1,
        borderRadius:4,
        //borderColor:'#E8E8E8'
        borderColor:'#E8E8E8',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,

    },
    imageWrapperView: {
        flex:1,
        backgroundColor:'gray'
    },
    contentInfoView: {
        flex:2
    }


});


//PostedPage1    {t('welcome')}