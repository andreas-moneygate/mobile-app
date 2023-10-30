import { memo } from 'react'
import Svg, { Path, Rect, SvgProps } from 'react-native-svg'

function FeeStatement({ ...props }) {
  return (
    <Svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect x="4" y="2" width="14" height="18" rx="3" fill="#FB7021" />
      <Path d="M14.5 7.5L7.5 14.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
      <Path
        d="M8.25 9.5C8.94036 9.5 9.5 8.94036 9.5 8.25C9.5 7.55964 8.94036 7 8.25 7C7.55964 7 7 7.55964 7 8.25C7 8.94036 7.55964 9.5 8.25 9.5Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.75 15C14.4404 15 15 14.4404 15 13.75C15 13.0596 14.4404 12.5 13.75 12.5C13.0596 12.5 12.5 13.0596 12.5 13.75C12.5 14.4404 13.0596 15 13.75 15Z"
        stroke="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(FeeStatement)
