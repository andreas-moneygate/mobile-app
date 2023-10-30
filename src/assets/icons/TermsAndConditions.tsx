import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function TermsAndConditions({ color, ...props }: SvgProps & SvgIconProps) {
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
        d="M20.167 9.167v4.584c0 4.583-1.833 6.416-6.416 6.416h-5.5c-4.584 0-6.417-1.833-6.417-6.416v-5.5c0-4.584 1.833-6.417 6.417-6.417h4.583"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.167 9.167h-3.666c-2.75 0-3.667-.916-3.667-3.666V1.834l7.333 7.333ZM6.416 11.916h5.5M6.416 15.584h3.667"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(TermsAndConditions)
