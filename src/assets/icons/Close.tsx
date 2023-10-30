import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Close({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m16.5 5.5-11 11M5.5 5.5l11 11"
        stroke={color || white}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Close)
