import {createStackNavigator} from "react-navigation-stack";
import PostedPage1 from "../scenes/posted/PostedPage1";
import PostedPage2 from "../scenes/posted/PostedPage2";


const PostedStack = createStackNavigator(
    {
        PostedPage1: {
            screen: PostedPage1

        },
        PostedPage2: {
            screen: PostedPage2
        },
    },{
        headerMode: 'none'
    }
)



export default PostedStack;
