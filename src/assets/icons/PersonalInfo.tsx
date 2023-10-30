import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function PersonalInfo({ color, ...props }: SvgProps & SvgIconProps) {
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
        d="M16.628 19.82c-.807.238-1.76.348-2.879.348h-5.5c-1.118 0-2.071-.11-2.878-.349.202-2.383 2.65-4.262 5.628-4.262 2.98 0 5.427 1.879 5.629 4.262Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.75 1.834h-5.5c-4.583 0-6.416 1.833-6.416 6.417v5.5c0 3.465 1.045 5.362 3.538 6.068.202-2.383 2.65-4.262 5.629-4.262 2.979 0 5.426 1.879 5.628 4.262 2.493-.706 3.538-2.603 3.538-6.068v-5.5c0-4.584-1.833-6.417-6.416-6.417ZM11 12.99A3.286 3.286 0 0 1 7.72 9.699a3.278 3.278 0 0 1 3.282-3.282A3.278 3.278 0 0 1 14.282 9.7a3.286 3.286 0 0 1-3.281 3.29Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.282 9.698A3.286 3.286 0 0 1 11 12.988a3.286 3.286 0 0 1-3.281-3.29A3.278 3.278 0 0 1 11 6.416a3.278 3.278 0 0 1 3.282 3.282Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(PersonalInfo)
