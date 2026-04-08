import ScreenWrapper from "@/src/layout/UI/ScreenWrapper";
import { useEffect } from "react";
import { Text } from "react-native";
import useApod from "../apod/hook/useApod";

export default function Home() {
    const { apod, getApod, loading, message } = useApod()

    useEffect(() => {
        const sopa = async () => {
            await getApod(2025,9,18)
        }
        sopa()
    }, [])

    return (
        <ScreenWrapper>
            <Text>Home</Text>
        </ScreenWrapper>
    )

}