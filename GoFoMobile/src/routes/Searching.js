import {createStackNavigator} from "react-navigation-stack";
import SearchPage from "../scenes/search/SearchPage";
import SearchResultPage from "../scenes/search/SearchResultPage";
import AuthStack from "./Auth";
import ProductDetail from "../scenes/product/ProductDetail";


const SearchingStack = createStackNavigator(
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


export default SearchingStack;
