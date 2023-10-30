import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Exchange({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg
      width={28}
      height={28}
      fill="none"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.267 8.867h13.066m0 0L20.067 5.6m3.266 3.267-3.266 3.266M18.666 19.133H5.599m0 0 3.267-3.266m-3.267 3.266L8.866 22.4"
        stroke={color || white}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Exchange)
