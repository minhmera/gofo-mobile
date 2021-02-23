
import React, {useEffect, useState} from 'react'

import {Text, FAB, List} from 'react-native-paper'
import {FlatList, ImageBackground, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header'
import GlobalStyle from "../../style/GlobalStyle";
import * as api from "../../services/products";
import EditingProductItem from "../../components/EditingProductItem";


function SellingByUser({navigation}) {
    //const {navigate} = props.navigation;

    let userId = navigation.getParam('userId');
    console.log('MERA SellingByUser  userId ==>  ', userId);

    const [loading, setLoading] = useState(false);


    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [sellingList, setSellingList] = useState([]);

    const [isListEnd, setIsListEnd] = useState(false);



    function fetchData(isRefresh) {

        if (isRefresh === true ) {
            console.log('MERA  =======================  fetchData ============== page:',page, 'isRefresh:',isRefresh)
            setLoading(true)
            api.getSellingByUser(userId,1).then((response) => {
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
                api.getSellingByUser(userId,page).then((response) => {
                    //setSellingList(response.data.result)
                    console.log('MERA LOAD MORE Lenght:  ',response.data,' =====:===== ')
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
                <View style={{marginTop: 0}}>
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



    useEffect(() => {
        fetchData()
    }, []);
    return (
        <View style={styles.container}>
            <Header titleText='Sản phẩm đang bán' navigation={navigation}/>

            <View style={{flex:1, marginTop:8}}>
                {RenderList(navigation,sellingList)}
            </View>



        </View>
    )
}


function RenderItem(navigation,item) {
    return (
        <EditingProductItem
            item = {item}
            onEdit = {(pressItem) => navigateToEdit(navigation,item)}
        />
    )
}

function navigateToEdit(navigation, item) {
    console.log("MERA navigateToDetail ==> productId: ",item)
    navigation.push('EditSellingPost',{item:item, type:'SELL'})
}

export default SellingByUser

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
