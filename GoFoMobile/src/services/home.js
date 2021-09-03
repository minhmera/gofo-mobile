import axios from 'axios';

import * as c from '../contants/apiConstants';

export async function getCategoryList() {
    try {
        console.log('API URL =============================> ', c.GET_CATEGORY_LIST)
        let res = await axios.get(c.GET_CATEGORY_LIST);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}


export async function getAppGeneralInfo() {
    try {
        //console.log('getAppGeneralInfo URL =============================> ', c.GET_APP_GENERAL_INFO)
        let res = await axios.get(c.GET_APP_GENERAL_INFO);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}

