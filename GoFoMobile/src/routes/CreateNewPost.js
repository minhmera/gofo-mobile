import {createStackNavigator} from "react-navigation-stack";
import CreatePost1 from "../scenes/create-post/CreatePost1";
import ProductStack from "./Product";


const CreatePostStack = createStackNavigator(
    {
        CreatePost1: {
            screen: CreatePost1

        }
    },{
        headerMode: 'none'
    }
)



export default CreatePostStack;
