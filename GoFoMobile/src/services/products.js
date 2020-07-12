import axios from 'axios';

import * as c from '../constants';

export async function getLocation() {
    try {
        console.log('API URL =============================> ', c.GET_LOCATION)
        let res = await axios.get(c.GET_LOCATION);
        return res.data;
    } catch (e) {
        throw handler(e)
    }
}

