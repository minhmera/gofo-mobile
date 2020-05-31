import {createStackNavigator} from "react-navigation-stack";
import NotificationPage1 from "../scenes/notification/NotificationPage1";
import ProductPage2 from "../scenes/product/ProductPage2";
import AuthStack from "./Auth";


const NotificationStack = createStackNavigator(
    {
        NotificationPage1: {
            screen: NotificationPage1
        }

    },{
        headerMode: 'none'
    }
)


export default NotificationStack;
