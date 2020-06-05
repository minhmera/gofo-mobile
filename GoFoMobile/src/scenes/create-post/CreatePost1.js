import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {Button} from 'react-native-elements';
//import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
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
        <View>
            <Header titleText='Login'/>


            <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 30, textAlign: 'center'}}>
                    React Native File Upload Example
                </Text>
                <Text
                    style={{
                        fontSize: 25,
                        marginTop: 20,
                        marginBottom: 30,
                        textAlign: 'center',
                    }}>

                </Text>
            </View>
            {/*Showing the data of selected Single file*/}
            {images != null ? (
                <Text style={styles.textStyle}>

                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Text style={styles.buttonTextStyle}>Select File</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={uploadImage}>
                <Text style={styles.buttonTextStyle}>Upload File</Text>
            </TouchableOpacity>


        </View>
    );
}

const styles = StyleSheet.create({
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


