import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import Header from '../../components/Header'
import LocalizationContext from "../../localization/LocalizationContext";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import GlobalStyle from '../../style/GlobalStyle';
import AppStyle from '../../style/style';
import {backgroundColor} from "react-native-calendars/src/style";







function PostedPage1({navigation}) {
    const {t, i18n} = React.useContext(LocalizationContext);
    // For single select SegmentedControlTab
    const [selectedIndex, setSelectedIndex] = useState(0);
    // For multi select SegmentedControlTab
    const [selectedIndices, setSelectedIndices] = useState([0]);
    // For custom SegmentedControlTab
    const [customStyleIndex, setCustomStyleIndex] = useState(0);

    const handleSingleIndexSelect = (index) => {
        // For single Tab Selection SegmentedControlTab
        setSelectedIndex(index);
    };

    const handleMultipleIndexSelect = (index) => {
        // For multi Tab Selection SegmentedControlTab
        if (selectedIndices.includes(index)) {
            console.log(selectedIndices.filter((i) => i !== index));
            //if included in the selected array then remove
            setSelectedIndices(selectedIndices.filter((i) => i !== index));
        } else {
            //if not included in the selected array then add
            setSelectedIndices([...selectedIndices, index]);
        }
    };

    const handleCustomIndexSelect = (index) => {
        //handle tab selection for custom Tab Selection SegmentedControlTab
        setCustomStyleIndex(index);
    };

    function renderBuyingApp() {
        return (
            <View>
                <Text>
                    Mua
                </Text>

            </View>
        )
    }

    function renderSellingApp() {
        return (
            <View>
                <Text>
                    Bán
                </Text>
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>
            <Header titleText='Sản phẩm' />
            <View style={styles.container}>

                {/* Simple Segmented with Custom Styling*/}
                <SegmentedControlTab
                    values={['Bán', 'Mua']}
                    selectedIndex={customStyleIndex}
                    onTabPress={handleCustomIndexSelect}
                    borderRadius={0}
                    tabsContainerStyle={{height: 40, backgroundColor: '#F2F2F2'}}
                    tabStyle={{
                        backgroundColor: GlobalStyle.colour.primaryColor,
                        borderWidth: 0,
                        borderColor: 'transparent',
                    }}
                    activeTabStyle={{
                        backgroundColor:GlobalStyle.colour.primaryColor,
                        borderBottomColor:'white',
                        borderBottomWidth:2
                    }}
                    tabTextStyle={{color: 'white', fontWeight: 'bold'}}
                    activeTabTextStyle={{color: 'white'}}
                />
                {customStyleIndex === 0 && (
                    renderSellingApp()

                )}
                {customStyleIndex === 1 && (
                    renderBuyingApp()
                )}
            </View>
        </View>
    )
}

export default PostedPage1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        //padding: 10,
    },
    headerText: {
        padding: 8,
        fontSize: 14,
        color: '#444444',
        textAlign: 'center',
    },
    tabContent: {
        color: '#444444',
        fontSize: 24,
        margin: 24,
    },
    seperator: {
        marginHorizontal: -10,
        alignSelf: 'stretch',
        borderTopWidth: 1,
        borderTopColor: '#888888',
        marginTop: 24,
    },
    tabStyle: {
        //borderColor: '#D52C43',

    },
    activeTabStyle: {
        //backgroundColor: '#D52C43',
    },
});


//PostedPage1    {t('welcome')}