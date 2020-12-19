
import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {FlatList, ImageBackground, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header'
import AsyncStorage from '@react-native-community/async-storage';
import {TOKEN_KEY, USER_NAME_KEY} from "../../config/Contants";
import GlobalStyle from "../../style/GlobalStyle";
import Icon from "react-native-vector-icons/AntDesign";
import * as api from "../../services/products";
import ModelList from "../../components/ModelList";


function SellingProduct({navigation}) {
    //const {navigate} = props.navigation;

    let categoryItem = navigation.getParam('categoryItem');
    //console.log('MERA SellingProduct ==>  ', categoryItem);


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

    async function fetchDataLocation() {
        //setLoading(true);


        try {
            let response = await api.getLocation();
            //console.log('MERA getLocation22  :  ==>  ',response)
            let allCity = { name: 'Tất cả', id: 0}
            let cities = [allCity]
            if (response.result) {
                let locations = response.result
                setLocations(locations)
                locations.map((item,index)=> {
                    let cityObj = {
                        name: item.name,
                        id: item.id,
                    }
                    cities.push(cityObj)
                })

                console.log("MERA cities  ==>  ",cities)

                setCities(cities)
            }
            //setCities(response.result)
            //console.log(' getLocation1 =====>  ',cities)
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    function fetchData(isRefresh) {

        if (isRefresh === true ) {
            console.log('MERA  =======================  fetchData ============== page:',page, 'isRefresh:',isRefresh)
            setLoading(true)
            api.getSellingByCategory(categoryItem.type,provinceId,1,).then((response) => {
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
                api.getSellingByCategory(categoryItem.type,provinceId,page,).then((response) => {
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

    function fetchSelectedData(provinceId) {
        api.getSellingByCategory(categoryItem.type,provinceId,1,).then((response) => {
            console.log('MERA fetchSelectedData : ',response.data.result.length,' ---:---', sellingList.length)
            if (response.data.result.length > 0) {
                setSellingList(response.data.result)
                setLoading(false);
                setRefreshing(false)
            } else {
                setSellingList([])
                setLoading(false);
                setRefreshing(false)
            }

        });
    }

    function refreshData() {
        setLoading(false);
        setRefreshing(true)
        setIsListEnd(false)
        setPage(1);
        console.log('MERA  refreshData page :',page, '  ' ,refreshing)
        fetchData(true)

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
    function dropdownButton(title,onPress,isError) {
        let errorStyle = null
        return  (
            <TouchableOpacity
                style={[styles.dropdownButton,errorStyle]}
                activeOpacity={1}
                onPress={()=> onPress()}
            >
                <View style={{flex:4}}>
                    <Text style={[styles.dropdownButtonTitle,errorStyle]}>
                        {title}
                    </Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end', marginRight:4}}>
                    <Icon
                        name='caretdown'
                        size={14}
                        color={GlobalStyle.colour.primaryColor}
                    />
                </View>

            </TouchableOpacity>
        )
    }

    function cityDropDownCallBack(cityObj) {
        console.log('MERA selected city ',cityObj)

        setLoading(false);
        setRefreshing(true)
        setIsListEnd(false)
        setPage(1);

        setProvinceId(cityObj.id)
        setSelectedCity(cityObj)
        setShowCityDropdown(false)

        fetchSelectedData(cityObj.id)


    }



    useEffect(() => {
        fetchData(),fetchDataLocation();
    }, []);
    return (
        <View style={styles.container}>
            <Header titleText='Selling List' navigation={navigation}/>
            {dropdownButton(selectedCity === null ?  "Tất cả tỉnh thành" : selectedCity.name,()=> setShowCityDropdown(true))}
            <ModelList
                isVisible = {isShowCityDropdown}
                title = {'Choose Your City'}
                items = {cities}
                customField = {'name'}
                customItemId = {'id'}
                callBack = {(item)=> cityDropDownCallBack(item)}
            />
            <View style={{flex:1, marginTop:8}}>
                {RenderList(sellingList)}
            </View>



        </View>
    )
}

export default SellingProduct
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
        backgroundColor: '#F5F5F5',
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
