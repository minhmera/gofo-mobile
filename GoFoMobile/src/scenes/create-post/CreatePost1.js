import React, {useEffect,useState,useCallback} from 'react'
import {View, Text, CameraRoll} from 'react-native'
import Header from '../../components/Header'
import {Button} from 'react-native-elements';


import * as api from "../../services/home";

import LocalizationContext from "../../localization/LocalizationContext";






//Product Page1  {t('welcome')}
function CreatePost1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    const [photos, getPhotos] = useCameraRoll({ first: 80 });



    async function uploadImage(images) {
        try {
            let response = await api.uploadImages(images)
            console.log('uploadImage  ==> response ', response)


        } catch (error) {
            console.log('uploadImage  error ', error)
        }
    }

    ;
    return (
        <View>
            <Header titleText='Login'/>
            <Button
                title="Upload images 1"
                onPress={() => console.log("ahihi")}
            />

            <Text>
                DKM
            </Text>

        </View>
    )
}

export default CreatePost1
