import {createStackNavigator} from "react-navigation-stack";
import SearchPage from "../scenes/search/SearchPage";
import SearchResultPage from "../scenes/search/SearchResultPage";
import SellingByUser from "../scenes/search/SellingByUser";
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
        SellingByUser: {
            screen: SellingByUser
        },

    },{
        headerMode: 'none'
    }
)


export default SearchingStack;
