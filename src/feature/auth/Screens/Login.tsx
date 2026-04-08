import TextCustom from "@/src/layout/TextCustom";
import ScreenWrapper from "@/src/layout/UI/ScreenWrapper";
import { TabNavigatorStackParamList } from "@/src/navigate/types/TabNavigator.type";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import useLogin from "../hook/useLogin";

type LoginNavigationProp = BottomTabNavigationProp<TabNavigatorStackParamList, "Auth">

export default function Login() {

    const { setEmail, setPassword, email, password, login, loading, message, error } = useLogin()
    const [showPassword, setShowPassword] = useState(false);

    const nav = useNavigation<LoginNavigationProp>()

    const handleLogin = async () => {
        const res = await login();

        if (res === true) {
            nav.navigate("Home", { screen: "HomeScreen", params: {} });
        }
    }

    return (
        <ScreenWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={verticalScale(25)}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: verticalScale(20) }}
                >
                    
                    <View style={styles.backgroundGlowTop} />
                    <View style={styles.backgroundGlowBottom} />

                    <View style={{ marginTop: verticalScale(40), marginBottom: verticalScale(8) }}>
                        <TextCustom type="Tittle">NASA APOD</TextCustom>
                    </View>


                    <View style={styles.contentCenter}>
                        <View style={styles.container}>


                        <View style={{ marginBottom: verticalScale(30) }}>
                            <TextCustom type="Tittle">Iniciar Sesión</TextCustom>
                            <TextCustom type="Subtittle">Bienvenido a APOD, tu ventana diaria al universo. Inicia sesión para descubrir la imagen astronómica de hoy.</TextCustom>
                        </View>

                    <View style={styles.inputBlock}>
                        <TextCustom type="Label">Correo:</TextCustom>
                        <TextInput
                            onChangeText={(txt) => setEmail(txt)}
                            value={email}
                            placeholder="astronaut@nasa.mx"
                            placeholderTextColor="#7E8CA8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            returnKeyType="next"
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputBlock}>
                        <TextCustom type="Label">Contraseña:</TextCustom>
                        <View style={{position: "relative"}}>
                            <TextInput
                                onChangeText={(txt) => setPassword(txt)}
                                value={password}
                                placeholder="**********"
                                placeholderTextColor="#7E8CA8"
                                secureTextEntry={!showPassword}
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                                style={styles.input}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword((show) => !show)}
                                style={{ position: "absolute", right: scale(12), top: verticalScale(11), alignItems: "center", marginTop: verticalScale(5) }}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={moderateScale(19, 0.4)}
                                    color="#EEF3FF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


                        <View style={{ minHeight: verticalScale(30) }}>
                            {message && (
                                <TextCustom style={{ textAlign: "center" }} type={error ? "Error" : "Success"} >{message ?? ""}</TextCustom>
                            )}
                        </View>


                        <TouchableOpacity
                            disabled={loading ? true : false}
                            style={styles.button}
                            onPress={() => handleLogin()}
                        >
                            {loading ? (
                                <ActivityIndicator color={"#344C74"} size={moderateScale(13, 0.4)} />
                            ) : (
                                <TextCustom type="Button">Launch Dashboard</TextCustom>
                            )}
                        </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({

    contentCenter: {
        flex: 1,
        justifyContent: "flex-start",
        marginTop: verticalScale(6),
    },
    container: {
        justifyContent: "center",
        paddingHorizontal: scale(18),
        paddingVertical: verticalScale(24),
        backgroundColor: "#1B2B46",
        borderWidth: 1,
        borderColor: "#D6DEE8",
        borderRadius: 22,
        width: "100%",
        alignSelf: "center",
        maxHeight: verticalScale(410),
        overflow: "hidden",
    },
    inputBlock: {
        marginBottom: verticalScale(15),
    },

    input: {
        height: verticalScale(46),
        borderWidth: 1,
        borderColor: "#344C74",
        borderRadius: 12,
        backgroundColor: "#0F1A2F",
        color: "#EEF3FF",
        paddingHorizontal: scale(12),
        fontSize: moderateScale(14, 0.4),
    },

  
    button: {
        height: verticalScale(48),
        backgroundColor: "#5DA9FF",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: verticalScale(4),
    },

    backgroundGlowTop: {
        position: "absolute",
        top: verticalScale(-58),
        right: scale(-35),
        width: scale(170),
        height: scale(170),
        borderRadius: 999,
        backgroundColor: "rgba(93, 169, 255, 0.17)",
    },
    backgroundGlowBottom: {
        position: "absolute",
        bottom: verticalScale(100),
        left: scale(-45),
        width: scale(150),
        height: scale(150),
        borderRadius: 999,
        backgroundColor: "rgba(157, 118, 255, 0.11)",
    },
})