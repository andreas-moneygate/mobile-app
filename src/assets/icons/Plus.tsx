import { memo } from 'react'
import Svg, { Circle, Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Plus({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin85 },
  } = useTheme()

  return (
    <Svg
      width={36}
      height={36}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle opacity="0.1" cx="18" cy="18" r="18" fill={color || pumpkin85} />
      <Path
        d="M17.998 9.59961V26.3996"
        stroke={color || pumpkin85}
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M9.59766 18H26.3977"
        stroke={color || pumpkin85}
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo(Plus)
