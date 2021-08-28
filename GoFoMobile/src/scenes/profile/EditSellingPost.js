import React, {useEffect, useState, useCallback, useReducer} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet, Alert,
} from 'react-native';
import {Input, CheckBox, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

const moment = require('moment');

import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import Header from '../../components/Header';
import AppStyle from '../../style/style';
import GlobalStyle from '../../style/GlobalStyle';
import * as api from '../../services/products';
import LocalizationContext from '../../localization/LocalizationContext';
import ModelList from '../../components/ModelList'
import ModelCalendar from '../../components/ModelCalendar'
import {ProductCertifications} from '../../config/AppConfig'
import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'
import AsyncStorage from "@react-native-community/async-storage";
import {TOKEN_KEY, USER_ID_KEY, FULL_NAME_KEY} from "../../config/Contants";
import LoadingPage from '../../components/LoadingPage'
import DropdownButton from "../../components/DropdownButton";
import CommonButton from "../../components/CommonButton";
function renderImage(images) {
    //let arrImages = ['a','b','c']

    return images.map((item, index) => {
        console.log('index ', index, 'item11 ', item.path);
        let  imageUrl = item.path
        if (item.path === undefined) {
            imageUrl = item
        }
        return (
            <View
                style={styles.pickupImageView}
                key={index}
            >
                <Image
                    style={styles.imageItem}
                    //source={{uri: item.path}}
                    source={{uri: imageUrl}}
                />


            </View>
        );
    });

}


//Product Page1  {t('welcome')}
function EditSellingPost({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    let navItem = navigation.getParam('item');
    let type = navigation.getParam('type');
    const {globalState, dispatch} = useGlobalDataContext();

    console.log('MERA EditSellingPost  item ========> ',navItem)
    //console.log('MERA EditSellingPost  categories ========> ',globalState.categories)




    function setDefaultData(navItem,globalState) {
        globalState.categories.map((item, index) => {
            if (navItem.categoryId === item.type ) {
                setSelectedCategory(item)
            }
        })
        setProductName(navItem.productName)
        let cityObj = { name: navItem.provinceName, id: navItem.provinceId }
        let distObj = { name: navItem.districtName, id: navItem.districtId }

        setSelectedDistrict(distObj)
        setSelectedCity(cityObj)

        let formatString = 'YYYY-MM-DD'
        let cropDate = moment(navItem.cropDay).format(formatString)
        setSelectedCropTimeDate(moment(cropDate))
        setSelectedCertification(navItem.productCertification)
        setPhoneNumber(navItem.sellerPhone)
        if (navItem.photoUrls.length === 0) {
            setImages(null)
        } else {
            setImages(navItem.photoUrls)
        }


        if (navItem.productPrice !== undefined) {
            setProductPrice(navItem.productPrice.toString())
            console.log('navItem productPrice ==>  ',navItem.productPrice)
        }
        if (navItem.measuring !== undefined) {
            setMeasuring(navItem.measuring)
        }
        if (navItem.description !== undefined) {
            setDescription(navItem.description)
        }


    }






    let [images, setImages] = useState(null);
    let [defaultImages, setDefaultImages] = useState(null);

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [measuring, setMeasuring] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cities, setCities] = useState({});
    const [districts, setDistricts] = useState({});
    const [locations, setLocations] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    let [isShowCityDropdown, setShowCityDropdown] = useState(false);
    let [isShowDistrictDropdown, setShowDistrictDropdown] = useState(false);

    let [isShowCategoryDropdown, setShowCategoryDropdown] = useState(false);

    let [isShowCropTimeCalendar, setShowCropTimeCalendar] = useState(false);
    let [isShowCertification, setShowCertification] = useState(false);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);


    const [selectedCategory, setSelectedCategory] = useState(null);

    const [selectedCropTimeDate, setSelectedCropTimeDate] = useState(null);
    const [selectedCertification, setSelectedCertification] = useState(null);

    // Error States

    let [isCategoryError, setCategoryErrorState] = useState(null);
    let [isCityError, setCityErrorState] = useState(null);
    let [isProductNameError, setProductNameError] = useState(null);
    let [isPhoneError, setPhoneError] = useState(null);
    let [token, setToken] = useState(null);

    //token

    async function uploadProduct() {
        setLoading(true);
        console.log('images11 ==>  ',images)


        try {
            let imageUrls = []
            if (images !== null) {
                if (images.length > 0) {
                    if (images[0].path !== undefined) {
                        let response = await api.uploadImages(images);
                        console.log('uploadImage response ==> ', response);
                        imageUrls = response.imageUrls
                    }
                }
            }



            let res = await onSubmit(imageUrls)
            console.log('MERA ==> onSubmit ', res)
            setLoading(false);
        } catch (e) {
            console.log('uploadImages Error ', e);
            setLoading(false);
        }

    }

    async function onSubmit(photoUrls) {

        let userId = await AsyncStorage.getItem(USER_ID_KEY);
        let fullName = await AsyncStorage.getItem(FULL_NAME_KEY);
        let sellingObj = {
            //"photoUrls": photoUrls,
            "userId": userId,
            "fullName": fullName,
            "categoryId": selectedCategory.type,
            "productName": productName,
            "productPrice": productPrice,
            "measuring": measuring,
            "description": description,
            "provinceId": selectedCity.id,
            "districtId": selectedDistrict.id,
            "provinceName": selectedCity.name,
            "districtName": selectedDistrict.name,
            "cropDay": selectedCropTimeDate.format('YYYY-MM-DD'),
            "productCertification": selectedCertification,
            "sellerPhone": phoneNumber
        }
        if (photoUrls.length > 0) {
            sellingObj.photoUrls = photoUrls
        }

        console.log('MERA submit object ', sellingObj)
        if (type === 'SELL') {
            try {
                let response = await api.editSellingPost(sellingObj,navItem._id);
                console.log('MERA ------------------------ sellingPost response ----------------   ', response);

                Alert.alert(
                    'Posting Successful',
                    response.message,

                    [
                        {text: 'OK'}, //  {text: 'OK', onPress: () => navigation.replace("Login")}
                    ],
                    {cancelable: false},
                );
            } catch (error) {
                Alert.alert(
                    'Posting',
                    error.message,

                    [
                        {text: 'OK'}, //  {text: 'OK', onPress: () => navigation.replace("Login")}
                    ],
                    {cancelable: false},
                );
                setError(error.message);
            }
        } else if (type === 'BUY') {
            try {
                let response = await api.editBuyingPost(sellingObj,navItem._id);
                console.log('MERA ------------------------ sellingPost response ----------------   ', response);

                Alert.alert(
                    'Posting Successful',
                    response.message,

                    [
                        {text: 'OK'}, //  {text: 'OK', onPress: () => navigation.replace("Login")}
                    ],
                    {cancelable: false},
                );
            } catch (error) {
                Alert.alert(
                    'Posting',
                    error.message,

                    [
                        {text: 'OK'}, //  {text: 'OK', onPress: () => navigation.replace("Login")}
                    ],
                    {cancelable: false},
                );
                setError(error.message);
            }
        }

    }

    function submitPost() {
        if (isSellingValid() == true) {
            let res = uploadProduct()
        }
    }


    async function selectFile() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
            compressImageMaxWidth:500
        }).then(images => {
            console.log('selectFile  ==> ', images);
            setImages(images);
        });
    }

    async function fetchData() {
        //setLoading(true);

        try {
            let response = await api.getLocation();
            //console.log('MERA getLocation22  :  ==>  ',response)
            let cities = []
            if (response.result) {
                let locations = response.result
                setLocations(locations)
                locations.map((item, index) => {
                    let cityObj = {
                        name: item.name,
                        id: item.id,
                    }
                    cities.push(cityObj)
                })

                setCities(cities)
            }

            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    useEffect(() => {
        {
            fetchData(), getTokenKey() , setDefaultData(navItem,globalState)
        }
    }, []);

    function selectedCategoryCallBack(category) {
        console.log('MERA selected category ', category)
        setSelectedCategory(category)
        if (category != null) {
            setCategoryErrorState(false)
        }
        setShowCategoryDropdown(false)

    }

    function cityDropDownCallBack(cityObj) {
        console.log('MERA selected city ', cityObj)
        setSelectedCity(cityObj)
        if (cityObj != null) {
            setCityErrorState(false)
        }

        setSelectedDistrict(null)
        if (cityObj != null) {
            let index = locations.findIndex(x => x.name === cityObj.name)
            let districtObject = locations[index].districts
            let districtList = []
            districtObject.map((item, index) => {
                let districtsObj = {
                    name: item.name,
                    id: item.id
                }
                districtList.push(districtsObj)
            })
            setDistricts(districtList)

        }
        setShowCityDropdown(false)


    }

    function districtDropDownCallBack(district) {
        console.log('MERA selected district ', district)
        setSelectedDistrict(district)
        setShowDistrictDropdown(false)
    }

    function cropTimeCalendarCallBack(day) {

        let selectedDate = moment(day.dateString);
        console.log('MERA cropTimeCalendarCallBack ==> ', day.dateString)
        //let dateString = selectedDate.format('DD-MM-YYYY')
        //console.log('MERA cropTimeCalendarCallBack ==> ', dateString );
        setSelectedCropTimeDate(selectedDate)
        setShowCropTimeCalendar(false)
    }

    function certificationCallBack(certification) {
        console.log('MERA certificationCallBack ==>  ', certification)
        setSelectedCertification(certification)
        setShowCertification(false)
    }

    function handleShowDistrictDropdown() {
        if (selectedCity != null) {
            setShowDistrictDropdown(true)
        }
    }


    function isSellingValid() {
        let isValidAllField = true
        if (selectedCategory == null) {
            isValidAllField = false
            setCategoryErrorState(true)
        } else {
            setCategoryErrorState(false)
        }

        if (selectedCity == null) {
            isValidAllField = false
            setCityErrorState(true)
        } else {
            setCityErrorState(false)
        }

        if (productName === "") {
            isValidAllField = false
            setProductNameError(true)
        } else {
            setProductNameError(false)
        }
        //setPhoneError
        if (phoneNumber === "") {
            isValidAllField = false
            setPhoneError(true)
        } else {
            setPhoneError(false)
        }
        console.log('MERA1  isSellingValid  ==>   ', isValidAllField)
        return isValidAllField
    }

    function renderCropDayView() {
        //console.log('MERA selectedCropTimeDate ',selectedCropTimeDate)
        return (
            <View style={styles.selectionItem}>
                <View style={styles.selectionTitleView}>
                    <Text style={styles.selectionTitleText}>Thời gian thu hoạch</Text>
                </View>
                <DropdownButton
                    title={selectedCropTimeDate === null ? 'Chọn' : selectedCropTimeDate.format('DD/MM/YYYY')}
                    onPress={() => setShowCropTimeCalendar(true)}
                    isError={isCityError}
                    containerStyle = {{flex:2}}
                />
            </View>
        );

    }

    async function getTokenKey() {
        let token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log("MERA getTokenKey11   ==> ", token)
        setToken(token)
    }


        return (
            <View style={styles.container}>
                <Header navigation={navigation} titleText='Chỉnh Sửa Sản Phẩm'/>
                <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode={'interactive'}>


                    <View style={styles.content}>
                        <View style={styles.uploadImageView}>
                            {images != null ?
                                renderImage(images) :
                                <TouchableOpacity
                                    style={[styles.pickupImageView, {backgroundColor: GlobalStyle.colour.primaryColor}]}
                                    onPress={selectFile}

                                >
                                    <Icon
                                        name='camerao'
                                        size={36}
                                        color={'white'}
                                    />
                                </TouchableOpacity>
                            }


                            <TouchableOpacity
                                style={styles.deleteImageView}
                                onPress={() => setImages(null)}
                            >
                                <Icon
                                    name='close'
                                    size={16}
                                    color={'white'}
                                />

                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputInfoView}>



                           {/* {dropdownButton(selectedCategory === null ? "Phân loại sản phẩm" : selectedCategory.title_vi, () => setShowCategoryDropdown(true), isCategoryError)}*/}

                            <View style={styles.selectionItem}>
                                <View style={styles.selectionTitleView}>
                                    <Text style={styles.selectionTitleText}>*Loại sản phẩm</Text>
                                </View>
                                <DropdownButton
                                    title={selectedCategory === null ? 'Chọn' : selectedCategory.title_vi}
                                    onPress={() => setShowCategoryDropdown(true)}
                                    isError={isCategoryError}
                                    containerStyle = {{flex:2}}
                                />
                            </View>

                            <View style={styles.selectionItem}>
                                <View style={styles.selectionTitleView}>
                                    <Text style={styles.selectionTitleText}>*Tên sản phẩm</Text>
                                </View>
                                <View style={{flex:2}}>
                                    <Input
                                        inputStyle={[styles.inputStyle]}
                                        errorMessage={isProductNameError === true ? 'Vui lòng nhập tên sản phẩm' : ''}
                                        placeholder='Nhập tên sản phẩm'
                                        inputContainerStyle={[styles.basicInput, {borderBottomColor: isProductNameError === true ? GlobalStyle.colour.errorColor : GlobalStyle.colour.grayColor}]}
                                        onChangeText={value => setProductName(value)}
                                        value = {productName}
                                    />
                                </View>

                            </View>

                            <View style={[styles.selectionItem]}>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <View style={[styles.selectionTitleView,{flex:1}]}>
                                        <Text style={styles.selectionTitleText}>Giá</Text>
                                    </View>
                                    <View style={{flex:5}}>
                                        <Input
                                            inputStyle={[styles.inputStyle]}
                                            placeholder='Nhập giá'
                                            inputContainerStyle={[styles.basicInput,{marginRight:24}, {borderBottomColor: isProductNameError === true ? GlobalStyle.colour.errorColor : GlobalStyle.colour.grayColor}]}
                                            onChangeText={value => setProductPrice(value)}
                                            value={productPrice}
                                            keyboardType={'phone-pad'}
                                        />
                                    </View>
                                    <View style={{flex:0.5,marginLeft:-16 ,marginRight:8}}>
                                        <Text style={styles.selectionTitleText}>đ</Text>
                                    </View>

                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>

                                    <View style={[styles.selectionTitleView,{flex:1,marginLeft:4}]}>
                                        <Text style={styles.selectionTitleText}>Đơn vị</Text>
                                    </View>


                                    <View style={{flex:3}}>
                                        <Input
                                            inputStyle={[styles.inputStyle]}
                                            placeholder='Nhập đơn vị'
                                            inputContainerStyle={[styles.basicInput,{marginRight:8}, {borderBottomColor: isProductNameError === true ? GlobalStyle.colour.errorColor : GlobalStyle.colour.grayColor}]}
                                            onChangeText={value => setMeasuring(value)}
                                            value={measuring}
                                        />
                                    </View>
                                </View>
                            </View>



                            <View style={{flex:1,flexDirection:'row',marginTop:4}}>
                                <View style={{flex:1}}/>

                                <View style={{flex:1, alignItems:'flex-end'}}>
                                    <Text style={{fontSize:10, color:GlobalStyle.colour.grayColor3}}>Đơn vị đo lường cho hàng hoá ví dụ kilogram, tạ, tấn, ...</Text>
                                </View>
                            </View>

{/*
                            {dropdownButton(selectedCity === null ? "Choose city" : selectedCity.name, () => setShowCityDropdown(true), isCityError)}

                            {dropdownButton(selectedDistrict === null ? "Choose district" : selectedDistrict.name, () => handleShowDistrictDropdown())}*/}

                            <View style={styles.selectionItem}>
                                <View style={styles.selectionTitleView}>
                                    <Text style={styles.selectionTitleText}>*Tỉnh/Thành phố</Text>
                                </View>
                                <DropdownButton
                                    title={selectedCity === null ? 'Chọn' : selectedCity.name}
                                    onPress={() => setShowCityDropdown(true)}
                                    isError={isCityError}
                                    containerStyle = {{flex:2}}
                                />
                            </View>

                            <View style={styles.selectionItem}>
                                <View style={styles.selectionTitleView}>
                                    <Text style={styles.selectionTitleText}>*Quận/Huyện</Text>
                                </View>
                                <DropdownButton
                                    title={selectedDistrict === null ? "Chọn" : selectedDistrict.name}
                                    onPress={()=> handleShowDistrictDropdown()}
                                    isError={isCityError}
                                    containerStyle = {{flex:2}}
                                />
                            </View>

                            {renderCropDayView()}

                            <ModelList
                                isVisible={isShowCategoryDropdown}
                                title={'Choose Category'}
                                style={{height: 300}}
                                items={globalState.categories}
                                customField={'title_vi'}
                                customItemId={'_id'}
                                callBack={(item) => selectedCategoryCallBack(item)}
                            />

                            <ModelList
                                isVisible={isShowCityDropdown}
                                title={'Choose Your City'}
                                items={cities}
                                customField={'name'}
                                customItemId={'id'}
                                callBack={(item) => cityDropDownCallBack(item)}
                            />

                            <ModelList
                                isVisible={isShowDistrictDropdown}
                                title={'Choose Your District'}
                                style={{height: 400}}
                                items={districts}
                                customField={'name'}
                                customItemId={'id'}
                                callBack={(item) => districtDropDownCallBack(item)}
                            />

                            <ModelCalendar
                                isVisible={isShowCropTimeCalendar}
                                title={'Select a Crop Day'}
                                style={{height: 460}}
                                items={districts}
                                callBack={(day) => cropTimeCalendarCallBack(day)}
                            />

                            <ModelList
                                isVisible={isShowCertification}
                                title={'Chọn tiêu chuẩn'}
                                style={{height: 180}}
                                items={ProductCertifications}
                                callBack={(item) => certificationCallBack(item)}
                            />


                            <View style={styles.selectionItem}>
                                <View style={styles.selectionTitleView}>
                                    <Text style={styles.selectionTitleText}>Tiêu chuẩn</Text>
                                </View>
                                <DropdownButton
                                    title={selectedCertification == null ? "" : selectedCertification}
                                    onPress={()=> setShowCertification(true) }
                                    isError={isCityError}
                                    containerStyle = {{flex:2}}
                                />
                            </View>


                            <View style={styles.selectionItem}>
                                <View style={styles.selectionTitleView}>
                                    <Text style={styles.selectionTitleText}>*Số điện thoại</Text>
                                </View>
                                <View style={{flex:2}}>
                                    <Input
                                        inputStyle={styles.inputStyle}
                                        placeholder="Số điện thoại"
                                        errorMessage={isPhoneError === true ? 'Vui lòng nhập số điện thoại' : ''}
                                        inputContainerStyle={[styles.basicInput, {borderBottomColor: isPhoneError === true ? GlobalStyle.colour.errorColor : GlobalStyle.colour.grayColor}]}
                                        keyboardType={'phone-pad'}
                                        value={phoneNumber}
                                        onChangeText={value => setPhoneNumber(value)}
                                    />
                                </View>
                            </View>


                            <View
                                style={[styles.selectionItem,{flex:1,flexDirection:'column',alignItems:'flex-start',marginTop:12,marginRight:8}]}>
                                <View style={[styles.selectionTitleView,{flex:1}]}>
                                    <Text style={styles.selectionTitleText}>Mô tả sản phẩm</Text>
                                </View>
                                <View style={[styles.noteInput,{width:'100%',marginTop:4}]}>
                                    <Input
                                        multiline={true}
                                        numberOfLines={8}
                                        inputStyle={[styles.inputStyle,{alignSelf:'flex-start'}]}
                                        placeholder="Nhập mô tả"
                                        inputContainerStyle={[styles.basicInput,{height:80,marginLeft:2}, {borderColor: isPhoneError === true ? GlobalStyle.colour.errorColor : GlobalStyle.colour.grayColor}]}
                                        onChangeText={value => setDescription(value)}
                                        value={description}
                                    />
                                </View>
                            </View>


                            <View style={styles.bottomView}>
                                <CommonButton
                                    title={'OK'}
                                    customStyle={{marginTop:32}}
                                    textStyle={{fontSize:18}}
                                    onPress={()=> submitPost()}
                                />
                            </View>
                        </View>

                    </View>

                </KeyboardAwareScrollView>

                <LoadingPage
                    isShow={loading}
                />

            </View>
        );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        //justifyContent: 'center',
        padding: 8,
    },
    uploadImageView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 100,
        borderColor: '#B5B5B5',
        borderWidth: 0.5,
        borderRadius: 6,
    },
    pickupImageView: {
        width: '30%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
        marginRight: 2,
        borderRadius: 6,
        //backgroundColor:'#1EACE0'
    },
    imageItem: {
        borderRadius: 8,
        width: '100%',
        height: '100%',

    },
    deleteImageView: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginTop: -6,
        marginRight: -4,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        position: 'absolute',
        backgroundColor: GlobalStyle.colour.errorColor,

    },
    inputInfoView: {
        flex: 1,
        marginTop: 4,
        justifyContent: 'center',
        borderColor: '#B5B5B5',
        borderWidth: 0.5,
        borderRadius: 6,
    },
    basicInput: {
        borderBottomWidth: 0.5,
        borderBottomColor: GlobalStyle.colour.grayColor,
        marginLeft:-8
    },
    inputStyle: {
        fontSize: 16,
        fontWeight: '400',
    },
    checkBoxView: {
        //flexDirection: 'row',
    },
    checkBoxItem: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems: 'center'
    },
    dropdownButton: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,
    },

    dropdownItem: {
        justifyContent: 'center',
        height: 40,
        ///backgroundColor:'yellow',
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,
    },
    dropdownList: {
        flex: 1,
        height: 150,
        backgroundColor: 'red'
    },
    buttonContainer: {
        paddingTop: 40,
        padding: 40,
    },
    bottomView: {
        height: 160,
        alignItems:'center'
    },
    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,

    },

    dropdownButtonTitle: {
        fontSize: 15,
        fontWeight: '400',

    },

    noteInput: {
        borderWidth: 0.5,
        borderColor: GlobalStyle.colour.grayColor,
        borderRadius:4,

    },
    selectionItem: {
        marginLeft:10,
        flexDirection:'row',
        alignItems:'center'
    },
    selectionTitleView: {
        flex:2,
    },
    selectionTitleText: {
        color: GlobalStyle.colour.grayColor3
    }



});

export default EditSellingPost;

