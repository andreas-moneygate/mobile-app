import { TextInputProps } from 'components'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { InputError } from 'components/elements/InputError'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
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

export type MultilineInputProps = RNTextInputProps &
  LayoutItemProps & {
    label?: string
    error?: any
    onGainedFocus?: () => void
    onBlur?: () => void
    onPress?: () => void
  }

export const MultilineInput = forwardRef<RNTextInput, MultilineInputProps>(
  (
    {
      label,
      error,
      editable = true,
      onChangeText,
      value,
      onGainedFocus,
      onBlur,
      onPress,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false)

    const offset = useSharedValue(value ? 1 : 0)

    const { style, ...rest } = useSortedStyleProps(props)

    const mergedStyle = useMemo<StyleProp<ViewStyle>>(() => {
      if (!editable) {
        return [{ opacity: 0.5 }, style]
      }

      return style
    }, [editable, style])

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

    const handlePress = useCallback(() => {
      onPress?.()
      ref?.current?.focus?.()
    }, [ref])

    const labelStyle = useAnimatedStyle(
      () => ({
        top: withTiming(interpolate(offset.value, [0, 1], [20, 5])),
        fontSize: withTiming(interpolate(offset.value, [0, 1], [17, 13])),
        color: !isFocused ? 'darkgray' : 'orange',
        marginLeft: 20,
      }),
      [isFocused],
    )

    useEffect(() => {
      if (!isFocused && !value) {
        offset.value = 0
      } else {
        offset.value = 1
      }
    }, [value, isFocused, offset])

    return (
      <Column style={mergedStyle}>
        <TouchableOpacity disabled={!editable} onPress={handlePress}>
          <InputWrapper bc={isFocused ? 'pumpkin85' : 'gray85'}>
            {label ? <InputLabel style={labelStyle}>{label}</InputLabel> : null}
            <Input
              editable={editable}
              value={value}
              autoCorrect={false}
              testID={label}
              onChangeText={onChangeText}
              ref={ref}
              onBlur={handleBlur}
              onFocus={handleFocus}
              multiline
              {...rest}
            />
          </InputWrapper>
          <Column height={20}>{error ? <InputError>{error}</InputError> : null}</Column>
        </TouchableOpacity>
      </Column>
    )
  },
)

const InputWrapper = styled(Row)`
  border-radius: 12px;
  height: 170px;
  border-width: 1px;
  padding-top: 5px;
  align-items: flex-start;
`

const Input = styled.TextInput.attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.black,
}))`
  margin-top: 20px;
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
