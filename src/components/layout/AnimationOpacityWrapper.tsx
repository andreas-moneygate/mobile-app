import { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'

interface BackdropProps {
  scrollValue: any
  style?: StyleProp<ViewStyle>
  children: JSX.Element
  attenuation?: boolean
  isHeader?: boolean
  inputRange: number[]
  outputRange: number[]
}

export const AnimationOpacityWrapper = ({
  scrollValue,
  style,
  children,
  isHeader = false,
  inputRange = [1, 0],
  outputRange = [0, 1],
}: BackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollValue?.value, inputRange, outputRange, Extrapolate.CLAMP),
  }))

  const containerStyle = useMemo(
    () => [style, containerAnimatedStyle],
    [style, containerAnimatedStyle],
  )

  const centeredStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  }

  return (
    <Animated.View style={[isHeader && centeredStyle, containerStyle]}>{children}</Animated.View>
  )
}
