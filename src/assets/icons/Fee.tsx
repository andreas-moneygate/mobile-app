import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function Fee({ ...props }) {
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
        d="M22.1673 5.83398L5.83398 22.1673"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.58268 10.4993C9.19351 10.4993 10.4993 9.19351 10.4993 7.58268C10.4993 5.97185 9.19351 4.66602 7.58268 4.66602C5.97185 4.66602 4.66602 5.97185 4.66602 7.58268C4.66602 9.19351 5.97185 10.4993 7.58268 10.4993Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M20.4167 23.3333C22.0275 23.3333 23.3333 22.0275 23.3333 20.4167C23.3333 18.8058 22.0275 17.5 20.4167 17.5C18.8058 17.5 17.5 18.8058 17.5 20.4167C17.5 22.0275 18.8058 23.3333 20.4167 23.3333Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Fee)
