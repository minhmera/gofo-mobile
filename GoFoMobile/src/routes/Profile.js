import {createStackNavigator} from "react-navigation-stack";
import ProfilePage1 from "../scenes/profile/ProfilePage1";
import ProfilePage2 from "../scenes/profile/ProfilePage2";





const ProfileStack = createStackNavigator(
    {
        ProfilePage1: {
            screen: ProfilePage1

        },
        ProfilePage2: {
            screen: ProfilePage2
        },
    },{
        headerMode: 'none',
        initialRouteName: 'ProfilePage1',
    }
)



export default ProfileStack;
