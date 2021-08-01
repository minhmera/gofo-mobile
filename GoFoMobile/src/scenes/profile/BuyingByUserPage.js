
import React, {useEffect, useState} from 'react'

import {Alert, FlatList, ImageBackground, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header'
import GlobalStyle from "../../style/GlobalStyle";
import * as api from "../../services/products";
import EditingProductItem from "../../components/EditingProductItem";
import AsyncStorage from "@react-native-community/async-storage";
import {USER_ID_KEY} from "../../config/Contants";


function BuyingByUser({navigation}) {
    //const {navigate} = props.navigation;

    let userId = navigation.getParam('userId');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [sellingList, setSellingList] = useState([]);
    const [isListEnd, setIsListEnd] = useState(false);



    function fetchData(isRefresh) {

        if (isRefresh === true ) {
            console.log('MERA  =======================  fetchData ============== page:',page, 'isRefresh:',isRefresh)
            api.getBuyingByUser(userId,1).then((response) => {
                setLoading(false);
                console.log('MERA getBuyingByUser Refresh ',response.data)
                setRefreshing(false)
                if (response.data.result.length > 0) {
                    setSellingList(response.data.result)
                    setLoading(false);

                }

            });
        } else {
            if (!loading && !isListEnd) {
                console.log('MERA ......................  LOAD MORE  ........................   page: ',page, 'isRefresh:',isRefresh, 'loading: ',loading,'  isListEnd:',isListEnd)

                api.getBuyingByUser(userId,page).then((response) => {
                    setLoading(false);
                    //console.log('MERA LOAD MORE Lenght:  ',response.data,' =====:===== ')
                    if (response.data.result.length > 0) {

                        setPage(page + 1);

                        // After the response increasing the page
                        if (page == 1) {
                            setSellingList(response.data.result)
                        } else {
                            setSellingList([...sellingList, ...response.data.result])
                        }


                        setRefreshing(false)
                    } else {
                        //setIsListEnd(true);
                        //setSellingList([])

                        setRefreshing(false)
                    }

                });
            }
        }



    }

    function fetchSelectedData(provinceId) {
        api.getBuyingByCategory(categoryItem.type,provinceId,1,).then((response) => {
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

    function RenderList(navigation,data) {
        //console.log('MERA RenderList data ==> ', data.length)
        if (data.length > 0) {
            return (
                <View style={{flex:1,marginTop: 0}}>
                    <FlatList
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


    function onDeletePress(item) {
        Alert.alert(
            'Xoá Sản Phẩm',
            'Bạn có chắc muốn xoá sản phầm này không',

            [
                {text: 'Không'},
                {text: 'Xoá',style:'destructive',
                    onPress: () => deleteBuyingProduct(item)}
            ],
            {cancelable: true},
        );
    }

    async function deleteBuyingProduct(item) {
        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        let objData = {userId:userId}
        console.log('MERA deleteSellingProduct body  ',objData,'item ==>',item )
        setLoading(true)
        try {
            let response = await api.deleteBuyingPost(objData,item._id);
            if (response) {
                setLoading(false)
                console.log('MERA ------------------------ deleteSellingProduct response ----------------   ', response);
                Alert.alert(
                    'Thành công',
                    'Xoá sản phẩm thành công',

                    [
                        {text: 'OK'},

                    ],
                    {cancelable: false},
                );
            }



        } catch (error) {
            setLoading(false)
            Alert.alert(
                'Lỗi !!!',
                'Xoá sản phẩm xảy ra lỗi, vui lòng thử lại',

                [
                    {text: 'OK'},
                ],
                {cancelable: false},
            );
            //setError(error.message);
        }
    }

    function RenderItem(navigation,item) {
        return (
            <EditingProductItem
                item = {item}
                onEdit = {() => navigateToEdit(navigation,item)}
                onDelete = {() => onDeletePress(item)}
            />
        )
    }

    useEffect(() => {
        {fetchData(), setLoading(true)}
    }, []);
    return (
        <View style={styles.container}>
            <Header titleText='Sản Phẩm Đang Mua' navigation={navigation}/>

            <View style={{flex:1, marginTop:8}}>
                {RenderList(navigation,sellingList)}
            </View>



        </View>
    )
}




function navigateToEdit(navigation, item) {
    console.log("MERA navigateToDetail ==> productId: ",item)
    navigation.push('EditSellingPost',{item:item, type:'BUY'})
}

export default BuyingByUser

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
