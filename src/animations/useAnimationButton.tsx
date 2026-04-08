import { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

export default function useAnimationButton() {

    const scaleAnimation = useSharedValue(1)


    const stylesButtonAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleAnimation.value }]
        }
    })

    const onPressIn = () => {
        scaleAnimation.value = withSpring(0.95)
    }

    const onPressOut = () => {
        scaleAnimation.value = withSpring(1)
    }

    return { onPressOut, onPressIn, stylesButtonAnimation }

}