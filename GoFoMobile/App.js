import React, {useEffect, useState} from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import AppNavigator from './src/navigation'
import {Provider as StoreProvider} from 'react-redux'
import store from './src/reducers/store'
import LocalizationProvider from './src/localization/LocalizationProvider';
import AuthProvider from './src/providers/auth';

export default function App() {
  return (
      <StoreProvider store={store}>
        <PaperProvider>
          <LocalizationProvider>
            <AuthProvider>
              <AppNavigator/>
            </AuthProvider>
          </LocalizationProvider>
        </PaperProvider>
      </StoreProvider>
  )
}
