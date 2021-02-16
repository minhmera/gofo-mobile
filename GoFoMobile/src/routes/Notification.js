import {createStackNavigator} from "react-navigation-stack";
import SearchPage from "../scenes/search/SearchPage";
import SearchResultPage from "../scenes/search/SearchResultPage";
import AuthStack from "./Auth";
import ProductDetail from "../scenes/product/ProductDetail";


const NotificationStack = createStackNavigator(
    {
        SearchPage: {
            screen: SearchPage
        },
        SearchResultPage: {
            screen: SearchResultPage
        },
        ProductDetail: {
            screen: ProductDetail
        },

    },{
        headerMode: 'none'
    }
)


export default NotificationStack;
