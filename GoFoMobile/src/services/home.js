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


export async function uploadImages1(image) {
    try {
        //console.log('API uploadImages =============================> ', images.uri)
        console.log('uploadImages  images param 11 ==>  ', image.uri)
        const formData = new FormData();
        const file = {
            uri: image.uri,
            name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
            type: 'image/jpeg/jpg',
            data: image.data,
        };
        formData.append('image', file);
        console.log('uploadImages formData  ==>   ', formData)

        let res = axios
            .post(c.UPLOAD_IMAGES, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
            })
            .then(res => {
                console.log('uploadImages res ========>  ',res.status);
            })
            .catch(err => {
                console.log('uploadImages err');
            });

        return res.data;
    } catch (e) {
        throw handler(e)
    }



}

export async function uploadImages(images) {
    //Check if any file is selected or not
    if (singleFile != null) {
        //If file selected then create FormData
        const fileToUpload = singleFile;
        const data = new FormData();
        data.append('images', 'Image Upload');
        data.append('images', fileToUpload);
        let res = await fetch(
            'https://morning-crag-89761.herokuapp.com/image-upload',
            {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                },
            }
        );
        let responseJson = await res.json();
        if (responseJson.status == 1) {
            alert('Upload Successful');
        }
    } else {
        //if no file selected the show alert
        alert('Please Select File first');
    }
}


// Array.from(images).forEach(image => {
//     console.log('uploadImages  images param ==>  ', images)
//     const file = {
//         uri: image.path,
//         name: image.filename || Math.floor(Math.random() * Math.floor(999999999)) + '.jpg',
//         type: image.mime || 'image/jpeg'
//     };
//     formData.append('images', file);
// });
