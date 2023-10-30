import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Hashtag({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { lightMagentaPink },
  } = useTheme()

  return (
    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M3.667 8.25h14.667M3.667 13.75h14.667M9.166 2.75l-1.833 16.5M14.666 2.75l-1.833 16.5"
        stroke={color || lightMagentaPink}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Hashtag)
