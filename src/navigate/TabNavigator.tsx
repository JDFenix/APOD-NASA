import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AuthStackNavigation from "@/src/feature/auth/Navigate/AuthStackNavigation";
import HomeStackNavigation from "@/src/feature/home/HomeStackNavigation";
import { TabNavigatorStackParamList } from "@/src/navigate/types/TabNavigator.type";
import { Ionicons } from "@expo/vector-icons"
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator<TabNavigatorStackParamList>();

export default function TabNavigator() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            initialRouteName="Auth"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: route.name === "Auth"
                    ? { display: "none" }
                    : [
                        tabStyles.tab,
                        {
                            left: scale(10),
                            right: scale(10),
                            bottom: Math.max(insets.bottom, verticalScale(8)),
                        },
                    ],
                tabBarLabelStyle: tabStyles.label,
            })}
        >
            <Tab.Screen
                name="Auth"
                component={AuthStackNavigation}
                options={{
                    tabBarButton: () => null,
                    tabBarItemStyle: { display: "none" },
                }}
            />


            <Tab.Screen name="Home" component={HomeStackNavigation} options={{
                title: "Inicio", tabBarIcon: () => (
                    <Ionicons name="home" color={"#b0afaf"} size={scale(20)} />
                )
            }} />

        </Tab.Navigator>
    )
}

const tabStyles = StyleSheet.create({
    tab: {
        position: "absolute",
        backgroundColor: "#223557",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderTopColor: "#D6DEE8",
        height: verticalScale(58),
        paddingTop: verticalScale(6),
    },

    label: {
        fontSize: moderateScale(15, 0.3),
        color: "#FFFFFF"
    }

})