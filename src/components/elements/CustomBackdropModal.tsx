import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

interface BackdropProps {
  style?: StyleProp<ViewStyle>
  onClose?: () => void
  animatedIndex: SharedValue<number>
  animatedPosition: SharedValue<number>
}

export const CustomBackdropModal = ({
  animatedIndex,
  animatedPosition,
  style,
}: BackdropProps & BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0.7, 0.7], [0.7, 0.7], Extrapolate.CLAMP),
  }))

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'black',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  )

  return (
    <Animated.View style={containerStyle}>
      <BottomSheetBackdrop
        animatedIndex={animatedIndex}
        animatedPosition={animatedPosition}
        pressBehavior="close"
      />
    </Animated.View>
  )
}
