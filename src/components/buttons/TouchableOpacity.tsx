import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { memo, PropsWithChildren } from 'react'
import {
  TouchableOpacity as RNTouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native'
import { LayoutItemProps } from 'types/ui'

export type TouchableOpacityProps = PropsWithChildren<RNTouchableOpacityProps>

export const TouchableOpacity = memo<TouchableOpacityProps & LayoutItemProps>(props => {
  const styledProps = useSortedStyleProps(props)
  return <RNTouchableOpacity activeOpacity={0.6} {...styledProps} />
})
