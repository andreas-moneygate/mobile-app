import { memo } from 'react'
import Svg, { Rect, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function ClientStatement({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin },
  } = useTheme()

  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <Rect x="4" y="2" width="14" height="18" rx="3" fill={color || pumpkin} />
      <Rect x="6" y="6.5" width="10" height="1.5" rx="0.75" fill="white" />
      <Rect x="6" y="14.5" width="10" height="1.5" rx="0.75" fill="white" />
      <Rect x="8" y="10.5" width="6" height="1.5" rx="0.75" fill="white" />
    </Svg>
  )
}

export default memo(ClientStatement)
