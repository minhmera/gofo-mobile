import React from 'react';

//API URL
//export const API_URL = 'https://morning-crag-89761.herokuapp.com';
export const API_URL = 'http://192.168.1.11:3000';

//API End Points
export const REGISTER = `${API_URL}/auth/signup`;
export const GENERATE_NEW_PASSWORD = `${API_URL}/auth/updatePassByName/$username`;
export const LOGIN = `${API_URL}/auth/login`; // old version
export const USER_DETAIL = `${API_URL}/auth/userDetail`;

export const GET_USER_DETAIL = `${API_URL}/auth/getUserDetail`;
export const CHANGE_USER_DETAIL = `${API_URL}/auth/userDetail`;

export const CHANGE_PASSWORD = `${API_URL}/auth/changePassword`;
export const UPDATE_PROFILE = `${API_URL}/user`;
export const UPLOAD_IMAGE = `${API_URL}/user/upload`;
export const FORGOT_PASSWORD = `${API_URL}/auth/recover`;


export const GET_CATEGORY_LIST = `${API_URL}/categories/getAll`;
export const UPLOAD_IMAGES = `${API_URL}/image-upload`;
export const SELLING_POST = `${API_URL}/sellingPost/createOne`;
export const EDIT_SELLING_POST = `${API_URL}/sellingPost/$productId`;
export const EDIT_BUYING_POST = `${API_URL}/buyingPost/$productId`;
export const BUYING_POST = `${API_URL}/buyingPost/createOne`;
export const GET_SELLING_PRODUCTS = `${API_URL}/sellingPost/getAll?page=$page&size=$size`;
export const GET_BUYING_PRODUCTS = `${API_URL}/buyingPost/getAll?page=$page&size=$size`;

export const GET_SELLING_PRODUCTS_BY_CATEGORY = `${API_URL}/sellingPost/getByCategory?categoryId=$categoryId&provinceId=$provinceId&page=$page&size=$size`;
export const GET_SELLING_PRODUCTS_BY_USER = `${API_URL}/sellingPost/getByUser?page=$page&size=$size`;
export const SEARCH_SELLING_PRODUCT = `${API_URL}/sellingPost/searchSellingPost?productName=$productName&page=$page&size=$size`;

export const SEARCH_SELLER = `${API_URL}/auth/searchUser?fullName=$fullName&page=$page&size=$size`;

export const DELETE_SELLING_PRODUCT = `${API_URL}/sellingPost/$productId`;
export const DELETE_BUYING_PRODUCT = `${API_URL}/buyingPost/$productId`;

export const GET_BUYING_PRODUCTS_BY_CATEGORY = `${API_URL}/buyingPost/getByCategory?categoryId=$categoryId&provinceId=$provinceId&page=$page&size=$size`;
export const GET_BUYING_PRODUCTS_BY_USER = `${API_URL}/buyingPost/getByUser?page=$page&size=$size`;
export const GET_SELLING_PRODUCT_DETAIL = `${API_URL}/sellingPost/$productId`;
export const GET_BUYING_PRODUCT_DETAIL = `${API_URL}/buyingPost/$productId`;

export const GET_LOCATION = `${API_URL}/getLocation`;
