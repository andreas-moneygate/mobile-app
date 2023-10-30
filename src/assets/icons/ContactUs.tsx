import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function ContactUs({ color, ...props }: SvgProps & SvgIconProps) {
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
        d="M7.792 17.417h-.458c-3.667 0-5.5-.916-5.5-5.5V7.334c0-3.667 1.833-5.5 5.5-5.5h7.333c3.667 0 5.5 1.833 5.5 5.5v4.583c0 3.667-1.833 5.5-5.5 5.5h-.458a.929.929 0 0 0-.733.367L12.1 19.617c-.605.807-1.595.807-2.2 0l-1.375-1.833c-.147-.202-.486-.367-.734-.367Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.416 7.334h9.167M6.416 11.916h5.5"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(ContactUs)
