import React, {useEffect, useState, useCallback} from 'react';
import {View, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {Input, CheckBox, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import Header from '../../components/Header';
import ImagePicker from 'react-native-image-crop-picker';
import AppStyle from '../../style/style';
import GlobalStyle from '../../style/GlobalStyle';

import * as api from '../../services/home';

import LocalizationContext from '../../localization/LocalizationContext';

function renderImage(images) {
    //let arrImages = ['a','b','c']

    return images.map((item, index) => {
        console.log('index ', index, 'item11 ', item.path);
        return (
            <View
                style={styles.pickupImageView}
                key={index}
            >
                <Image
                    style={styles.imageItem}
                    source={{uri: item.path}}
                />


            </View>
        );
    });

}

//Product Page1  {t('welcome')}
function CreatePost1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    let [images, setImages] = useState(null);
    let [isSell, setSellStatus] = useState(true);

    async function uploadImage() {
        try {
            //const fileToUpload = images[0];
            let response = await api.uploadImages(images);
            console.log('uploadImage response ==> ', response);
        } catch (e) {
            console.log('Error ', e);
        }
    }

    async function selectFile() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
        }).then(images => {
            console.log('selectFile  ==> ', images);
            setImages(images);
        });
    }

    ;
    return (
        <View style={styles.container}>
            <Header titleText='Create Post'/>
            <ScrollView style={{flex: 1}}>


                <View style={styles.content}>
                    <View style={styles.uploadImageView}>
                        {images != null ?
                            renderImage(images) :
                            <TouchableOpacity
                                style={[styles.pickupImageView, {backgroundColor: GlobalStyle.colour.primaryColor}]}
                                onPress={selectFile}

                            >
                                <Icon
                                    name='camerao'
                                    size={36}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        }


                        <TouchableOpacity
                            style={styles.deleteImageView}
                            onPress={() => setImages(null)}
                        >
                            <Icon
                                name='close'
                                size={16}
                                color={'white'}
                            />

                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputInfoView}>
                        <View style={styles.checkBoxView}>
                            <View style={[styles.checkBoxItem,{marginLeft:0}]}>

                                <CheckBox
                                    size={28}
                                    checked={isSell}
                                    checkedColor={GlobalStyle.colour.primaryColor}
                                    onPress={()=> setSellStatus(true)}

                                />
                                <Text>
                                    Rao bán
                                </Text>
                            </View>
                            <View style={[styles.checkBoxItem,{marginLeft:0}]}>

                                <CheckBox
                                    size={28}
                                    checked={!isSell}
                                    checkedColor={GlobalStyle.colour.primaryColor}
                                    onPress={()=> setSellStatus(false)}
                                />
                                <Text>
                                    Rao mua
                                </Text>
                            </View>

                        </View>

                        <Input
                            placeholder='Phân loại sản phẩm '
                            inputContainerStyle={styles.basicInput}
                        />
                        <Input
                            placeholder='Tên sản phẩm '
                            inputContainerStyle={styles.basicInput}
                        />
                        <Input
                            placeholder='Thành phố'
                            inputContainerStyle={styles.basicInput}
                        />
                        <Input
                            placeholder='Quận huyện'
                            inputContainerStyle={styles.basicInput}
                        />
                        {isSell == true ?
                            <Input
                                placeholder='Thời gian thu hoạch'
                                inputContainerStyle={styles.basicInput}
                            /> : null
                        }
                        {isSell == true ?
                            <Input
                                placeholder='Sản lượng'
                                inputContainerStyle={styles.basicInput}
                            /> : null
                        }
                        <Input
                            placeholder='Tiêu chuẩn'
                            inputContainerStyle={styles.basicInput}
                        />
                        <Input
                            placeholder='Email '
                            inputContainerStyle={styles.basicInput}
                        />
                        <Input
                            placeholder="Tên"
                            inputContainerStyle={styles.basicInput}
                            //secureTextEntry={true}
                        />
                        <View style={styles.bottomView}>
                            <Button
                                title="Upload Product"
                                buttonStyle={[AppStyle.commonButton, styles.submitButton]} //submitButton
                                containerStyle={styles.buttonContainer}
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
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        //justifyContent: 'center',
        padding: 8,
    },

    uploadImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        borderColor: '#B5B5B5',
        borderWidth: 0.5,
        borderRadius: 6,
    },
    pickupImageView: {
        width: '30%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 6,
        //backgroundColor:'#1EACE0'
    },
    imageItem: {
        //padding:0
        //flex:1,
        borderRadius: 8,
        width: '100%',
        height: '100%',

    },
    deleteImageView: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginTop: -6,
        marginRight: -4,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        position: 'absolute',
        backgroundColor: 'red',

    },

    inputInfoView: {
        flex: 1,
        marginTop: 4,
        justifyContent: 'center',
        borderColor: '#B5B5B5',
        borderWidth: 0.5,
        borderRadius: 6,
    },

    basicInput: {
        //borderColor:'red'
        borderBottomWidth: 0.5,
        borderBottomColor: '#B5B5B5',
    },

    checkBoxView: {
        //flexDirection: 'row',
    },
    checkBoxItem: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems:'center'
    },

    buttonContainer: {
        paddingTop: 40,
        padding: 40,

    },
    bottomView: {
        height: 120,
    },
    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,
    },


});

export default CreatePost1;

