import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function ChevronLeft({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" {...props}>
      <Path
        d="M14 5L8 11L14 17"
        stroke={color || white}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(ChevronLeft)
