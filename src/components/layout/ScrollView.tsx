import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { memo, RefObject } from 'react'
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native'
import { LayoutItemProps } from 'types/ui'

export const ScrollView = memo(
  (props: ScrollViewProps & LayoutItemProps & { innerRef?: RefObject<RNScrollView> }) => {
    const { children, innerRef, ...styledProps } = useSortedStyleProps(props)

    return (
      <RNScrollView ref={innerRef} showsVerticalScrollIndicator={false} {...styledProps}>
        {children}
      </RNScrollView>
    )
  },
)
