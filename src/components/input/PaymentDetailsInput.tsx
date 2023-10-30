import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { UploadFileProvider } from 'components/content/UploadFileProvider'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import React, { forwardRef } from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

import { TextInputProps } from './TextInput'

export type PaymentDetailsInputProps = RNTextInputProps &
  LayoutItemProps & { children?: JSX.Element; onUpload?: (img: any) => void; onReset?: () => void }

export const PaymentDetailsInput = forwardRef<RNTextInput, PaymentDetailsInputProps>(
  (
    {
      value,
      onBlur,
      onFocus,
      onChangeText,
      editable = true,
      placeholder = 'Payment details',
      children,
      onUpload,
      onReset,
      ...props
    },
    ref,
  ) => {
    const { ...rest } = useSortedStyleProps(props)
    return (
      <Wrapper pv="m" style={shadowStyle}>
        <InputWrapper mh="l">
          <Input
            editable={editable}
            value={value}
            autoCorrect={false}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            multiline
            ref={ref}
            {...rest}
          />
          {onUpload ? <UploadFileProvider onUpload={onUpload} /> : null}
          {value && onReset ? (
            <ResetButton icon={renderIcon(icons.close, { color: colors.gray })} onPress={onReset} />
          ) : null}
        </InputWrapper>
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
`
const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
}

const InputWrapper = styled(Row)`
  max-height: 60px;
  align-items: flex-start;
`

const ResetButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 50px;
  padding: 3px;
`

const Input = styled.TextInput.attrs<TextInputProps>(({ theme }) => ({
  placeholderTextColor: theme.colors.midGray,
  marginRight: 5,
  paddingRight: 10,
}))`
  color: ${({ theme }) => theme.colors.black};
  font-size: 15px;
  flex: 1;
`
