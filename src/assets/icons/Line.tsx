import { memo } from 'react'
import Svg, { Rect, SvgProps } from 'react-native-svg'

function Line({ ...props }) {
  return (
    <Svg width={39} height={3} viewBox="0 0 39 3" {...props}>
      <Rect x="0.5" width="38" height="3" rx="1.5" fill="#C4C4C4" />
    </Svg>
  )
}

export default memo<SvgProps>(Line)
