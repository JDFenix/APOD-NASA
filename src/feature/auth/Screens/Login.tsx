import TextCustom from "@/src/layout/TextCustom";
import ScreenWrapper from "@/src/layout/UI/ScreenWrapper";
import { TabNavigatorStackParamList } from "@/src/navigate/types/TabNavigator.type";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

type LoginNavigationProp = BottomTabNavigationProp<TabNavigatorStackParamList, "Auth">

export default function Login() {

    const nav = useNavigation<LoginNavigationProp>()

    return (
        <ScreenWrapper>
            <TextCustom type="Tittle" >Iniciar Sesión</TextCustom>

            <TouchableOpacity onPress={() => nav.navigate("Home", { screen: "HomeScreen", params: {} })}>
              <TextCustom>Iniciar sesión</TextCustom>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}