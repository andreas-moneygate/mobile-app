import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function ArrowLeft({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { black },
  } = useTheme()

  return (
    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="m10 5-6 6m0 0 6 6m-6-6h14"
        stroke={color || black}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(ArrowLeft)
