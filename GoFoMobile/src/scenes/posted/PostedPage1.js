import React from 'react'
import {View, Text} from 'react-native'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";


function PostedPage1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    return (
        <View>
            <Header titleText='Login'/>
            <Text>
                PostedPage1    {t('welcome')}

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

export default PostedPage1
