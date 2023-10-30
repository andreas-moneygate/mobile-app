import { TextInputProps } from 'components/input/TextInput'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Label } from 'components/typography/Label'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { forwardRef, useMemo } from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { formatExchangeCurrency } from 'utils/ui'

export type ExchangeInputProps = RNTextInputProps &
  LayoutItemProps & {
    label?: string
    currencySymbol: any
    currency: any
    operationSymbol?: '+' | '-' | ''
  }

export const ExchangeInput = forwardRef<RNTextInput, ExchangeInputProps>(
  (
    {
      label,
      value,
      onBlur,
      onFocus,
      onChangeText,
      editable = true,
      placeholder,
      currency,
      currencySymbol,
      operationSymbol = '',
      ...props
    },
    ref,
  ) => {
    const { ...rest } = useSortedStyleProps(props)
    const defaultPlaceholder = useMemo(
      () => `${operationSymbol}${currencySymbol}0.00`,
      [operationSymbol, currencySymbol],
    )
    return (
      <Column mt="l">
        {label && <Label color="darkGray">{label}</Label>}
        <InputWrapper>
          <BodySmall flex={0.5}>{currency}</BodySmall>
          <Input
            editable={editable}
            value={formatExchangeCurrency(value, currencySymbol, operationSymbol)}
            autoCorrect={false}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={defaultPlaceholder || placeholder}
            keyboardType="numeric"
            ref={ref}
            {...rest}
          />
        </InputWrapper>
      </Column>
    )
  },
)

const Input = styled.TextInput.attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.midGray,
}))`
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  flex: 1;
  text-align: right;
`

const InputWrapper = styled(Row)`
  height: 40px;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray85};
`
