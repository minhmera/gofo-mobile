import {createStackNavigator} from "react-navigation-stack";
import SearchPage from "../scenes/notification/SearchPage";
import ProductPage2 from "../scenes/product/ProductPage2";
import AuthStack from "./Auth";


const NotificationStack = createStackNavigator(
    {
        NotificationPage1: {
            screen: SearchPage
        }

    },{
        headerMode: 'none'
    }
)


export default NotificationStack;
