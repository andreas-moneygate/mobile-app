import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Exclamation({ fill, color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin85, white },
  } = useTheme()

  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      {...props}
    >
      <Path
        d="M11 20.167c5.042 0 9.167-4.125 9.167-9.167s-4.125-9.167-9.166-9.167c-5.042 0-9.167 4.125-9.167 9.167s4.125 9.167 9.167 9.167Z"
        fill={fill || pumpkin85}
        stroke={fill || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 7.333v4.584"
        stroke={color || white}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.994 14.667h.008"
        stroke={color || white}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Exclamation)
