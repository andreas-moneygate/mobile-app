import { memo } from 'react'
import Svg, { Line, Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function Download({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
      <Path
        d="M14 5.60001L14 18.6667M14 18.6667L18.6666 14M14 18.6667L9.33329 14"
        stroke={color || white}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Line
        x1="7.03333"
        y1="22.8333"
        x2="20.9667"
        y2="22.8333"
        stroke={color || white}
        stroke-linecap="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Download)
