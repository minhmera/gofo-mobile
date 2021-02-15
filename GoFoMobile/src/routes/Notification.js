import {createStackNavigator} from "react-navigation-stack";
import SearchPage from "../scenes/search/SearchPage";
import SearchResultPage from "../scenes/search/SearchResultPage";
import AuthStack from "./Auth";


const NotificationStack = createStackNavigator(
    {
        SearchPage: {
            screen: SearchPage
        },
        SearchResultPage: {
            screen: SearchResultPage
        }

    },{
        headerMode: 'none'
    }
)


export default NotificationStack;
