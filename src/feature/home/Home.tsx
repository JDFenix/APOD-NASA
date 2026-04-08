import ScreenWrapper from "@/src/layout/UI/ScreenWrapper";
import TextCustom from "@/src/layout/TextCustom";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import useApod from "../apod/hook/useApod";
import ApodCard from "../apod/components/ApodCard";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../auth/hook/useAuth";
import useLogin from "../auth/hook/useLogin";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabNavigatorStackParamList } from "@/src/navigate/types/TabNavigator.type";

type HomeNavigationProp = BottomTabNavigationProp<TabNavigatorStackParamList, "Home">;

export default function Home() {
    const { logout } = useLogin();
    const { apod, getApod, loading, message, error } = useApod()
    const { fullName } = useAuth();
    const nav = useNavigation<HomeNavigationProp>();

    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 18));

    const [year, setYear] = useState<number>(2004);
    const [month, setMonth] = useState<number>(9);
    const [day, setDay] = useState<number>(18);

    useEffect(() => {
        const fetchApod = async () => {
            await getApod(year, month, day);
        }

        fetchApod()
    }, [year, month, day]);



    const onChangeDate = (_event: DateTimePickerEvent, date?: Date) => {
        setShowPicker(false);

        if (!date) return;

        setSelectedDate(date);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
    }

    const handleLogout = () => {
        logout();
        nav.navigate("Auth", { screen: "Login", params: {} });
    }


    return (
        <ScreenWrapper>
            <ScrollView style={{ marginHorizontal: scale(10) }}>

                <View style={styles.container}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: scale(10), marginBottom:verticalScale(10) }}>
                        <View style={{ flex: 1 }}>
                            <TextCustom type="Tittle" style={{ textAlign: "left", fontSize: moderateScale(20), marginBottom: 0 }}>Bienvenido</TextCustom>
                            <TextCustom>{fullName}</TextCustom>
                        </View>

                        <TouchableOpacity
                            onPress={handleLogout}
                            style={[styles.button, { minHeight: verticalScale(35), paddingHorizontal: scale(12), marginTop: 0,right:5 }]}
                        >
                            <Ionicons name="log-out-outline" size={moderateScale(19, 0.4)} color={"#07101E"} />
                            <TextCustom type="Button">Salir</TextCustom>
                        </TouchableOpacity>
                    </View>


                    <View style={styles.dateHeaderCard}>
                        <View style={styles.dateRow}>
                            <Ionicons name="today-outline" size={moderateScale(18, 0.4)} color={"#A9C8FF"} />
                            <TextCustom type="Label">Fecha seleccionada</TextCustom>
                        </View>

                        <TextCustom style={styles.dateValueText} type="Tittle">{`${day}/${month}/${year}`}</TextCustom>

                        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.button}>
                            <Ionicons name="calendar" size={moderateScale(18, 0.4)} color={"#07101E"} />
                            <TextCustom type="Button">Cambiar fecha</TextCustom>
                        </TouchableOpacity>
                    </View>


                    {showPicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            maximumDate={new Date()}
                            onChange={onChangeDate}
                        />
                    )}

                    {loading && (
                        <View style={{ minHeight: verticalScale(280), alignItems: "center", justifyContent: "center", gap: verticalScale(8) }}>
                            <ActivityIndicator color="#5DA9FF" size={moderateScale(22, 0.4)} />
                            <TextCustom type="Subtittle">Cargando APOD...</TextCustom>
                        </View>
                    )}

                    {!loading && apod && <ApodCard apod={apod} />}

                    {!loading && !apod && (
                        <View style={{ alignItems: "center", gap: verticalScale(6) }}>
                            <Ionicons name="information-circle-outline" size={moderateScale(17)} color="#EEF3FF" />
                            <TextCustom type={error ? "Error" : "Subtittle"}>{message ?? "No hay datos APOD para esa fecha."}</TextCustom>
                        </View>
                    )}
                </View>
            </ScrollView>
        </ScreenWrapper>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: verticalScale(10),
        marginTop: verticalScale(20),
    },
    dateHeaderCard: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#2A3F66",
        backgroundColor: "#111D33",
        paddingVertical: verticalScale(12),
        paddingHorizontal: scale(12),
        gap: verticalScale(8),
        marginBottom: verticalScale(6),
    },
    dateRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(6),
    },
    dateValueText: {
        textAlign: "left",
        marginTop: 0,
        marginBottom: 0,
        fontSize: moderateScale(24, 0.4),
        color: "#EAF2FF",
    },
    button: {
        minHeight: verticalScale(46),
        borderRadius: 10,
        flexDirection: "row",
        gap: scale(8),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5DA9FF",
        marginTop: verticalScale(2),
    },
})