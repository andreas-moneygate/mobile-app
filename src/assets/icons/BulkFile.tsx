import { memo } from 'react'
import Svg, { Line, Path, SvgProps } from 'react-native-svg'

function BulkFile({ ...props }) {
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
        d="M15.5 5.5V9C15.5 9.82843 16.1716 10.5 17 10.5H20.5V23.5C20.5 23.7761 20.2761 24 20 24H8C7.72386 24 7.5 23.7761 7.5 23.5V6C7.5 5.72386 7.72386 5.5 8 5.5H15.5ZM16.5 9V6.20711L19.7929 9.5H17C16.7239 9.5 16.5 9.27614 16.5 9Z"
        stroke="white"
      />
      <Line x1="9.5" y1="10" x2="13.5" y2="10" stroke="white" stroke-linecap="round" />
      <Line x1="9.5" y1="13.5" x2="18.5" y2="13.5" stroke="white" stroke-linecap="round" />
      <Line x1="9.5" y1="17" x2="18.5" y2="17" stroke="white" stroke-linecap="round" />
      <Line x1="9.5" y1="20.5" x2="18.5" y2="20.5" stroke="white" stroke-linecap="round" />
    </Svg>
  )
}

export default memo<SvgProps>(BulkFile)
