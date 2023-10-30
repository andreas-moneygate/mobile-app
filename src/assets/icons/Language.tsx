import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Language({ color, ...props }: SvgProps & SvgIconProps) {
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
        d="M15.576 8.215H6.428M11.002 6.674v1.54M13.293 8.195c0 3.942-3.08 7.132-6.875 7.132"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.585 15.327c-1.65 0-3.117-.88-4.17-2.264"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.25 20.167h5.5c4.584 0 6.417-1.833 6.417-6.416v-5.5c0-4.584-1.833-6.417-6.416-6.417h-5.5c-4.584 0-6.417 1.833-6.417 6.417v5.5c0 4.583 1.833 6.416 6.417 6.416Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Language)
