import React from 'react'
import {View, Text} from 'react-native'
//import {Text, FAB, List} from 'react-native-paper'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";


function PostedPage2({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    return (
        <View>
            <Header titleText='Login'/>
            <Text>
                Product Page1  {t('welcome')}

            </Text>
            <View
                //style={AppStyle.tabBigButton}
                style = {
                    {
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        backgroundColor: '#F93963',
                        paddingTop: 15
                    }
                }
            >
            </View>
        </View>
    )
}

export default PostedPage2
