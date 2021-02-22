import {createStackNavigator} from "react-navigation-stack";
import ProfilePage1 from "../scenes/profile/ProfilePage1";
import SellingByUser from "../scenes/profile/SellingByUserPage";
import BuyingByUser from "../scenes/profile/BuyingByUserPage";
import EditSellingPost from "../scenes/profile/EditSellingPost";
import EditUserInfo from "../scenes/profile/EditUserInfo";
import ChangePassword from "../scenes/profile/ChangePassword";





const ProfileStack = createStackNavigator(
    {
        ProfilePage1: {
            screen: ProfilePage1

        },
        SellingByUser: {
            screen: SellingByUser
        },
        BuyingByUser: {
            screen: BuyingByUser
        },
        EditSellingPost: {
            screen: EditSellingPost
        },
        EditUserInfo: {
            screen: EditUserInfo
        },
        ChangePassword: {
            screen: ChangePassword
        }
    },{
        headerMode: 'none',
        initialRouteName: 'ProfilePage1',
    }
)

//SellingByUser


export default ProfileStack;
