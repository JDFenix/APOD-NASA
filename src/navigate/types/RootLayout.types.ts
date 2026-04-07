import { NavigatorScreenParams } from "@react-navigation/native"
import { TabNavigatorStackParamList } from "@/src/navigate/types/TabNavigator.type"

export type RootLayoutStackParamList = {

    Main: NavigatorScreenParams<TabNavigatorStackParamList>

}