import { memo } from 'react'
import Svg, { G, Line, Path, SvgProps } from 'react-native-svg'

function ShiftedFile({ ...props }) {
  return (
    <Svg
      width="124"
      height="148"
      viewBox="0 0 124 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        opacity="0.1"
        d="M87.4318 139.547L27.5444 123.5C24.8771 122.785 23.2942 120.044 24.0089 117.376L47.3026 30.4429C48.0173 27.7756 50.759 26.1927 53.4263 26.9074L100.757 39.5895L113.485 61.6349L93.5555 136.011C92.8408 138.679 90.0991 140.261 87.4318 139.547Z"
        fill="#FB7021"
      />
      <G filter="url(#filter0_d_2613_10114)">
        <Path
          d="M80.717 125.933L20.8296 109.887C18.1622 109.172 16.5793 106.43 17.294 103.763L40.5877 16.8296C41.3024 14.1623 44.0441 12.5794 46.7115 13.2941L94.0418 25.9762L106.77 48.0216L86.8407 122.398C86.126 125.065 83.3843 126.648 80.717 125.933Z"
          fill="#FB7021"
        />
      </G>
      <Path
        d="M92.1104 25.459L88.4869 38.9819C87.7722 41.6493 89.3551 44.391 92.0224 45.1057L106.511 48.988"
        stroke="white"
        stroke-width="4"
      />
      <Line
        x1="46.2942"
        y1="38.0291"
        x2="69.1085"
        y2="44.1422"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
      />
      <Line
        x1="41.2903"
        y1="56.703"
        x2="90.7825"
        y2="69.9644"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
      />
      <Line
        x1="36.2864"
        y1="75.3788"
        x2="85.7786"
        y2="88.6402"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
      />
      <Line
        x1="31.2825"
        y1="94.0526"
        x2="80.7747"
        y2="107.314"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(ShiftedFile)
