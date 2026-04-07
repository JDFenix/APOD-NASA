import { StyleSheet, Text, type TextStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface ITextCustom {
    children: string | number;
    style?: TextStyle
    type?: "Default" | "Tittle"
}

export default function TextCustom({ children, style, type = "Default" }: ITextCustom) {

    const styleSelected = styleText[type];

    return (
        <Text style={[styleSelected, style]}>{children}</Text>
    )

}


const styleText = StyleSheet.create({
    Tittle: {
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: moderateScale(23, 0.5),
        fontWeight: "normal"
    },

    Default: {
        color: "#FFFFFF",
        fontSize: moderateScale(15, 0.5),
        fontWeight: "normal"
    }
})