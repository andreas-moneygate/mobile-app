import { memo, RefObject } from 'react'
import { ScrollView } from 'react-native'
import {
  StickyHeaderScrollView,
  StickyHeaderScrollViewProps,
} from 'react-native-sticky-parallax-header'
import colors from 'theme/colors'

interface HeaderScrollViewProps {
  children: JSX.Element
  innerRef: RefObject<ScrollView>
}

export const HeaderScrollView = memo(
  (props: HeaderScrollViewProps & StickyHeaderScrollViewProps) => {
    const {
      onScroll,
      onMomentumScrollEnd,
      onScrollEndDrag,
      renderHeader,
      children,
      innerRef,
      ...restProps
    } = props
    return (
      <StickyHeaderScrollView
        ref={innerRef}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        renderHeader={renderHeader}
        showsVerticalScrollIndicator={false}
        containerStyle={containerStyle}
        {...restProps}
      >
        {children}
      </StickyHeaderScrollView>
    )
  },
)

const containerStyle = {
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}
