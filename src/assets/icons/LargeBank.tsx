import { memo } from 'react'
import Svg, { Defs, LinearGradient, Path, Rect, Stop, SvgProps } from 'react-native-svg'
import { SvgIconProps } from 'types/ui'

function LargeBank({ ...props }: SvgIconProps & SvgProps) {
  return (
    <Svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect width={40} height={40} rx={20} fill="#D9D9D9" />
      <Rect width={40} height={40} rx={20} fill="url(#a)" />
      <Path d="M11.167 17.067 20.5 11l9.334 6.067H11.167Z" stroke="#fff" strokeLinejoin="round" />
      <Rect
        x={11.445}
        y={29}
        width={18.2}
        height={0.467}
        rx={0.233}
        stroke="#fff"
        strokeWidth={0.467}
      />
      <Rect
        x={14.2}
        y={27.1}
        width={7.933}
        height={0.467}
        rx={0.233}
        transform="rotate(-90 14.2 27.1)"
        stroke="#fff"
        strokeWidth={0.467}
      />
      <Rect
        x={20.267}
        y={27.1}
        width={7.933}
        height={0.467}
        rx={0.233}
        transform="rotate(-90 20.267 27.1)"
        stroke="#fff"
        strokeWidth={0.467}
      />
      <Rect
        x={26.334}
        y={27.1}
        width={7.933}
        height={0.467}
        rx={0.233}
        transform="rotate(-90 26.334 27.1)"
        stroke="#fff"
        strokeWidth={0.467}
      />
      <Defs>
        <LinearGradient id="a" x1={2} y1={3.5} x2={36.5} y2={38} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#773358" />
          <Stop offset={1} stopColor="#B894A7" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default memo(LargeBank)
