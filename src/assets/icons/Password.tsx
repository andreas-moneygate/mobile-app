import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Password({ color, ...props }: SvgProps & SvgIconProps) {
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
        d="M9.615 2.045 5.041 3.768c-1.054.395-1.916 1.641-1.916 2.76v6.81c0 1.082.715 2.503 1.586 3.154l3.941 2.942c1.293.972 3.42.972 4.712 0l3.942-2.942c.87-.651 1.586-2.072 1.586-3.154v-6.81c0-1.128-.862-2.375-1.916-2.769l-4.574-1.714c-.78-.284-2.026-.284-2.787 0Z"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m8.297 10.882 1.476 1.476 3.941-3.942"
        stroke={color || pumpkin85}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default memo(Password)
