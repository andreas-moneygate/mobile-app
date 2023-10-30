import { memo } from 'react'
import Svg, { Path, Rect, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function Calendar({ color, ...props }: SvgProps) {
  const {
    colors: { pumpkin },
  } = useTheme()

  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M14.3869 11.4583H14.3951"
        stroke={color || pumpkin}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.3869 14.2083H14.3951"
        stroke={color || pumpkin}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.9943 11.4583H11.0025"
        stroke={color || pumpkin}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.9943 14.2083H11.0025"
        stroke={color || pumpkin}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.60369 11.4583H7.61192"
        stroke={color || pumpkin}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.60369 14.2083H7.61192"
        stroke={color || pumpkin}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x="2.5" y="3.5" width="17" height="15" rx="2.5" stroke={color || pumpkin} />
      <Path
        d="M2.75 6C2.75 4.75736 3.75736 3.75 5 3.75H17C18.2426 3.75 19.25 4.75736 19.25 6V7.25H2.75V6Z"
        fill={color || pumpkin}
        stroke={color || pumpkin}
        strokeWidth="1.5"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Calendar)
