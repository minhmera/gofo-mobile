import React, {useState, useEffect, useReducer} from 'react';
import {View,TouchableOpacity, ImageBackground, Text, FlatList, StyleSheet, Alert,RefreshControl,
    Platform, Linking
} from 'react-native'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";
import * as api from "../../services/home";
import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'
import AnimatedLoader from '../../utils/custom-view/AnimatedLoader';
import GlobalStyle from '../../style/GlobalStyle'
import LoadingPage from "../../components/LoadingPage";
import DeviceInfo from 'react-native-device-info';
import {func} from "prop-types";



//({ route, navigation })
function CategoryPage({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    //Product Page1  {t('welcome')}
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
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

    async function getAppInfo() {

        setLoading(true);
        try {
            let response = await api.getAppGeneralInfo();

            if (response) {
                let latestVersion = 0.0

                let appStoreUrl = ''
                if (Platform.OS === 'ios') {
                    appStoreUrl = response.appInfo.appStoreUrl
                    latestVersion = response.appInfo.latestVersionIOS
                }else {
                    appStoreUrl = response.appInfo.chPlayUrl
                    latestVersion = response.appInfo.latestVersionAndroid
                }

                let version = DeviceInfo.getVersion();
                if (version <  latestVersion) {
                    console.log('checkVersion()  OLD  ======>    ',version)
                    Alert.alert(
                        '',
                        'Phiên bản hiện tại đã cũ, vui lòng nâng cấp phiên bản mới để được trãi nghiệm tốt hơn  ',

                        [

                            {text: 'Nâng cấp', onPress: () => openAppStore(appStoreUrl)}
                        ],
                        {cancelable: false},
                    );
                } else {
                    console.log('getAppGeneralInfo  response message ======>    ',response.appInfo)
                    if (response.appInfo.message !== '') {
                        Alert.alert(
                            '',
                            response.message,

                            [

                                {text: 'OK'}
                            ],
                            {cancelable: false},
                        );
                    }
                }
            }


            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    function openAppStore(url) {
        Linking.canOpenURL(url).then(supported => {
            supported && Linking.openURL(url);
        }, (err) => console.log(err));
    }

    function navigateToSellingPost(item) {
        navigation.push('SellingProduct',{categoryItem:item})
        //navigation.navigate('SellingProduct', { name: 'Jane' })
    }

    function navigateToBuyingPost(item) {
        navigation.push('BuyingProduct',{categoryItem:item})
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

    function checkVersion() {
        let latestVersion = 2.0

        let appStoreUrl = ''
        if (Platform.OS === 'ios') {
            appStoreUrl = 'https://apps.apple.com/us/app/facebook/id284882215'
        }else {
            appStoreUrl = 'https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en&gl=US'
        }

        let version = DeviceInfo.getVersion();
        if (version <  latestVersion) {
            console.log('checkVersion()  OLD  ======>    ',version)
            Alert.alert(
                '',
                'Phiên bản hiện tại đã cũ, vui lòng nâng cấp phiên bản mới để được trãi nghiệm tốt hơn  ',

                [
                    {text: 'Nâng cấp'},
                ],
                {cancelable: false},
            );
        }

    }

    useEffect(() => {
        fetchData(),getAppInfo();
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
                <ImageBackground
                    source={{uri: item.photoUrl}}
                    style={styles.bgImage}
                    defaultSource={require('../../resources/backGround/place_holder_category.jpeg')}
                >
                    <View style={styles.itemContent} onPress = {() => console.log(' pressed on11  ',item.title_vi)}>
                        <Text style={styles.itemTitle} >
                            {item.title_vi}
                        </Text>

                        <View style={styles.buttonContainerView}>
                            <TouchableOpacity
                                style={[styles.sellButtonView,{marginTop:0}]}
                                onPress={()=> navigateToSellingPost(item)}
                            >
                                <Text style={styles.buttonText}>
                                    Tin bán
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.sellButtonView}
                                onPress={()=> navigateToBuyingPost(item)}>
                                <Text style={[styles.buttonText]} >
                                    Tin mua
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

            {/*<AnimatedLoader
                visible={loading}
                overlayColor="rgba(0,0,0,0.55)"
                animationType = 'slide'
                animationStyle={styles.lottie}
                animationStyle = {{height: 80, width: 80}}
                loop = {true}
                speed={3}
            />*/}
            <LoadingPage
                isShow={loading}
            />
        </View>
    )
}



export default CategoryPage


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContent: {
        flex: 1,
        height:150,
        backgroundColor: 'rgba(0,0,0,0.5)',
        //alignItems:'center',

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
        fontSize:20,
        paddingLeft:16,
        paddingTop:16,
        fontWeight:'bold',
        //textAlign:'center'

    },
    buttonContainerView: {
        flex:2,
        alignItems:'center',
        //backgroundColor: 'gray',
    },

    sellButtonView: {
        width:120,
        height:32,
        marginRight:4,
        borderRadius:8,
        //justifyContent: 'center',
        borderColor:GlobalStyle.colour.primaryColor,
        //borderWidth:0.5,


    },


    buttonText: {
        //color: GlobalStyle.colour.primaryColor,
        color:'white',
        fontSize:16,
        fontWeight:'700',
        textAlign:'center'

    }


})
