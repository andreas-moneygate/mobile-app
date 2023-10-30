import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function LogOut({ color, ...props }: SvgProps & SvgIconProps) {
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
        d="M8.158 6.93c.284-3.3 1.98-4.647 5.693-4.647h.119c4.097 0 5.738 1.641 5.738 5.739v5.976c0 4.098-1.64 5.739-5.738 5.739h-.12c-3.684 0-5.38-1.33-5.683-4.575M13.75 11H3.318M5.362 7.93 2.29 11l3.07 3.071"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(LogOut)
