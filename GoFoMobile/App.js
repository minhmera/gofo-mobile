import React, {useEffect,useReducer, useState} from 'react'
import AppNavigator from './src/navigation'
import LocalizationProvider from './src/localization/LocalizationProvider';
import AuthProvider from './src/contexts/auth';
//import GlobalData from './src/contexts/globalDataContext';
import {GlobalDataProvider} from './src/contexts/globalDataContext';
import { StoreProvider } from './src/store'
import {StatusBar, Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';



export default function App() {

    useEffect(() => {
        {
            if (Platform.OS === 'android') {
                SplashScreen.hide()
            }


        }
    }, []);
    return (
        <StoreProvider>

            <LocalizationProvider>
                <AuthProvider>

                        <GlobalDataProvider>
                            <StatusBar backgroundColor="#1EACE0" barStyle={'light-content'} />
                            <AppNavigator/>
                        </GlobalDataProvider>

                </AuthProvider>
            </LocalizationProvider>


        </StoreProvider>
    );
}
