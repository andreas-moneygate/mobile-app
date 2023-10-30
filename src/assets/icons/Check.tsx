import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Check({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m13.333 4-7.334 7.333L2.666 8"
        stroke={color || white}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Check)
