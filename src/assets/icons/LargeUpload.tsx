import { memo } from 'react'
import Svg, { Defs, LinearGradient, Path, Rect, Stop, SvgProps } from 'react-native-svg'
import { SvgIconProps } from 'types/ui'

function LargeUpload({ ...props }: SvgIconProps & SvgProps) {
  return (
    <Svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect width={40} height={40} rx={20} fill="#D9D9D9" />
      <Rect width={40} height={40} rx={20} fill="url(#a)" />
      <Path
        d="M20.25 24.667V11.6m0 0-4.667 4.667M20.25 11.6l4.666 4.667"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path stroke="#fff" strokeLinecap="round" d="M13.283 28.833h13.933" />
      <Defs>
        <LinearGradient id="a" x1={2} y1={3.5} x2={36.5} y2={38} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#773358" />
          <Stop offset={1} stopColor="#B894A7" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default memo(LargeUpload)
