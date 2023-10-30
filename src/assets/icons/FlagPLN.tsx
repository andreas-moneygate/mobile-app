import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { SvgIconProps } from 'types/ui'

function FlagPLN({ ...props }: SvgIconProps & SvgProps) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M30 15v.005H0V15C0 6.716 6.716 0 15 0c8.284 0 15 6.716 15 15Z" fill="#fff" />
      <Path d="M30 15v.005C30 23.287 23.282 30 15 30S.003 23.287 0 15.005V15h30Z" fill="#DB1B1B" />
      <Path
        d="M17.197.16C9.955 1.223 4.395 7.462 4.395 15v.005H0V15C0 6.716 6.716 0 15 0c.735 0 1.47.053 2.197.16Z"
        fill="#DDD"
      />
      <Path
        d="M17.197 29.84c-.727.107-1.462.16-2.197.16C6.718 30 .003 23.287 0 15.005V15h4.395v.005c.002 7.535 5.562 13.772 12.802 14.835Z"
        fill="#AA1818"
      />
      <Path
        d="M27.023 19.878a.954.954 0 1 0 0-1.908.954.954 0 0 0 0 1.908ZM28.052 17.9a.676.676 0 1 0 0-1.35.676.676 0 0 0 0 1.35Z"
        fill="#E83434"
      />
    </Svg>
  )
}

export default memo(FlagPLN)
