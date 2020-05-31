import axios from 'axios';

import * as c from '../constants';

export async function getCategoryList() {
    try {
        console.log('API URL =============================> ', c.GET_CATEGORY_LIST)
        let res = await axios.get(c.GET_CATEGORY_LIST);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}


export async function uploadImages(images) {
    try {
        console.log('API uploadImages =============================> ', images.uri)
        const formData = new FormData();

        Array.from(images).forEach(image => {
            console.log('uploadImages  images  ==>  ', images)
            formData.append('images', image.uri);
        });
        formData.append('images', images.uri);
        console.log('uploadImages  ==>  formData ', formData)

        let res = axios
            .post(c.UPLOAD_IMAGES, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            .then(res => {
                console.log('uploadImages res',res.request.status);
            })
            .catch(err => {
                console.log('uploadImages err');
            });

        return res.data;
    } catch (e) {
        throw handler(e)
    }
}
