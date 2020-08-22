import React, {useState, useEffect, useReducer} from 'react';
import {View,TouchableOpacity,TouchableWithoutFeedback, ImageBackground, Text, FlatList, StyleSheet, Alert} from 'react-native'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";
import * as api from "../../services/home";
import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'



function RenderCategoryList(data) {
    console.log('RenderCategoryList 22 data ==> ', data)
    if (data.length > 0) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({item}) =>
                            RenderCategoryItem(item)
                        }

                    keyExtractor={(item, index) => item._id}
                />
            </View>
        )
    }
}

//({ route, navigation })
function ProductPage1({route}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    //Product Page1  {t('welcome')}
   // console.log("MERA  ProductPage1 param ==>  ",route,' -- ')

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    //const [categories, setCategories] = useState({});

    const { globalState, dispatch } = useGlobalDataContext();

    async function fetchData() {
        //setLoading(true);
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


    useEffect(() => {
        fetchData();
    }, []);

    return (

        <View style={{flex: 1}}>
            <Header titleText='Danh mục sản phẩm'/>
            {RenderCategoryList(globalState.categories )}
            {/*{console.log('MERA categoryReducer 44 ==>  ', globalCategory)}*/}
        </View>
    )
}

function RenderCategoryItem(item) {
    return (
        <View style={[styles.itemContainer]} >
            <ImageBackground source={{uri: item.photoUrl}} style={styles.bgImage}>
                <TouchableOpacity style={styles.itemContent} onPress = {() => console.log(' pressed on11  ',item.title_vi)}>
                    <Text style={styles.itemTitle} >
                        {item.title_vi}
                    </Text>
                </TouchableOpacity>
            </ImageBackground>

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
        justifyContent: "center"
    },
    itemContainer: {
        height:150,
    },
    itemTitle: {
        color: 'white',
        textAlign:'center',
        fontSize:16,
        fontWeight:'bold',

    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    }
})
