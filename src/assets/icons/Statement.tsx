import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Statement({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin85 },
  } = useTheme()

  return (
    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="M14.466 1.833h-6.93c-3.465 0-4.327.926-4.327 4.62v10.322c0 2.438 1.338 3.016 2.96 1.274l.01-.009c.752-.797 1.897-.733 2.548.137l.926 1.238c.743.98 1.944.98 2.686 0l.926-1.238c.66-.88 1.806-.944 2.557-.137 1.632 1.742 2.961 1.164 2.961-1.274V6.453c.01-3.694-.852-4.62-4.317-4.62Zm-.715 8.938h-5.5a.693.693 0 0 1-.688-.688c0-.375.312-.687.688-.687h5.5c.376 0 .687.312.687.687a.693.693 0 0 1-.687.688Zm.916-3.667H7.334a.693.693 0 0 1-.688-.687c0-.376.312-.688.688-.688h7.333c.376 0 .688.312.688.688a.692.692 0 0 1-.688.687Z"
        fill={color || pumpkin85}
      />
    </Svg>
  )
}

export default memo(Statement)
