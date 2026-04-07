import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AuthStackNavigation from "@/src/feature/auth/Navigate/AuthStackNavigation";
import HomeStackNavigation from "@/src/feature/home/HomeStackNavigation";
import { TabNavigatorStackParamList } from "@/src/navigate/types/TabNavigator.type";

const Tab = createBottomTabNavigator<TabNavigatorStackParamList>();

export default function TabNavigator() {

    return (
        <Tab.Navigator initialRouteName="Auth">
            <Tab.Screen name="Auth" component={AuthStackNavigation} />
            <Tab.Screen name="Home" component={HomeStackNavigation} />

        </Tab.Navigator>
    )

}