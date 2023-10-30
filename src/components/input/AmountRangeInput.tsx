import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { forwardRef, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
  StyleProp,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  ViewStyle,
} from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

export type AmountRangeInputProps = RNTextInputProps &
  LayoutItemProps & {
    label?: string
    error?: any
    rightAddon?: ReactNode
    onGainedFocus?: () => void
    onBlur?: () => void
    onPress?: () => void
    securedEntry?: boolean
  }

export const AmountRangeInput = forwardRef<RNTextInput, AmountRangeInputProps>(
  (
    {
      label,
      error,
      editable = true,
      rightAddon,
      onChangeText,
      value,
      onGainedFocus,
      onBlur,
      onPress,
      securedEntry = false,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isPasswordVisible, setPasswordVisible] = useState(!!securedEntry)

    const togglePasswordVisibility = useCallback(
      () => setPasswordVisible(!isPasswordVisible),
      [isPasswordVisible],
    )

    const offset = useSharedValue(value ? 1 : 0)

    const handleFocus = useCallback(() => {
      offset.value = !value ? 1 : withTiming(0)

      if (onGainedFocus) {
        onGainedFocus()
      }
      setIsFocused(true)
    }, [value, onGainedFocus, offset])

    const handleBlur = useCallback(() => {
      offset.value = value ? 1 : withTiming(0)

      if (onBlur) {
        onBlur()
      }
      setIsFocused(false)
    }, [value, onBlur, offset])

    useEffect(() => {
      if (!isFocused && !value) {
        offset.value = 0
      } else {
        offset.value = 1
      }
    }, [value, isFocused, offset])

    const { style, ...rest } = useSortedStyleProps(props)

    const mergedStyle = useMemo<StyleProp<ViewStyle>>(() => {
      if (!editable) {
        return [{ opacity: 0.5 }, style]
      }

      return style
    }, [editable, style])

    const labelStyle = useAnimatedStyle(
      () => ({
        top: withTiming(interpolate(offset.value, [0, 1], [20, 5])),
        fontSize: withTiming(interpolate(offset.value, [0, 1], [17, 13])),
        color: '#D7C3CE',
        marginLeft: 20,
      }),
      [isFocused],
    )
    return (
      <Column style={mergedStyle}>
        <TouchableOpacity disabled={!onPress} onPress={onPress}>
          <InputWrapper bc={isFocused ? 'pumpkin85' : 'gray85'}>
            {label ? <InputLabel style={labelStyle}>{label}</InputLabel> : null}
            <Input
              keyboardType="numeric"
              editable={editable}
              value={value}
              autoCorrect={false}
              testID={label}
              onChangeText={onChangeText}
              ref={ref}
              onBlur={handleBlur}
              onFocus={handleFocus}
              secureTextEntry={isPasswordVisible}
              {...rest}
            />
          </InputWrapper>
        </TouchableOpacity>
      </Column>
    )
  },
)

const InputWrapper = styled(Row)`
  border-radius: 12px;
  min-height: 50px;
  border-width: 1px;
  border-color: #d18276;
  background-color: rgba(255, 255, 255, 0.05);
`

const Input = styled.TextInput.attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.black,
}))`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.white};
  padding-left: ${({ theme }) => theme.spacings.l}px;
  padding-right: ${({ theme }) => theme.spacings.s}px;
  flex: 1;
  font-size: 17px;
`

const InputLabel = styled(Animated.Text)`
  color: ${({ theme }) => theme.colors.darkGray};
  position: absolute;
  font-size: 17px;
  flex: 1;
`
