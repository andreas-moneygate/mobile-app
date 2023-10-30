import { memo } from 'react'
import Svg, { Circle, G, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function SliderMarker({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G>
        <Circle cx="24" cy="22" r="12" fill={color || white} />
      </G>
    </Svg>
  )
}

export default memo<SvgProps>(SliderMarker)
