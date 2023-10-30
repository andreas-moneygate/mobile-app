import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function CaretUp({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { green },
  } = useTheme()

  return (
    <Svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.287 1.608.758 7.5a.833.833 0 0 0 .713 1.25h7.058a.833.833 0 0 0 .712-1.25L5.712 1.608a.833.833 0 0 0-1.425 0Z"
        fill={color || green}
      />
    </Svg>
  )
}

export default memo(CaretUp)
