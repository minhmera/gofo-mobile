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

