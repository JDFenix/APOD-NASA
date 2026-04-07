import { AuthStackParamList } from "@/src/feature/auth/types/AuthStack.types"
import { HomeStackParamList } from "@/src/feature/home/Home.types"
import { NavigatorScreenParams } from "@react-navigation/native"


export type TabNavigatorStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>,
    Home: NavigatorScreenParams<HomeStackParamList>

}