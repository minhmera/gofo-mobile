import {createSwitchNavigator} from "react-navigation";
import AuthStack from "./Auth";
import {createStackNavigator} from "react-navigation-stack";
import  TabStack from './TabStack'

const AppStack = createStackNavigator(
    {
        MainTabs: {
            screen: TabStack,
            navigationOptions: {
                headerShown: false,
            },
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                //Add something
            },
        },
    }
);



export default AppStack;
