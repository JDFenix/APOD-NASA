import { ActivityIndicator, StyleSheet, View } from "react-native";
import { IApodResponse } from "../interface/IApodResponse";
import TextCustom from "@/src/layout/TextCustom";
import { Image } from "expo-image";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import YoutubePlayer from "react-native-youtube-iframe";
import { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function extractYoutubeVideoId(url: string): string | null {
    const match = url.match(/(?:embed\/|v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match?.[1] ?? null;
}

export default function ApodCard({ apod }: { apod: IApodResponse }) {
    const videoId = useMemo(() => extractYoutubeVideoId(apod.url), [apod.url]);
    const [imageLoading, setImageLoading] = useState(apod.media_type === "image");
    const [videoLoading, setVideoLoading] = useState(apod.media_type === "video");

    useEffect(() => {
        setImageLoading(apod.media_type === "image");
        setVideoLoading(apod.media_type === "video");
    }, [apod.media_type, apod.url]);

    return (
        <View style={styles.card}>

            <View style={styles.mediaWrap}>
                {apod.media_type === "image" ? (
                    <View style={styles.mediaContainer}>
                        <Image
                            source={{ uri: apod.url }}
                            style={styles.image}
                            contentFit="cover"
                            onLoadStart={() => setImageLoading(true)}
                            onLoadEnd={() => setImageLoading(false)}
                            onError={() => setImageLoading(false)}
                        />

                        {imageLoading && (
                            <View style={styles.loaderOverlay}>
                                <ActivityIndicator color="#5DA9FF" />
                            </View>
                        )}
                    </View>
                ) : videoId ? (
                    <View style={styles.mediaContainer}>
                        <YoutubePlayer
                            width={"100%"}
                            height={180}
                            play={true}
                            videoId={videoId}
                            onReady={() => setVideoLoading(false)}
                            onError={() => setVideoLoading(false)}
                        />

                        {videoLoading && (
                            <View style={styles.loaderOverlay}>
                                <ActivityIndicator color="#5DA9FF" />
                            </View>
                        )}
                    </View>
                ) : (
                    <TextCustom type="Error">No se pudo extraer el ID del video.</TextCustom>
                )}
            </View>

            <TextCustom style={styles.title}>{apod.title}</TextCustom>
            <View style={{ flexDirection: "row", gap: scale(10) }}>
                <Ionicons name="calendar" size={moderateScale(19, 0.4)} color={"#9FB3D7"} />
                <TextCustom style={styles.date}>{apod.date}</TextCustom>
            </View>
            <TextCustom style={styles.explanation}>{apod.explanation}</TextCustom>

        </View>
    )

}

const styles = StyleSheet.create({
    card: {
        marginTop: verticalScale(8),
        padding: scale(12),
        backgroundColor: "#111D33",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#24395E",
        gap: verticalScale(8),
    },
    mediaWrap: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: verticalScale(4),
    },
    mediaContainer: {
        width: "100%",
        minHeight: verticalScale(220),
        justifyContent: "center",
        borderRadius: 12,
        overflow: "hidden",
    },
    loaderOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(11, 21, 39, 0.35)",
    },
    image: {
        width: "100%",
        height: verticalScale(220),
        borderRadius: 12,
    },
    title: {
        fontSize: moderateScale(22, 0.4),
        fontWeight: "800",
        color: "#EAF2FF",
        marginTop: verticalScale(4),
    },
    date: {
        fontSize: moderateScale(12, 0.4),
        color: "#9FB3D7",
        marginTop: verticalScale(2),
        marginBottom: verticalScale(6),
    },
    explanation: {
        fontSize: moderateScale(15, 0.4),
        color: "#E1E9F7",
        lineHeight: moderateScale(22, 0.4),
        textAlign: "justify",
        marginTop: verticalScale(10),
    },
})