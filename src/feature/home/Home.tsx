import ScreenWrapper from "@/src/layout/UI/ScreenWrapper";
import TextCustom from "@/src/layout/TextCustom";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import useApod from "../apod/hook/useApod";
import ApodCard from "../apod/components/ApodCard";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
    const { apod, getApod, loading, message, error } = useApod()

    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(2025, 8, 18));

    const [year, setYear] = useState<number>(2025);
    const [month, setMonth] = useState<number>(9);
    const [day, setDay] = useState<number>(18);

    useEffect(() => {
        const fetchApod = async () => {
            await getApod(year, month, day)
        }

        fetchApod()
    }, [year, month, day])



    const onChangeDate = (_event: DateTimePickerEvent, date?: Date) => {
        setShowPicker(false);

        if (!date) return;

        setSelectedDate(date);
        setYear(date.getFullYear());
        setMonth(date.getMonth() + 1);
        setDay(date.getDate());
    }


    return (
        <ScreenWrapper>
            <View style={styles.container}>
                <TextCustom type="Subtittle">{`Fecha: ${day}/${month}/${year}`}</TextCustom>

                <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.button}>
                    <Ionicons name="calendar" size={moderateScale(18, 0.4)} color={"#07101E"} />
                    <TextCustom type="Button">Seleccionar fecha</TextCustom>
                </TouchableOpacity>


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
                    <View style={{ alignItems: "center", justifyContent: "center", gap: verticalScale(6) }}>
                        <ActivityIndicator color="#5DA9FF" />
                        <TextCustom>Cargando APOD</TextCustom>
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

        </ScreenWrapper>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: verticalScale(10),
        marginTop: verticalScale(20),
    },
    button: {
        minHeight: verticalScale(44),
        borderRadius: 10,
        flexDirection: "row",
        gap: scale(8),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5DA9FF",
    },
})