import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { TextInputProps } from 'components/input/TextInput'
import { Row } from 'components/layout/Row'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import _ from 'lodash'
import { forwardRef } from 'react'
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps } from 'react-native'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

export type SearchInputProps = RNTextInputProps &
  LayoutItemProps & { onReset?: () => void; search?: boolean; outline?: boolean }

export const SearchInput = forwardRef<RNTextInput, SearchInputProps>(
  (
    {
      value,
      onBlur,
      onFocus,
      onChangeText,
      editable = true,
      placeholder,
      onReset,
      search = false,
      outline = false,
      ...props
    },
    ref,
  ) => {
    const { ...rest } = useSortedStyleProps(props)

    return (
      <InputWrapper mh="l" mv="s" outline={outline}>
        {search ? renderIcon(icons.search) : renderIcon(icons.hashtag)}
        <Input
          editable={editable}
          value={value}
          autoCorrect={false}
          onChangeText={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          ref={ref}
          outline={outline}
          {...rest}
        />
        {!_.isEmpty(value) && <IconButton icon={icons.close} onPress={onReset} mr="xs" />}
      </InputWrapper>
    )
  },
)

const Input = styled.TextInput.attrs<TextInputProps>(({ theme, outline }) => ({
  placeholderTextColor: theme.colors.lightMagentaPink,
  selectionColor: outline ? theme.colors.black : theme.colors.white,
  paddingHorizontal: 10,
}))<{ outline?: boolean }>`
  color: ${({ theme, outline }) => (outline ? theme.colors.black : theme.colors.white)};
  font-size: 15px;
  flex: 1;
`

const InputWrapper = styled(Row)<{ outline?: boolean }>`
  height: ${({ outline }) => (outline ? 36 : 28)}px;
  padding-left: ${({ outline }) => (outline ? 11 : 0)}px;
  align-items: center;
  border-bottom-width: ${({ outline }) => (outline ? 0 : '1px')};
  border-radius: ${({ outline }) => (outline ? '8px' : '0')};
  background-color: ${({ theme, outline }) => (outline ? theme.colors.lightGray : 'none')};
  border-color: ${({ theme, outline }) =>
    outline ? theme.colors.midGray : theme.colors.lightMagentaPink};
`
