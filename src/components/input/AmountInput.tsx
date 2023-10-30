import { TextInputProps } from 'components/input/TextInput'
import { Column } from 'components/layout/Column'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { forwardRef, useMemo } from 'react'
import {
  Platform,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { formatCurrency } from 'utils/ui'

export type AmountInputProps = RNTextInputProps &
  LayoutItemProps & {
    currencySymbol?: string | undefined
  }

export const AmountInput = forwardRef<RNTextInput, AmountInputProps>(
  (
    {
      value,
      onBlur,
      onFocus,
      onChangeText,
      editable = true,
      placeholder,
      currencySymbol,
      ...props
    },
    ref,
  ) => {
    const { ...rest } = useSortedStyleProps(props)
    const defaultPlaceholder = useMemo(() => `${currencySymbol}0`, [currencySymbol])
    const inputMinWidth = Platform.select({
      ios: undefined,
      android: 40 + currencySymbol?.length * 15,
    })
    return (
      <Container>
        <InputWrapper>
          <Input
            editable={editable}
            keyboardType="numeric"
            value={formatCurrency(value, currencySymbol)}
            autoCorrect={false}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder || defaultPlaceholder}
            ref={ref}
            minWidth={inputMinWidth}
            {...rest}
          />
        </InputWrapper>
      </Container>
    )
  },
)

const Container = styled(Column)`
  flex: 1px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 80px;
`

const Input = styled.TextInput.attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.midGray,
}))`
  font-size: 44px;
  font-weight: 600;
`

const InputWrapper = styled(Column)`
  height: 80px;
  align-items: center;
`
