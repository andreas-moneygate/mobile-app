import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function ChevronRight({ color, ...props }: SvgProps) {
  const {
    colors: { black },
  } = useTheme()

  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Path
        d="M7.77783 15.5556L12.7778 10.5556L7.77783 5.55556"
        stroke={color || black}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(ChevronRight)
