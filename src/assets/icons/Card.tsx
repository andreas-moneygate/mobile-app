import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Card({ ...props }) {
  return (
    <Svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3 10H25"
        stroke="white"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8 19H10"
        stroke="white"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13 19H17"
        stroke="white"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.884 5H20.105C24.021 5 25 5.93231 25 9.65095V18.349C25 22.0676 24.021 22.9999 20.116 22.9999H7.884C3.979 23.0105 3 22.0782 3 18.3596V9.65095C3 5.93231 3.979 5 7.884 5Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Card)
