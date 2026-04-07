import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { HomeStackParamList } from "@/src/feature/home/Home.types"
import Home from "@/src/feature/home/Home"

const Stack = createNativeStackNavigator<HomeStackParamList>()

export default function HomeStackNavigation() {

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    )

}