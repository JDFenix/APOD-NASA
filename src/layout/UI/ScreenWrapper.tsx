import { ReactNode } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

interface IScreenWrapper {
    children: ReactNode
}

export default function ScreenWrapper({ children }: IScreenWrapper) {

    return (
        <SafeAreaView edges={["bottom", "top"]} style={styles.safeArea}>
            <View style={styles.container}>
                {children}
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0A1120",
    },
    container: {
        flex: 1,
        backgroundColor: "#0A1120",
    },
})