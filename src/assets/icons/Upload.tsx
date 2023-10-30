import { memo } from 'react'
import Svg, { Line, Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function Upload({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
      <Path
        d="M13.9999 18.6667V5.60001M13.9999 5.60001L9.33325 10.2667M13.9999 5.60001L18.6666 10.2667"
        stroke={color || white}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Line
        x1="7.03345"
        y1="22.8333"
        x2="20.9668"
        y2="22.8333"
        stroke={color || white}
        stroke-linecap="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Upload)
