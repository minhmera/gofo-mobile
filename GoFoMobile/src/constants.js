import React from 'react';

//API URL
//export const API_URL = 'https://mesannodejsapiwithverification.herokuapp.com/api';
export const API_URL = 'https://morning-crag-89761.herokuapp.com';

//API End Points
export const REGISTER = `${API_URL}/auth/register`;
export const LOGIN = `${API_URL}/auth/login`;///auth/login
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;


export const GET_CATEGORY_LIST = `${API_URL}/categories/getAll`;
export const UPLOAD_IMAGES = `${API_URL}/image-upload`;
