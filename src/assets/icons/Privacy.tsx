import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Privacy({ color, ...props }: SvgProps & SvgIconProps) {
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
        d="M14.282 11A3.278 3.278 0 0 1 11 14.282 3.278 3.278 0 0 1 7.72 11 3.278 3.278 0 0 1 11 7.72 3.278 3.278 0 0 1 14.282 11Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 18.581c3.237 0 6.253-1.907 8.352-5.207.825-1.292.825-3.465 0-4.757-2.1-3.3-5.115-5.207-8.351-5.207-3.236 0-6.252 1.907-8.351 5.207-.825 1.292-.825 3.465 0 4.757 2.1 3.3 5.115 5.207 8.35 5.207Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Privacy)
