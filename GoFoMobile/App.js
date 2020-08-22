import React, {useEffect,useReducer, useState} from 'react'
import AppNavigator from './src/navigation'
import LocalizationProvider from './src/localization/LocalizationProvider';
import AuthProvider from './src/contexts/auth';
//import GlobalData from './src/contexts/globalDataContext';
import {GlobalDataProvider} from './src/contexts/globalDataContext';
import { StoreProvider } from './src/store'

export default function App() {


    return (
        <StoreProvider>

            <LocalizationProvider>
                <AuthProvider>

                        <GlobalDataProvider>
                            <AppNavigator/>
                        </GlobalDataProvider>


                </AuthProvider>
            </LocalizationProvider>


        </StoreProvider>
    );
}
