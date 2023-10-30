import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Repeat({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      {...props}
    >
      <Path
        d="M15.968 4.042H4.94L6.664 2.32a.692.692 0 0 0 0-.972.692.692 0 0 0-.972 0L2.795 4.244a.711.711 0 0 0-.201.486.711.711 0 0 0 .202.486l2.896 2.896a.68.68 0 0 0 .486.202.68.68 0 0 0 .486-.202.692.692 0 0 0 0-.971L4.94 5.417h11.028c1.137 0 2.062.926 2.062 2.063v3.043c0 .376.312.688.688.688a.692.692 0 0 0 .687-.688V7.48a3.439 3.439 0 0 0-3.437-3.438ZM19.405 17.27a.712.712 0 0 0-.202-.486l-2.896-2.897a.692.692 0 0 0-.972 0 .692.692 0 0 0 0 .972l1.724 1.723H6.03A2.066 2.066 0 0 1 3.97 14.52v-3.043a.692.692 0 0 0-.688-.688.692.692 0 0 0-.687.688v3.043a3.439 3.439 0 0 0 3.437 3.437H17.06l-1.724 1.724a.692.692 0 0 0 0 .971.68.68 0 0 0 .486.202.68.68 0 0 0 .486-.202l2.897-2.896a.712.712 0 0 0 .201-.486Z"
        fill={color || white}
      />
    </Svg>
  )
}

export default memo(Repeat)
