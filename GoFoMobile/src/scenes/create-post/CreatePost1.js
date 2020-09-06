import React, {useEffect, useState, useCallback,useReducer} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet, Alert,
} from 'react-native';
import {Input, CheckBox, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from '../../components/Header';
import AppStyle from '../../style/style';
import GlobalStyle from '../../style/GlobalStyle';
import * as api from '../../services/products';
import LocalizationContext from '../../localization/LocalizationContext';
import ModelList from '../../components/ModelList'
import ModelCalendar from '../../components/ModelCalendar'
import {ProductCertifications} from '../../config/AppConfig'
import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'



function renderImage(images) {
    //let arrImages = ['a','b','c']

    return images.map((item, index) => {
        console.log('index ', index, 'item11 ', item.path);
        return (
            <View
                style={styles.pickupImageView}
                key={index}
            >
                <Image
                    style={styles.imageItem}
                    source={{uri: item.path}}
                />


            </View>
        );
    });

}

function dropdownButton(title,onPress) {
    return  (
        <TouchableOpacity
            style={styles.dropdownButton}
            activeOpacity={1}
            //onPress={()=> setShowCityDropdown(true)}
            onPress={()=> onPress()}
        >
            <View style={{flex:4}}>
                <Text style={styles.dropdownButtonTitle}>
                    {title}
                </Text>
            </View>
            <View style={{flex:1,alignItems:'flex-end', marginRight:4}}>
                <Icon
                    name='right'
                    size={20}
                    color={'black'}
                />
            </View>

        </TouchableOpacity>
    )
}

//Product Page1  {t('welcome')}
function CreatePost1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);

    const { globalState, dispatch } = useGlobalDataContext();

    let [images, setImages] = useState(null);
    let [isSell, setSellStatus] = useState(true);

    const [cities, setCities] = useState({});
    const [districts, setDistricts] = useState({});
    const [locations, setLocations] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    let [isShowCityDropdown, setShowCityDropdown] = useState(false);
    let [isShowDistrictDropdown, setShowDistrictDropdown] = useState(false);

    let [isShowCategoryDropdown, setShowCategoryDropdown] = useState(false);

    let [isShowCropTimeCalendar, setShowCropTimeCalendar ] = useState(false);
    let [isShowCertification, setShowCertification ] = useState(false);

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const [selectedCategory, setSelectedCategory] = useState('');

    const [selectedCropTimeDate, setSelectedCropTimeDate ] = useState("");
    const [selectedCertification, setSelectedCertification ] = useState("");


    async function uploadProduct() {
        try {
            let response = await api.uploadImages(images);
            console.log('uploadImage response ==> ', response);
        } catch (e) {
            console.log('Error ', e);
        }
    }

    async function onSubmit() {
        let sellingObj = {
            "categoryId":1,
            "productName":"Chôm chôm",
            "provinceId":1,
            "districtId":8,
            "cropDay": "2020-12-28",
            "productCertification": "Viet GAP",
            "sellerPhone": "0976999864"
        }

        try {
            let response = await api.sellingPost(sellingObj);
            console.log('MERA  sellingPost   ', response);
            setLoading(false);
            Alert.alert(
                'Registration Successful',
                response.message,

                [
                    {text: 'OK'}, //  {text: 'OK', onPress: () => navigation.replace("Login")}
                ],
                {cancelable: false},
            );
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    async function selectFile() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: true,
        }).then(images => {
            console.log('selectFile  ==> ', images);
            setImages(images);
        });
    }

    async function fetchData() {
        //setLoading(true);
        console.log('MERA fetchData   selectedCity:  ==>  ',selectedCity)
        try {
            let response = await api.getLocation();
            let cities = []
            if (response.result) {
                let locations = response.result
                setLocations(locations)
                locations.map((item,index)=> {
                    cities.push(item.name)
                })
                setCities(cities)
            }
            //setCities(response.result)
            console.log(' getLocation1 =====>  ',cities.length)
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function cityCategoryCallBack(category) {
        setSelectedCategory(category.title_vi)
        setShowCategoryDropdown(false)

    }

    function cityDropDownCallBack(cityName) {

        setSelectedCity(cityName)
        setSelectedDistrict('')
        let index = locations.findIndex(x => x.name === cityName)
        let districtObject  = locations[index].districts
        let districtList = []
        districtObject.map((item,index) => {
            districtList.push(item.name)
        })
        setDistricts(districtList)
        setShowCityDropdown(false)

    }

    function districtDropDownCallBack(district) {
        setSelectedDistrict(district)
        setShowDistrictDropdown(false)
    }

    function cropTimeCalendarCallBack(day) {
        console.log('cropTimeCalendarCallBack ==> ',day)
        setSelectedCropTimeDate(day.dateString)
        setShowCropTimeCalendar(false)
    }

    function certificationCallBack(certification) {
        setSelectedCertification(certification)
        setShowCertification(false)
    }

    return (
        <View style={styles.container}>
            <Header titleText='Create Post'/>
            <KeyboardAwareScrollView style={{flex: 1}} keyboardDismissMode = {'on-drag'}>


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
                        <View style={styles.checkBoxView}>
                            <View style={[styles.checkBoxItem,{marginLeft:0}]}>

                                <CheckBox
                                    size={28}
                                    checked={isSell}
                                    checkedColor={GlobalStyle.colour.primaryColor}
                                    onPress={()=> setSellStatus(true)}
                                    //onPress={()=> console.log('MERA globalCategory  ',globalCategory)}

                                />
                                <Text>
                                    Rao bán
                                </Text>
                            </View>
                            <View style={[styles.checkBoxItem,{marginLeft:0}]}>

                                <CheckBox
                                    size={28}
                                    checked={!isSell}
                                    checkedColor={GlobalStyle.colour.primaryColor}
                                    onPress={()=> setSellStatus(false)}
                                />
                                <Text>
                                    Rao mua
                                </Text>
                            </View>

                        </View>


                        {dropdownButton(selectedCategory === "" ?  "Phân loại sản phẩm" : selectedCategory,()=> setShowCategoryDropdown(true))}

                        <Input
                            inputStyle={styles.inputStyle}
                            placeholder='Tên sản phẩm '
                            inputContainerStyle={styles.basicInput}
                        />

                        {dropdownButton(selectedCity === "" ?  "Choose city" : selectedCity,()=> setShowCityDropdown(true))}

                        {dropdownButton(selectedDistrict === "" ? "Choose district": selectedDistrict,()=> setShowDistrictDropdown(true))}

                        <ModelList
                            isVisible = {isShowCategoryDropdown}
                            title = {'Choose Category'}
                            style = {{height:300}}
                            items = {globalState.categories}
                            customField = {'title_vi'}
                            customItemId = {'_id'}
                            callBack = {(item)=> cityCategoryCallBack(item)}
                        />

                        <ModelList
                            isVisible = {isShowCityDropdown}
                            title = {'Choose Your City'}
                            items = {cities}
                            callBack = {(item)=> cityDropDownCallBack(item)}
                        />

                        <ModelList
                            isVisible = {isShowDistrictDropdown}
                            title = {'Choose Your District'}
                            items = {districts}
                            callBack = {(item)=> districtDropDownCallBack(item)}
                        />

                        <ModelCalendar
                            isVisible = {isShowCropTimeCalendar}
                            title = {'Select a Crop Day'}
                            style = {{height:460}}
                            items = {districts}
                            callBack = {(day)=> cropTimeCalendarCallBack(day)}
                        />

                        <ModelList
                            isVisible = {isShowCertification}
                            title = {'Chọn tiêu chuẩn'}
                            style = {{height:180}}
                            items = {ProductCertifications}
                            callBack = {(item)=> certificationCallBack(item)}
                        />

                        {isSell == true ?

                            dropdownButton(selectedCropTimeDate === "" ? "Thời gian thu hoạch": selectedCropTimeDate,()=> setShowCropTimeCalendar(true)) : null

                        }
                        {/*{isSell == true ?
                            <Input
                                inputStyle={styles.inputStyle}
                                placeholder='Sản lượng'
                                inputContainerStyle={styles.basicInput}
                            /> : null
                        }*/}
                        {dropdownButton(selectedCertification === "" ? "Tiêu chuẩn": selectedCertification,()=> setShowCertification(true))}

                        <Input
                            inputStyle={styles.inputStyle}
                            placeholder="Số điện thoại"
                            inputContainerStyle={styles.basicInput}
                            //secureTextEntry={true}
                        />
                        <View style={styles.bottomView}>
                            <Button
                                title="Upload Product"
                                onPress={()=> uploadProduct()}
                                buttonStyle={[AppStyle.commonButton, styles.submitButton,]} //submitButton
                                containerStyle={styles.buttonContainer}
                            />
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>
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
        backgroundColor: 'red',

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
        borderBottomColor: '#B5B5B5',
    },
    inputStyle: {
        fontSize:16 ,
        fontWeight:'400',
    },
    checkBoxView: {
        //flexDirection: 'row',
    },
    checkBoxItem: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'center',
        alignItems:'center'
    },
    dropdownButton: {
        height:50,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'center',

        marginLeft: 10,
        marginRight: 10,
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 1,
    },

    dropdownItem: {
        justifyContent:'center',
        height:40,
        ///backgroundColor:'yellow',
        borderBottomColor: GlobalStyle.colour.grayColor,
        borderBottomWidth: 0.5,
    },
    dropdownList: {
        flex:1,
        height:150,
        backgroundColor:'red'
    },
    buttonContainer: {
        paddingTop: 40,
        padding: 40,
    },
    bottomView: {
        height: 120,
    },
    submitButton: {
        backgroundColor: GlobalStyle.colour.primaryColor,

    },

    dropdownButtonTitle: {
        //color:'black',//GlobalStyle.colour.grayColor,
        fontSize: 15,
        fontWeight: '500',

        //fontFamily:'Nunito-Regular'

    },








});

export default CreatePost1;

