import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function ExchangeVertical({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { purple85 },
  } = useTheme()

  return (
    <Svg
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M3.967 10.933V.667m0 0L1.4 3.233M3.967.667l2.567 2.566M12.034 4.333V14.6m0 0-2.567-2.567m2.566 2.567 2.567-2.567"
        stroke={color || purple85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(ExchangeVertical)
