import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function PaperClip({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { midGray },
  } = useTheme()

  return (
    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="m19.653 10.13-8.424 8.423a5.503 5.503 0 0 1-7.782-7.782l8.424-8.424a3.669 3.669 0 0 1 5.188 5.188l-8.433 8.424a1.834 1.834 0 0 1-2.594-2.594l7.782-7.773"
        stroke={color || midGray}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(PaperClip)
