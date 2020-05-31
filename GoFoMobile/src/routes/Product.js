import {createStackNavigator} from "react-navigation-stack";
import ProductPage1 from "../scenes/product/ProductPage1";
import ProductPage2 from "../scenes/product/ProductPage2";
import AuthStack from "./Auth";


const ProductStack = createStackNavigator(
    {
        ProductPage1: {
            screen: ProductPage1
        },
        ProductPage2: {
            screen: ProductPage2
        },
    },{
        headerMode: 'none'
    }
)


export default ProductStack;
