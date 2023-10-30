import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { memo, useCallback } from 'react'
import { Platform, ViewStyle } from 'react-native'
import { screenWidth } from 'utils/ui'

interface AmountSliderProps {
  value: { min: number; max: number } | undefined
  onSelect: (value: AmountSliderProps['value']) => void
}

export const AmountSlider = memo((props: AmountSliderProps) => {
  const { value: { min = 0, max = 500000 } = {}, onSelect } = props

  const handleSelect = useCallback(
    ([min, max]) => {
      onSelect({ min, max })
    },
    [onSelect],
  )

  return (
    <MultiSlider
      values={[Number(min), Number(max)]}
      onValuesChange={handleSelect}
      min={0}
      max={500000}
      step={1}
      markerStyle={markerStyle}
      sliderLength={SLIDER_LENGTH}
      unselectedStyle={sliderLineStyle}
      selectedStyle={sliderLineStyle}
      containerStyle={sliderContainerStyle}
    />
  )
})

const SLIDER_LENGTH = screenWidth - 80 || 318

const sliderLineStyle = { backgroundColor: 'rgba(255,255,255,0.2)' }

const sliderContainerStyle: ViewStyle = {
  paddingTop: 30,
  marginLeft: 17,
  height: 55,
  justifyContent: 'flex-start',
}

const markerStyle = Platform.select({
  android: { backgroundColor: 'white', height: 20, width: 20 },
  ios: undefined,
})
