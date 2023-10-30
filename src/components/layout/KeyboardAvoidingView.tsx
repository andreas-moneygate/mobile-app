import { useHeaderHeight } from '@react-navigation/elements'
import { memo, PropsWithChildren } from 'react'
import { KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps } from 'react-native'
import styled from 'styled-components/native'
import { isIos } from 'utils/ui'

type KeyboardAvoidingViewProps = PropsWithChildren<RNKeyboardAvoidingViewProps> & {
  handleHeader?: boolean
  customHeaderHeight?: number
}

export const KeyboardAvoidingView = memo<KeyboardAvoidingViewProps>(
  ({ handleHeader, ...props }) => {
    const headerHeight = useHeaderHeight()

    return (
      <KeyboardAvoidingWrapper
        enabled={isIos}
        behavior="padding"
        keyboardVerticalOffset={handleHeader ? headerHeight || props?.customHeaderHeight : 0}
        {...props}
      />
    )
  },
)

const KeyboardAvoidingWrapper = styled.KeyboardAvoidingView`
  width: 100%;
  flex: 1;
  flex-grow: 1;
`
