import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
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
            <TouchableOpacity
                //style={AppStyle.tabBigButton}
                style = {
                    {
                        marginTop:30,
                        marginLeft:130,
                        height: 80,
                        width: 80,
                        borderRadius: 100,
                        backgroundColor: '#F93963',
                    }
                }


            >
            </TouchableOpacity>
        </View>
    )
}

export default PostedPage1
