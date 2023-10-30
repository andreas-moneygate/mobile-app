import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function CaretDown({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { red },
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
        d="M5.713 8.392 9.242 2.5a.833.833 0 0 0-.713-1.25H1.471A.833.833 0 0 0 .759 2.5l3.529 5.892a.833.833 0 0 0 1.425 0Z"
        fill={color || red}
      />
    </Svg>
  )
}

export default memo(CaretDown)
