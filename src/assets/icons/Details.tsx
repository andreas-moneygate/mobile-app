import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Details({ color, ...props }: SvgIconProps & SvgProps) {
  const {
    colors: { midGray },
  } = useTheme()

  return (
    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M20.166 6.811v5.5c0 1.375-.458 2.52-1.265 3.328-.797.797-1.943 1.255-3.318 1.255v1.953c0 .733-.816 1.173-1.42.77l-4.08-2.723H8.14c.073-.275.11-.559.11-.852 0-.935-.358-1.797-.944-2.448a3.615 3.615 0 0 0-2.723-1.219 3.662 3.662 0 0 0-2.63 1.11 5.361 5.361 0 0 1-.12-1.174v-5.5c0-2.75 1.833-4.583 4.583-4.583h9.167c2.75 0 4.583 1.833 4.583 4.583Z"
        stroke={color || midGray}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.25 16.042c0 .293-.036.577-.11.852-.082.367-.229.724-.421 1.036a3.639 3.639 0 0 1-3.135 1.778 3.594 3.594 0 0 1-2.439-.944 3.375 3.375 0 0 1-.696-.834c-.34-.55-.532-1.2-.532-1.888a3.662 3.662 0 0 1 3.667-3.667c1.081 0 2.062.467 2.722 1.22.587.65.944 1.512.944 2.447ZM5.948 16.023H3.217M4.583 14.685v2.74M7.792 9.625h6.417"
        stroke={color || midGray}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Details)
