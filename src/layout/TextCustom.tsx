import { ReactNode } from "react";
import { StyleSheet, Text, type TextStyle } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

interface ITextCustom {
    children: ReactNode;
    style?: TextStyle;
    type?: "Default" | "Tittle" | "Button" | "Success" | "Error" | "Label" | "Subtittle";
}

export default function TextCustom({ children, style, type = "Default" }: ITextCustom) {

    const styleSelected = styleText[type];

    return (
        <Text style={[styleSelected, style]}>{children}</Text>
    )

}


const styleText = StyleSheet.create({
    Tittle: {
        color: "#8FB8FF",
        textAlign: "center",
        fontSize: moderateScale(25, 0.5),
        fontWeight: "900",
        marginBottom: verticalScale(10),
        marginTop: verticalScale(10)
    },

    Subtittle: {
        color: "#b5b5b6",
        textAlign: "center",
        fontSize: moderateScale(13, 0.5),
        fontWeight: "500",
        marginTop: verticalScale(8)
    },

    Label: {
        marginBottom: verticalScale(7),
        color: "#DDE6F6",
        fontSize: moderateScale(13, 0.4),
        fontWeight: "600",
    },

    Default: {
        color: "#FFFFFF",
        fontSize: moderateScale(15, 0.5),
        fontWeight: "normal"
    },
    Error: {
        color: "#f22a2a",
        fontSize: moderateScale(15, 0.5),
        fontWeight: "normal"
    },
    Success: {
        color: "#72e738",
        fontSize: moderateScale(15, 0.5),
        fontWeight: "normal"
    },
    Button: {
        color: "#07101E",
        fontSize: moderateScale(15, 0.4),
        fontWeight: "700",
    }
})