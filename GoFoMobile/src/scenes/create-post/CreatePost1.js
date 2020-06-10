import React, {useEffect, useState, useCallback} from 'react';
import {View,ScrollView, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

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
        <View style={styles.container}>
            <Header titleText='Create Post'/>
            <ScrollView style={{flex:1}}>


            <View style={styles.content}>
                <View style={styles.uploadImageView}>

                </View>
                <View style={styles.inputInfoView}>

                    <Input
                        placeholder='BASIC INPUT'
                    />

                    <Input
                        placeholder='INPUT WITH ICON'
                        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                    />

                    <Input
                        placeholder='INPUT WITH CUSTOM ICON'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />


                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment' }}
                        style={styles}
                        onChangeText={value => this.setState({ comment: value })}
                    />


                    <Input
                        placeholder='INPUT WITH ERROR MESSAGE'
                        errorStyle={{ color: 'red' }}
                        errorMessage='ENTER A VALID ERROR HERE'
                    />

                    <Input placeholder="Password" secureTextEntry={true} />
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
        //flex: 1,
        justifyContent: 'center',
        height: 100,
        borderColor: '#B5B5B5',
        borderWidth: 1,
        borderRadius: 6,
    },

    inputInfoView: {
        flex: 1,
        marginTop:4,
        justifyContent: 'center',
        borderColor: '#B5B5B5',
        borderWidth: 1,
        borderRadius: 6,
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
