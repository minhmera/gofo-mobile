import axios from 'axios';

import * as c from '../contants/constants';

export async function register(data){
    try{
        let res = await axios.post(c.REGISTER, data);

        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function genNewPass(username){
    try{
        let url = c.GENERATE_NEW_PASSWORD
        url = url.replace('$username',username)
        let res = await axios.get(url);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(data){
    try{
        let res = await axios.post(c.LOGIN, data);

        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function editUserInfo(data){
    try{
        let res = await axios.post(c.USER_DETAIL, data);
        console.log('editUserInfo ==>  ',c.USER_DETAIL)
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function changePassword(data){
    try{
        let res = await axios.post(c.CHANGE_PASSWORD, data);
        console.log('changePassword ==>  ',c.CHANGE_PASSWORD)
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export async function forgotPassword(data) {
    try {
        let res = await axios.post(c.FORGOT_PASSWORD, data);

        return res.data;
    } catch (e) {
        throw handler(e);
    }
}

export async function updateProfile(userId, data){
    try{
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data"
            }
        };

        const form_data = new FormData();
        for ( let key in data )
            form_data.append(key, data[key]);

        let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options);
        return res.data;
    }catch (e) {
        throw handler(e);
    }
}

export function handler(err) {
    let error = err;

    if (err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}
