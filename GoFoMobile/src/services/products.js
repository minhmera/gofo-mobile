import axios from 'axios';

import * as c from '../constants';
import {handler} from './auth';
import AsyncStorage from '@react-native-community/async-storage'
import {TOKEN_KEY, USER_ID_KEY} from "../config/Contants";


export async function getLocation() {
    try {
        console.log('API URL =============================> ', c.GET_LOCATION)
        let res = await axios.get(c.GET_LOCATION);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}

export async function uploadImages(images) {
    console.log('******************** uploadImages ****************')
    try {
        const formData = new FormData();
        Array.from(images).forEach(image => {
            console.log('uploadImages  images param ==>  ', images)
            const file = {
                uri: image.path,
                name: `${Date.now()}` + '.jpg',
                type: 'image/jpeg/jpg'
            };
            formData.append('images', file);
        });
        //formData.append('images', file);
        let res = await  axios.post(c.UPLOAD_IMAGES, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        })

        return res.data;
    } catch (e) {
        throw handler(e)
    }



}


export async function sellingPost(data){
    let token = await AsyncStorage.getItem(TOKEN_KEY);

    let axiosConfig = {
        headers: {
            'Authorization': token,
        }
    };

    try{
        let res = await axios.post(c.SELLING_POST, data,axiosConfig );

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}
