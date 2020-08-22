import React, {useEffect,useReducer, useState} from 'react'
import AppNavigator from './src/navigation'
import LocalizationProvider from './src/localization/LocalizationProvider';
import AuthProvider from './src/providers/auth';
import { StoreProvider } from './src/store'

export default function App() {


  return (
      <StoreProvider >

          <LocalizationProvider>
            <AuthProvider>


              <AppNavigator/>



            </AuthProvider>
          </LocalizationProvider>


      </StoreProvider>
  )
}
