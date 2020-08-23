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

