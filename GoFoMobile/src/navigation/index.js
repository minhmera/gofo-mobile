import {View, Text} from 'react-native'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import AuthStack from '../routes/Auth'
import AppStack from '../routes/MainStack'
import AuthLoading from "../scenes/auth/AuthLoading";
import React from "react";



const MainNavigator = createSwitchNavigator(
    {
        Loading: AuthLoading,
        Auth: AuthStack,
        App: AppStack,

    },
    {
        initialRouteName: 'Loading',
    }
);


export default createAppContainer(MainNavigator);
