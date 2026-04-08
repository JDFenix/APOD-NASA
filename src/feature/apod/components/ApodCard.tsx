import { View } from "react-native";
import { IApodResponse } from "../interface/IApodResponse";
import TextCustom from "@/src/layout/TextCustom";
import { Image } from "expo-image";
import { Video } from "expo-av";

export default function ApodCard({ apod }: { apod: IApodResponse }) {

    return (
        <View>

            <View>
                {apod.media_type === "image" ? (
                    <Image
                        source={{ uri: apod.url }}
                        style={{ width: 200, height: 200 }}
                        contentFit="cover"
                    />
                ) : (
                    <Video
                        source={{ uri: apod.url }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        shouldPlay
                        style={{ width: 300, height: 200 }}
                    />
                )}
            </View>


            <TextCustom>{apod.title}</TextCustom>
            <TextCustom>{apod.date}</TextCustom>
            <TextCustom>{apod.explanation}</TextCustom>

        </View>
    )

}