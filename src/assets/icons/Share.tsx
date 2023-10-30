import { memo } from 'react'
import Svg, { Line, Path, Polyline, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function Share({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
      <Path
        d="M8.5 10H6.5C6.22386 10 6 10.2239 6 10.5V19.5C6 19.7761 6.22386 20 6.5 20H16.5C16.7761 20 17 19.7761 17 19.5V10.5C17 10.2239 16.7761 10 16.5 10H14.5"
        stroke={color || white}
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth={2}
      />
      <Path
        d="M11.5 14V3 M12 3L8 6 M11 3L15 6"
        stroke={color || white}
        stroke-linecap="round"
        stroke-linejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default memo<SvgProps>(Share)
