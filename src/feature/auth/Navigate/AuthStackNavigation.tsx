import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Login from "@/src/feature/auth/Screens/Login"
import {AuthStackParamList} from "@/src/feature/auth/types/AuthStack.types"

const Stack = createNativeStackNavigator<AuthStackParamList>()

export default function AuthStackNavigation() {

    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />


        </Stack.Navigator>
    )

}