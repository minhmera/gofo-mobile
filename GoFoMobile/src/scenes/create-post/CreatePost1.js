import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {Button} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import * as api from '../../services/home';

import LocalizationContext from '../../localization/LocalizationContext';


//Product Page1  {t('welcome')}
function CreatePost1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);

    let [singleFile, setSingleFile] = useState(null);

    let uploadImage = async () => {
        //Check if any file is selected or not
        if (singleFile != null) {
            //If file selected then create FormData
            const fileToUpload = singleFile;
            const data = new FormData();
         

            const file = {
                uri: fileToUpload.uri,
                name: fileToUpload.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
                type: 'image/jpeg/jpg',
                data: fileToUpload.data,
            };
            data.append('images', file);

            //Please change file upload URL
            let res = await fetch(
                //'http://192.168.1.6/image-upload',
                'https://morning-crag-89761.herokuapp.com/image-upload',
                {
                    method: 'post',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data; ',
                    },
                },
            );
            let responseJson = await res.json()
            console.log('uploadImage  ==> ',responseJson)
            if (responseJson.status == 1) {
                alert('Upload Successful');
            }
        } else {
            //if no file selected the show alert
            alert('Please Select File first');
        }
    };

    async function selectFile() {
        const options = {
            title: 'Select Avatar',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                setSingleFile(null);
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = {uri: response.uri};
                setSingleFile(response);
                console.log(' ********* ImagePicker success  *************   ', source.uri);
            }
        });
    }

    ;
    return (
        <View>
            <Header titleText='Login'/>
            <Button
                title="Choose Image to upload"
                onPress={() => pickUpImage()}
            />

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
            {singleFile != null ? (
                <Text style={styles.textStyle}>
                    File Name: {singleFile.name ? singleFile.name : ''}
                    {'\n'}
                    Type: {singleFile.type ? singleFile.type : ''}
                    {'\n'}
                    File Size: {singleFile.size ? singleFile.size : ''}
                    {'\n'}
                    URI: {singleFile.uri ? singleFile.uri : ''}
                    {'\n'}
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
