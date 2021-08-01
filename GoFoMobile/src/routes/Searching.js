import {createStackNavigator} from "react-navigation-stack";
import SearchPage from "../scenes/search/SearchPage";
import SearchResultPage from "../scenes/search/SearchResultPage";
import SellingByUserPage from "../scenes/search/SellingByUserPage";
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
        SellingByUserPage: {
            screen: SellingByUserPage
        },

    },{
        headerMode: 'none'
    }
)


export default SearchingStack;
