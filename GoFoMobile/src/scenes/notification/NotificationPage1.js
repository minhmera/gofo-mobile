import React from 'react'
import {View, Text} from 'react-native'
//import {Text, FAB, List} from 'react-native-paper'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";

import {useGlobalDataContext, setCategories} from '../../contexts/globalDataContext'

function Notification1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    const { globalState, dispatch } = useGlobalDataContext();
    console.log('MERA  globalState ==>  ',globalState)
    return (
        <View>
            <Header titleText='Login'/>
            <Text>
                Product Page1  {t('welcome')}

            </Text>

            <Text>{globalState.categories.length}</Text>
        </View>
    )
}

export default Notification1
