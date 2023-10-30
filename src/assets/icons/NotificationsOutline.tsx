import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function NotificationsOutline({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin85 },
  } = useTheme()
  return (
    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M11.018 2.668a5.504 5.504 0 0 0-5.5 5.5v2.65c0 .558-.238 1.41-.522 1.888l-1.055 1.75c-.65 1.082-.201 2.283.99 2.686a19.178 19.178 0 0 0 12.165 0 1.835 1.835 0 0 0 .99-2.686l-1.055-1.75c-.275-.477-.513-1.33-.513-1.889V8.168c0-3.025-2.475-5.5-5.5-5.5Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M12.714 2.932a6.19 6.19 0 0 0-3.392 0 1.82 1.82 0 0 1 1.696-1.155c.77 0 1.43.477 1.696 1.155Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.768 17.473a2.758 2.758 0 0 1-2.75 2.75 2.76 2.76 0 0 1-1.944-.807 2.76 2.76 0 0 1-.806-1.943"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </Svg>
  )
}

export default memo(NotificationsOutline)
