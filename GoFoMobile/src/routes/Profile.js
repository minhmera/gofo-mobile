import {createStackNavigator} from "react-navigation-stack";
import ProfilePage1 from "../scenes/profile/ProfilePage1";
import SellingByUser from "../scenes/profile/SellingByUserPage";
import EditSellingPost from "../scenes/profile/EditSellingPost";





const ProfileStack = createStackNavigator(
    {
        ProfilePage1: {
            screen: ProfilePage1

        },
        SellingByUser: {
            screen: SellingByUser
        },
        EditSellingPost: {
            screen: EditSellingPost
        },
    },{
        headerMode: 'none',
        initialRouteName: 'ProfilePage1',
    }
)

//SellingByUser


export default ProfileStack;
