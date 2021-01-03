import React, {useEffect,useReducer, useState} from 'react'
import AppNavigator from './src/navigation'
import LocalizationProvider from './src/localization/LocalizationProvider';
import AuthProvider from './src/contexts/auth';
//import GlobalData from './src/contexts/globalDataContext';
import {GlobalDataProvider} from './src/contexts/globalDataContext';
import { StoreProvider } from './src/store'
import {StatusBar} from 'react-native';
//'default' | 'light-content' | 'dark-content';
export default function App() {


    return (
        <StoreProvider>

            <LocalizationProvider>
                <AuthProvider>

                        <GlobalDataProvider>
                            <StatusBar backgroundColor="blue" barStyle={'light-content'} />
                            <AppNavigator/>
                        </GlobalDataProvider>

                </AuthProvider>
            </LocalizationProvider>


        </StoreProvider>
    );
}
