import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Login from "../feature/auth/Login";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    return (
        <Tab.Navigator initialRouteName="Login">
            <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
    )

}