import axios from 'axios';

import * as c from '../constants';
import {handler} from './auth';
import AsyncStorage from '@react-native-community/async-storage'
import {TOKEN_KEY, USER_ID_KEY} from "../config/Contants";


export async function getLocation() {
    try {
        //console.log('API URL =============================> ', c.GET_LOCATION)
        let res = await axios.get(c.GET_LOCATION);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}
// **************   POST PRODUCTS   **************
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

export async function editSellingPost(data, productId){
    let token = await AsyncStorage.getItem(TOKEN_KEY);
    let url =  c.EDIT_SELLING_POST
    url = url.replace('$productId',productId)
    let axiosConfig = {
        headers: {
            'Authorization': token,
        }
    };

    console.log('editSellingPost ==>   ', url)
    try{
        let res = await axios.put(url, data,axiosConfig );

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function buyingPost(data){
    let token = await AsyncStorage.getItem(TOKEN_KEY);

    let axiosConfig = {
        headers: {
            'Authorization': token,
        }
    };

    try{
        let res = await axios.post(c.BUYING_POST, data,axiosConfig );

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}



// **************   GET PRODUCTS   **************

export async function getSellingProduct(page) {
    let url = c.GET_SELLING_PRODUCTS
    url = url.replace('$page',page)
    url = url.replace('$size',2)
    try {
        console.log('API URL =============================> ', url)
        let res = await axios.get(url);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}

export async function getSellingProduct2(page) {
    let url = c.GET_SELLING_PRODUCTS

    url = url.replace('$page',page)
    url = url.replace('$size',2)
    console.log('MERA API getSellingProduct2 ===========> ',url)
    return axios.get(url);

}

export async function getBuyingProduct(page) {
    let url = c.GET_BUYING_PRODUCTS

    url = url.replace('$page',page)
    url = url.replace('$size',2)
    console.log('MERA API getBuyingProduct ===========> ',url)
    return axios.get(url);

}

export async function getSellingByCategory(categoryId,provinceId,page) {
    let url = c.GET_SELLING_PRODUCTS_BY_CATEGORY

    url = url.replace('$categoryId',categoryId)
    if (provinceId !== 0) {
        url = url.replace('$provinceId',provinceId)
    } else {
        url = url.replace('&provinceId=$provinceId','')
    }

    url = url.replace('$page',page)
    url = url.replace('$size',2)
    console.log('MERA getSellingByCategory  _______________URL_________ ',url)
    return axios.get(url);

}

export async function getSellingByUser(userId,page) {
    let url = c.GET_SELLING_PRODUCTS_BY_USER

    url = url.replace('$page',page)
    url = url.replace('$size',2)
    console.log('MERA getSellingByUser 11 _______________URL_________ ',url, 'userId ==> ',userId)
    return axios.get(url, { params: { userId: userId} })

    // return axios({
    //     method: 'get',
    //     url: url,
    //     //params: {userId: userId}
    // })

}

export async function searchSellingProduct(productName,page) {
    let url = c.SEARCH_SELLING_PRODUCT
    url = url.replace('$productName',productName)
    url = url.replace('$page',page)
    url = url.replace('$size',2)
    console.log('MERA searchSellingProduct  _______________URL_________ ',url)
    return axios.get(url);

}


export async function getBuyingByCategory(categoryId,provinceId,page) {
    let url = c.GET_BUYING_PRODUCTS_BY_CATEGORY

    url = url.replace('$categoryId',categoryId)
    if (provinceId !== 0) {
        url = url.replace('$provinceId',provinceId)
    } else {
        //&provinceId=$provinceId
        url = url.replace('&provinceId=$provinceId','')
    }

    url = url.replace('$page',page)
    url = url.replace('$size',2)
    console.log('MERA getBuyingByCategory  _______________URL_________ ',url)
    return axios.get(url);

}


export async function getSellingProductDetail(productId) {
    let url = c.GET_SELLING_PRODUCT_DETAIL
    url = url.replace('$productId',productId)
    console.log('MERA getSellingProductDetail  _______________URL_________ ',url)
    return axios.get(url);
}

export async function getBuyingProductDetail(productId) {
    let url = c.GET_BUYING_PRODUCT_DETAIL
    url = url.replace('$productId',productId)
    console.log('MERA getSellingProductDetail  _______________URL_________ ',url)
    return axios.get(url);
}


