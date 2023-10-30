import { memo } from 'react'
import Svg, { Rect, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function ClientSummaryStatement({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin },
  } = useTheme()

  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <Rect x="2.5" y="0.5" width="14" height="18" rx="3" fill={color || pumpkin} />
      <Rect
        x="4.5"
        y="2.5"
        width="15"
        height="19"
        rx="3.5"
        fill={color || pumpkin}
        stroke="#FFEFE6"
      />
      <Rect x="7" y="9" width="10" height="1.5" rx="0.75" fill="white" />
      <Rect x="9" y="13" width="6" height="1.5" rx="0.75" fill="white" />
    </Svg>
  )
}

export default memo(ClientSummaryStatement)
