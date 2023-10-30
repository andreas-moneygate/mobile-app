import { Column } from 'components/layout/Column'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import styled from 'styled-components/native'
import { screenWidth } from 'utils/ui'

interface CarouselProps<TData> {
  data: TData[] | any
  renderItem: any
  sliderWidth?: number
  itemWidth?: number
  itemHeight?: number
  alignment?: 'center' | 'end' | 'start'
  layout?: 'default' | 'stack' | 'tinder'
  slideStyle?: object
  dotStyle?: object
  vertical?: boolean
  containerStyle?: object
  onSnap?: (index: number) => void
  index?: number | undefined
}

export const SnapCarousel = memo((props: CarouselProps<any>) => {
  const {
    data,
    renderItem,
    sliderWidth,
    itemWidth,
    itemHeight,
    alignment,
    layout,
    slideStyle: propsSlideStyle,
    dotStyle: propsDotStyle,
    vertical,
    index = 0,
    onSnap: onSnapProps,
  } = props
  const carouselHeight = 200
  const [currentIndex, setCurrentIndex] = useState(index)

  const onSnap = useCallback(
    (i: number) => {
      onSnapProps?.(i)
      setCurrentIndex(i)
    },
    [onSnapProps],
  )

  useEffect(() => {
    if (data.length <= 1 && currentIndex >= 1) {
      setCurrentIndex(0)
    }
  }, [data, currentIndex])

  const slideStyle = useMemo(
    () => ({
      ...defaultSlideStyle,
      ...propsSlideStyle,
    }),
    [propsSlideStyle],
  )

  const dotStyle = useMemo(
    () => ({
      ...defaultDotStyle,
      ...propsDotStyle,
    }),
    [propsDotStyle],
  )

  return (
    <Column>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={sliderWidth || screenWidth}
        sliderHeight={itemHeight || carouselHeight}
        itemWidth={itemWidth || screenWidth * 0.6}
        itemHeight={itemHeight || carouselHeight}
        activeSlideAlignment={alignment || 'start'}
        layout={layout || 'default'}
        firstItem={currentIndex}
        onSnapToItem={onSnap}
        slideStyle={slideStyle}
        vertical={vertical}
        inactiveSlideScale={1}
        scrollEnabled={data.length > 1}
      />
      {data.length !== 1 ? (
        <Pagination
          dotsLength={data.length}
          activeDotIndex={currentIndex}
          containerStyle={paginationStyle}
          dotStyle={dotStyle}
          dotContainerStyle={dotContainerStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={1}
        />
      ) : (
        <Dot mv="xl" />
      )}
    </Column>
  )
})

const Dot = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  width: 10px;
  height: 10px;
  border-radius: 5px;
  align-self: center;
`

const paginationStyle = {
  paddingVertical: 0,
  paddingTop: 25,
}

const dotContainerStyle = { marginHorizontal: 5, marginBottom: 25 }

const defaultDotStyle = {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: '#FFFFFF',
}

const defaultSlideStyle = {
  paddingLeft: 20,
}
