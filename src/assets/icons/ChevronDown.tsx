import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function ChevronDown({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" {...props}>
      <Path
        d="M4 7L8.5 11.5L13 7"
        stroke={color || white}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(ChevronDown)
