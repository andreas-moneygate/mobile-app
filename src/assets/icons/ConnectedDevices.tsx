import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function ConnectedDevices({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin85 },
  } = useTheme()

  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      viewBox="0 0 22 22"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.167 15.537H5.693c-3.089 0-3.859-.77-3.859-3.86v-5.5c0-3.089.77-3.859 3.86-3.859h9.652c3.089 0 3.859.77 3.859 3.86M9.166 19.68v-4.143M1.834 11.871h7.333M6.178 19.682h2.988"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.165 11.733v5.234c0 2.173-.54 2.713-2.713 2.713h-3.254c-2.173 0-2.714-.54-2.714-2.713v-5.234c0-2.173.541-2.713 2.714-2.713h3.254c2.172 0 2.713.54 2.713 2.713Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.807 16.73h.008"
        stroke={color || pumpkin85}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(ConnectedDevices)
