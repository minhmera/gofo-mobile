import React, {useState, useEffect} from 'react'
import {View,TouchableOpacity,TouchableWithoutFeedback, ImageBackground, Text, FlatList, StyleSheet, Alert} from 'react-native'
//import {Text, FAB, List} from 'react-native-paper'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";


import * as api from "../../services/home";



function RenderCategoryList(data) {
    //console.log('RenderCategoryList  data1 ==> ', data)
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


function ProductPage1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    //Product Page1  {t('welcome')}


    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [categories, setCategories] = useState({});

    async function fetchData() {
        //setLoading(true);
        try {
            let response = await api.getCategoryList();
            setCategories(response.result)
            //console.log(' getCategoryList =====>  ',response.result)
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
            {RenderCategoryList(categories)}
        </View>
    )
}

function RenderCategoryItem(item) {
    console.log(' RenderCategoryItem on11  ',item.title_vi)
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
