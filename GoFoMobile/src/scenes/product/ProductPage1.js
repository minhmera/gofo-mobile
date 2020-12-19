import React, {useState, useEffect, useReducer} from 'react';
import {View,TouchableOpacity,TouchableWithoutFeedback, ImageBackground, Text, FlatList, StyleSheet, Alert,RefreshControl} from 'react-native'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";
import * as api from "../../services/home";
import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'
import AnimatedLoader from '../../utils/custom-view/AnimatedLoader';
import GlobalStyle from '../../style/GlobalStyle'




//({ route, navigation })
function ProductPage1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    //Product Page1  {t('welcome')}
   // console.log("MERA  ProductPage1 param ==>  ",route,' -- ')

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //const [categories, setCategories] = useState({});

    const { globalState, dispatch } = useGlobalDataContext();

    async function fetchData() {
        setLoading(true);
        try {
            let response = await api.getCategoryList();
            //setCategories(response.result)
            dispatch(setCategories(response.result))

            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    function navigateToSellingPost(item) {
        //console.log('MERA navigateToSellingPost   ',navigation)
        navigation.push('SellingProduct',{categoryItem:item})

        //navigation.navigate('SellingProduct', { name: 'Jane' })
    }

    async function refreshData() {
        setRefreshing(true);
        try {
            let response = await api.getCategoryList();
            //setCategories(response.result)
            dispatch(setCategories(response.result))

            setRefreshing(false);

        } catch (error) {
            setError(error.message);
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function RenderCategoryList(data,refreshing,onRefresh) {
        if (data.length > 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={data}
                        renderItem={({item}) =>
                            RenderCategoryItem(item)
                        }

                        keyExtractor={(item, index) => item._id}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor = {GlobalStyle.colour.primaryColor}
                            />
                        }

                    />
                </View>
            )
        }
    }

    function RenderCategoryItem(item) {
        return (
            <View style={[styles.itemContainer]} >
                <ImageBackground source={{uri: item.photoUrl}} style={styles.bgImage}>
                    <View style={styles.itemContent} onPress = {() => console.log(' pressed on11  ',item.title_vi)}>
                        <Text style={styles.itemTitle} >
                            {item.title_vi}
                        </Text>


                        <View style={styles.buttonContainerView}>
                            <TouchableOpacity
                                style={[styles.sellButtonView,{marginTop:24}]}
                                onPress={()=> navigateToSellingPost(item)}
                            >
                                <Text style={styles.buttonText}>
                                    Xem tin bán
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.sellButtonView}>
                                <Text style={[styles.buttonText]} >
                                    Xem tin mua
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ImageBackground>

            </View>
        )
    }

    return (

        <View style={{flex: 1}}>
            <Header titleText='Danh mục sản phẩm'/>
            {RenderCategoryList(globalState.categories,refreshing, ()=> refreshData() )}

            <AnimatedLoader
                visible={loading}
                //overlayColor="rgba(215,215,215,0.55)"
                overlayColor="rgba(0,0,0,0.55)"
                animationType = 'slide'
                animationStyle={styles.lottie}
                animationStyle = {{height: 120, width: 120}}
                loop = {true}
                speed={3}
            />
        </View>
    )
}



export default ProductPage1


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContent: {
        flex: 1,
        height:150,
        backgroundColor: 'rgba(0,0,0,0.5)',
        //justifyContent:'flex-end',
    },
    itemContainer: {
        height:186,
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    itemTitle: {
        flex:1,
        color: 'white',
        fontSize:18,
        paddingLeft:8,
        paddingTop:8,
        fontWeight:'bold',


    },
    buttonContainerView: {
        flex: 1,
        alignItems:'flex-end',

    },

    sellButtonView: {
        width:120,
        height:32,
        marginRight:4,
        borderRadius:8,
        justifyContent: 'center',
        borderColor:GlobalStyle.colour.primaryColor,
        //borderWidth:0.5,


    },


    buttonText: {
        color: 'white',

        fontSize:14,
        textAlign:'right',
        fontWeight:'700',
    }


})
