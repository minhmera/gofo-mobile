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
} from 'react-native';


import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";

import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'

function Notification1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    const { globalState, dispatch } = useGlobalDataContext();
    console.log('MERA  globalState ==>  ',globalState)
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);

    useEffect(() => getData(), []);

    const getData = () => {
        console.log(offset);
        if (!loading && !isListEnd) {
            console.log('getData');
            setLoading(true);
            // Service to get the data from the server to render
            fetch('https://aboutreact.herokuapp.com/getpost.php?offset='
                + offset)
            // Sending the currect offset with get request
                .then((response) => response.json())
                .then((responseJson) => {
                    // Successful response from the API Call
                    console.log(responseJson);
                    if (responseJson.results.length > 0) {
                        setOffset(offset + 1);
                        // After the response increasing the offset
                        setDataSource([...dataSource, ...responseJson.results]);
                        setLoading(false);
                    } else {
                        setIsListEnd(true);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const renderFooter = () => {
        return (
            // Footer View with Loader
            <View style={styles.footer}>
                {loading ? (
                    <ActivityIndicator
                        color="black"
                        style={{margin: 15}} />
                ) : null}
            </View>
        );
    };

    const ItemView = ({item}) => {
        return (
            // Flat List Item
            <Text
                style={styles.itemStyle}
                onPress={() => getItem(item)}>
                {item.id}
                {'.'}
                {item.title.toUpperCase()}
            </Text>
        );
    };

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View
                style={{
                    height: 0.5,
                    width: '100%',
                    backgroundColor: '#C8C8C8',
                }}
            />
        );
    };

    const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>HeyAPP</Text>
            <View style={styles.inputView} >
                <TextInput
                    style={styles.inputText}
                    placeholder="Email..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({email:text})}/>
            </View>
            <View style={styles.inputView} >
                <TextInput
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password..."
                    placeholderTextColor="#003f5c"
                    onChangeText={text => this.setState({password:text})}/>
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>


        </View>
    );
}

export default Notification1


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    }
});
