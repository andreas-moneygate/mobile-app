import { memo } from 'react'
import Svg, { Path, Rect, SvgProps } from 'react-native-svg'

function Bank({ ...props }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
      <Path
        d="M4.66663 11.0667L14 5L23.3333 11.0667H4.66663Z"
        stroke="white"
        stroke-linejoin="round"
      />
      <Rect
        x="4.94464"
        y="23.0005"
        width="18.2"
        height="0.466667"
        rx="0.233333"
        stroke="white"
        stroke-width="0.466667"
      />
      <Rect
        x="7.70001"
        y="21.1"
        width="7.93333"
        height="0.466667"
        rx="0.233333"
        transform="rotate(-90 7.70001 21.1)"
        stroke="white"
        stroke-width="0.466667"
      />
      <Rect
        x="13.7667"
        y="21.1"
        width="7.93333"
        height="0.466667"
        rx="0.233333"
        transform="rotate(-90 13.7667 21.1)"
        stroke="white"
        stroke-width="0.466667"
      />
      <Rect
        x="19.8333"
        y="21.1"
        width="7.93333"
        height="0.466667"
        rx="0.233333"
        transform="rotate(-90 19.8333 21.1)"
        stroke="white"
        stroke-width="0.466667"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Bank)
