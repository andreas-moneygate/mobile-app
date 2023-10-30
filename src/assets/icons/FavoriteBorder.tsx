import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function FavoriteBorder({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg
      width={30}
      height={30}
      fill="none"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m15 2.5 3.863 7.825 8.637 1.263-6.25 6.087 1.475 8.6L15 22.212l-7.725 4.063 1.475-8.6-6.25-6.088 8.637-1.262L15 2.5Z"
        stroke={color || white}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(FavoriteBorder)
