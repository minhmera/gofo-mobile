import {createStackNavigator} from "react-navigation-stack";
import PostedPage1 from "../scenes/posted/PostedPage1";
import PostedPage2 from "../scenes/posted/PostedPage2";
import ProductDetail from "../scenes/product/ProductDetail";


const PostedStack = createStackNavigator(
    {
        PostedPage1: {
            screen: PostedPage1

        },
        ProductDetail: {
            screen: ProductDetail
        },
        PostedPage2: {
            screen: PostedPage2
        },

    },{
        headerMode: 'none'
    }
)



export default PostedStack;
