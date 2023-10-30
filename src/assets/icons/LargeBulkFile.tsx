import { memo } from 'react'
import Svg, { Defs, Line, LinearGradient, Path, Rect, Stop, SvgProps } from 'react-native-svg'

function LargeBulkFile({ ...props }) {
  return (
    <Svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width="40" height="40" rx="20" fill="#D9D9D9" />
      <Rect width="40" height="40" rx="20" fill="url(#paint0_linear_2841_12411)" />
      <Path
        d="M26 30H14C13.7239 30 13.5 29.7761 13.5 29.5V12C13.5 11.7239 13.7239 11.5 14 11.5H21.7929L26.5 16.2071V29.5C26.5 29.7761 26.2761 30 26 30Z"
        stroke="white"
      />
      <Line x1="15.5" y1="16" x2="19.5" y2="16" stroke="white" stroke-linecap="round" />
      <Line x1="15.5" y1="19.5" x2="24.5" y2="19.5" stroke="white" stroke-linecap="round" />
      <Line x1="15.5" y1="23" x2="24.5" y2="23" stroke="white" stroke-linecap="round" />
      <Line x1="15.5" y1="26.5" x2="24.5" y2="26.5" stroke="white" stroke-linecap="round" />
      <Defs>
        <LinearGradient
          id="paint0_linear_2841_12411"
          x1="2"
          y1="3.5"
          x2="36.5"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#773358" />
          <Stop offset="1" stopColor="#B894A7" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default memo<SvgProps>(LargeBulkFile)
