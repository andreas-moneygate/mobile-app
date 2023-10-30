import { memo } from 'react'
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Copy({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { darkGray },
  } = useTheme()

  return (
    <Svg
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#a)"
        stroke={color || darkGray}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M16.667 7.5h-7.5c-.92 0-1.667.746-1.667 1.667v7.5c0 .92.746 1.666 1.667 1.666h7.5c.92 0 1.666-.746 1.666-1.666v-7.5c0-.92-.746-1.667-1.666-1.667Z" />
        <Path d="M4.166 12.5h-.833a1.666 1.666 0 0 1-1.667-1.667v-7.5a1.667 1.667 0 0 1 1.667-1.667h7.5a1.667 1.667 0 0 1 1.666 1.667v.833" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default memo(Copy)
