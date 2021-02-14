import {createBottomTabNavigator} from "react-navigation-tabs";
import {View} from "react-native";
import AppStyle from "../style/style";
import Icon from 'react-native-vector-icons/AntDesign'

import React from "react";

import ProductStack from './Product'
import PostedStack from './Posted'
import CreateNewPostStack from './CreateNewPost'
import NotificationStack from './Notification'
import ProfileStack from './Profile'
import GlobalStyle from "../style/GlobalStyle";



const TabStack = createBottomTabNavigator({
    Product: {
        screen: ProductStack,

        navigationOptions: () => ({
            title: 'Trang chủ',
            tabBarOptions: {
                activeTintColor: GlobalStyle.colour.primaryColor,
                inactiveTintColor: GlobalStyle.colour.inActiveColor,
            },
            tabBarIcon: ({tintColor}) =>
                <Icon
                    name='home'
                    size={24}
                    color={tintColor}
                />


        })

    },
    Posted: {
        screen: PostedStack,
        navigationOptions: () => ({
            title: 'Tin mới',
            tabBarOptions: {
                activeTintColor: GlobalStyle.colour.primaryColor,
                inactiveTintColor: GlobalStyle.colour.inActiveColor,
            },
            tabBarIcon: ({tintColor}) =>
                <Icon
                    name='form'
                    size={24}
                    color={tintColor}
                />
        })
    },
    CreateNewPost: {
        screen: CreateNewPostStack,
        navigationOptions: () => ({
            title: '',
            tabBarIcon: ({tintColor}) =>

                    <View
                        style={AppStyle.tabBigButtonWrapper}
                    >
                        <View style={AppStyle.tabBigButton}>
                            <Icon
                                name='plus'
                                size={36}
                                color={'white'}
                            />
                        </View>


                    </View>

        })
    },
    Notification: {
        screen: NotificationStack,
        navigationOptions: () => ({
            title: 'Tìm kiếm',
            tabBarOptions: {
                activeTintColor: GlobalStyle.colour.primaryColor,
                inactiveTintColor: GlobalStyle.colour.inActiveColor,
            },
            tabBarIcon: ({tintColor}) =>
                <Icon
                    name='search1'
                    size={24}
                    color={tintColor}
                />
        })
    },

    Profile: {
        screen: ProfileStack,
        navigationOptions: () => ({
            title: 'Cá nhân',
            tabBarOptions: {
                activeTintColor: GlobalStyle.colour.primaryColor,
                inactiveTintColor: GlobalStyle.colour.inActiveColor,
            },
            tabBarIcon: ({tintColor}) =>
                <Icon
                    name='user'
                    size={24}
                    color={tintColor}

                />
        })
    },

    // Profile: {
    //     screen: ProfileStack,
    //     tabBarOptions: {
    //         activeTintColor: AppStyles.colour.primaryColor,
    //         inactiveTintColor: AppStyles.colour.inActiveColor,
    //     },
    //     navigationOptions: () => ({
    //         title: 'Profile',
    //         tabBarIcon: ({tintColor}) =>
    //             <Icon
    //                 name='user'
    //                 size={30}
    //                 color={tintColor}
    //             />
    //     })
    // },

});

export default TabStack;
