import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function IconDelete({ ...props }: SvgProps) {
  return (
    <Svg width={34} height={21} viewBox="0 0 34 21" {...props}>
      <Path
        d="M7.46106 1.08088L1.59725 8.12633C0.671726 9.23837 0.671726 10.8525 1.59725 11.9646L7.46106 19.01C8.03103 19.6949 8.87592 20.0909 9.76691 20.0909H31C32.6569 20.0909 34 18.7478 34 17.0909V3C34 1.34315 32.6569 0 31 0H9.76692C8.87592 0 8.03103 0.396046 7.46106 1.08088Z"
        fill="black"
      />
      <Path
        d="M26.2954 6L18.2954 14"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M18.2954 6L26.2954 14"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(IconDelete)
