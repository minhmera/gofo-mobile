import {createStackNavigator} from "react-navigation-stack";
import ProfilePage1 from "../scenes/profile/ProfilePage1";
import ProfilePage2 from "../scenes/profile/ProfilePage2";
import ProductStack from "./Product";


const ProfileStack = createStackNavigator(
    {
        ProfilePage1: {
            screen: ProfilePage1

        },
        ProfilePage2: {
            screen: ProfilePage2
        },
    },{
        headerMode: 'none'
    }
)



export default ProfileStack;
