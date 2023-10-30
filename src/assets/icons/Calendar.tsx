import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function Calendar({ color, ...props }: SvgProps) {
  const {
    colors: { midGray },
  } = useTheme()

  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" {...props}>
      <Path
        d="M7.33325 1.83325V4.58325"
        stroke={midGray || color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M14.6667 1.83325V4.58325"
        stroke={midGray || color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.20825 8.33252H18.7916"
        stroke={midGray || color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.25 7.79159V15.5833C19.25 18.3333 17.875 20.1666 14.6667 20.1666H7.33333C4.125 20.1666 2.75 18.3333 2.75 15.5833V7.79159C2.75 5.04159 4.125 3.20825 7.33333 3.20825H14.6667C17.875 3.20825 19.25 5.04159 19.25 7.79159Z"
        stroke={midGray || color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Calendar)
