import {createStackNavigator} from "react-navigation-stack";
import ProductPage1 from "../scenes/product/ProductPage1";
import ProductPage2 from "../scenes/product/ProductPage2";
import SellingProduct from "../scenes/product/SellingProduct";
import BuyingProduct from "../scenes/product/BuyingProduct";
import ProductDetail from "../scenes/product/ProductDetail";
import AuthStack from "./Auth";


const ProductStack = createStackNavigator(
    {
        ProductPage1: {
            screen: ProductPage1
        },
        SellingProduct: {
            screen: SellingProduct
        },
        BuyingProduct: {
            screen: BuyingProduct
        },
        ProductDetail: {
            screen: ProductDetail
        },
        ProductPage2: {
            screen: ProductPage2
        },
    },{
        headerMode: 'none'
    }
)


export default ProductStack;
