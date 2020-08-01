import React, {useEffect, useState} from 'react'
import {Provider as PaperProvider} from 'react-native-paper'
import AppNavigator from './src/navigation'
//import {Provider as StoreProvider} from 'react-redux'
import store from './src/reducers/store'
import LocalizationProvider from './src/localization/LocalizationProvider';
import AuthProvider from './src/providers/auth';
import { StoreProvider } from './src/store'
import initialState from "./src/store/initialState"
import reducers from './src/reducers/index'

export default function App() {
  return (
      <StoreProvider initialState={null} reducer={reducers}>
       {/*<StoreProvider store={store}>*/}
       {/* <PaperProvider>*/}
          <LocalizationProvider>
            <AuthProvider>
              <AppNavigator/>
            </AuthProvider>
          </LocalizationProvider>
       {/* </PaperProvider>*/}
       {/*</StoreProvider>*/}

      </StoreProvider>
  )
}
