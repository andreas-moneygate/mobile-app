import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function Search({ color, ...props }: SvgProps) {
  const {
    colors: { midGray },
  } = useTheme()

  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" {...props}>
      <Path
        d="M10.3333 17.6667C14.3834 17.6667 17.6667 14.3834 17.6667 10.3333C17.6667 6.28325 14.3834 3 10.3333 3C6.28325 3 3 6.28325 3 10.3333C3 14.3834 6.28325 17.6667 10.3333 17.6667Z"
        stroke={color || midGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.762 19.7619L15.5715 15.5715"
        stroke={color || midGray}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Search)
