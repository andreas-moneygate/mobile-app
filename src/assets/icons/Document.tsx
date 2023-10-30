import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Document({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { purple85 },
  } = useTheme()

  return (
    <Svg width={18} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M16.5 5.5v9c0 2.7-1.25 4.5-4.167 4.5H5.667C2.75 19 1.5 17.2 1.5 14.5v-9C1.5 2.8 2.75 1 5.667 1h6.666C15.25 1 16.5 2.8 16.5 5.5Z"
        stroke={color || purple85}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5 3.125v1.833c0 1.009.825 1.834 1.833 1.834h1.834"
        stroke={color || purple85}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Document)
