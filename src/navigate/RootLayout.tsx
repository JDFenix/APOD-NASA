import { createNativeStackNavigator } from "@react-navigation/native-stack"
import TabNavigator from "@src/navigate/TabNavigator";
import { RootLayoutStackParamList } from "@/src/navigate/types/RootLayout.types";

const Stack = createNativeStackNavigator<RootLayoutStackParamList>();

export default function RootLayout() {
    return (
        <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false, animation: "slide_from_bottom", animationDuration: 300 }}>
            <Stack.Screen name="Main" component={TabNavigator} />
        </Stack.Navigator>
    )
}