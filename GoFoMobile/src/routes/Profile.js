import {createStackNavigator} from "react-navigation-stack";
import ProfilePage1 from "../scenes/profile/ProfilePage1";
import SellingByUser from "../scenes/profile/SellingByUserPage";





const ProfileStack = createStackNavigator(
    {
        ProfilePage1: {
            screen: ProfilePage1

        },
        SellingByUser: {
            screen: SellingByUser
        },
    },{
        headerMode: 'none',
        initialRouteName: 'ProfilePage1',
    }
)

//SellingByUser


export default ProfileStack;
