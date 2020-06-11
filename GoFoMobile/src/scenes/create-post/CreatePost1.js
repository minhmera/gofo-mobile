import React, {useEffect, useState, useCallback} from 'react';
import {View,ScrollView, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';


import Header from '../../components/Header';
import ImagePicker from 'react-native-image-crop-picker';

import AppStyle from "../../style/style";

import * as api from '../../services/home';

import LocalizationContext from '../../localization/LocalizationContext';



//Product Page1  {t('welcome')}
function CreatePost1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    let [images, setImages] = useState(null);

    async function uploadImage() {
        try {
            //const fileToUpload = images[0];
            let response = await api.uploadImages(images)
            console.log('uploadImage response ==> ',response)
        }catch (e) {
            console.log('Error ',e)
        }
    }

    async function selectFile() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true
        }).then(images => {
            console.log("selectFile  ==> ",images);
            setImages(images);
        });
    }

    ;
    return (
        <View style={styles.container}>
            <Header titleText='Create Post'/>
            <ScrollView style={{flex:1}}>


            <View style={styles.content}>
                <View style={styles.uploadImageView}>
                    <View style={styles.pickupImageView}>

                    </View>
                    <View style={styles.pickupImageView}>

                    </View>
                    <View style={styles.pickupImageView}>

                    </View>



                    <View style={styles.deleteImageView}>

                    </View>
                </View>
                <View style={styles.inputInfoView}>

                    <Input
                        placeholder='BASIC INPUT'
                        inputContainerStyle={styles.basicInput}
                    />
                    <Input
                        placeholder='BASIC INPUT'
                        inputContainerStyle={styles.basicInput}
                    />
                    <Input
                        placeholder='BASIC INPUT'
                        inputContainerStyle={styles.basicInput}
                    />
                    <Input
                        placeholder='BASIC INPUT'
                        inputContainerStyle={styles.basicInput}
                    />
                    <Input
                        placeholder='BASIC INPUT'
                        inputContainerStyle={styles.basicInput}
                    />
                    <Input
                        placeholder="Password"
                        inputContainerStyle={styles.basicInput}
                        secureTextEntry={true}
                    />
                    <View style={styles.bottomView}>
                        <Button
                            title="Solid Button"
                            buttonStyle = {AppStyle.commonButton}
                            containerStyle = {styles.localButton}
                        />
                    </View>
                </View>

            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'white'
    },
    content: {
        flex: 1,
        //justifyContent: 'center',
        padding: 8
    },

    uploadImageView: {
        flexDirection:'row',

        alignItems: 'center',
        height: 100,
        borderColor: '#B5B5B5',
        borderWidth: 0.5,
        borderRadius: 6,
    },
    pickupImageView: {
        width:'30%',
        height:80,
        marginLeft:2,
        marginRight:2,
        borderRadius:6,
        backgroundColor:'#1EACE0'
    },
    deleteImageView: {
        width: 24,
        height: 24,
        //marginTop:-80,
        alignSelf: 'flex-start',
        right:0,
        position:'absolute',
        backgroundColor:'red'

    },

    inputInfoView: {
        flex: 1,
        marginTop:4,
        justifyContent: 'center',
        borderColor: '#B5B5B5',
        borderWidth: 0.5,
        borderRadius: 6,
    },

    basicInput: {
        //borderColor:'red'
        borderBottomWidth:0.5,
        borderBottomColor:'#B5B5B5'
    },

    bottomView: {
        height:120,
    },

    localButton: {
        paddingTop:40,
        padding: 40
    },





    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
});

export default CreatePost1;



//
// return (
//     <View>
//         <Header titleText='Login'/>
//
//
//         <View style={{alignItems: 'center'}}>
//             <Text style={{fontSize: 30, textAlign: 'center'}}>
//                 React Native File Upload Example
//             </Text>
//             <Text
//                 style={{
//                     fontSize: 25,
//                     marginTop: 20,
//                     marginBottom: 30,
//                     textAlign: 'center',
//                 }}>
//
//             </Text>
//         </View>
//         {/*Showing the data of selected Single file*/}
//         {images != null ? (
//             <Text style={styles.textStyle}>
//
//             </Text>
//         ) : null}
//         <TouchableOpacity
//             style={styles.buttonStyle}
//             activeOpacity={0.5}
//             onPress={selectFile}>
//             <Text style={styles.buttonTextStyle}>Select File</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//             style={styles.buttonStyle}
//             activeOpacity={0.5}
//             onPress={uploadImage}>
//             <Text style={styles.buttonTextStyle}>Upload File</Text>
//         </TouchableOpacity>
//
//
//     </View>
// );
