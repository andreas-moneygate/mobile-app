import { memo } from 'react'
import Svg, { Circle, G, Path, SvgProps } from 'react-native-svg'
import styled from 'styled-components/native'

function LargePlus({ ...props }) {
  return (
    <Shadow style={{ elevation: 4 }}>
      <Svg
        width="70"
        height="72"
        viewBox="0 0 70 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <G filter="url(#filter0_dd_2613_10125)">
          <Circle cx="35" cy="31" r="27" fill="white" />
        </G>
        <Path
          d="M35 20.5V41.5"
          stroke="#FB7021"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M24.5 31H45.5"
          stroke="#FB7021"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </Shadow>
  )
}

const Shadow = styled.View`
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.16);
`

export default memo<SvgProps>(LargePlus)
