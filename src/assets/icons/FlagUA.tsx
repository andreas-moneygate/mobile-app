import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { SvgIconProps } from 'types/ui'

function FlagUA({ ...props }: SvgIconProps & SvgProps) {
  return (
    <Svg
      width={30}
      height={30}
      fill="none"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M30 14.995V15c0 8.284-6.716 15-15 15A15 15 0 0 1 0 15v-.005h30Z" fill="#F6C752" />
      <Path d="M30 14.995V15H0v-.005A15 15 0 0 1 15 0c8.282 0 15 6.713 15 14.995Z" fill="#3586CB" />
      <Path
        d="M16.86 29.883A15 15 0 0 1 0 15v-.005h3.724V15A15 15 0 0 0 16.86 29.883Z"
        fill="#F7BB38"
      />
      <Path
        d="M16.86.117A14.992 14.992 0 0 0 3.725 15H0v-.005A15.008 15.008 0 0 1 16.86.117Z"
        fill="#366FCA"
      />
      <Path
        d="M25.924 22.676a.954.954 0 1 0 0-1.908.954.954 0 0 0 0 1.908ZM27.33 20.992a.676.676 0 1 0 0-1.35.676.676 0 0 0 0 1.35Z"
        fill="#F6D372"
      />
    </Svg>
  )
}

export default memo(FlagUA)
