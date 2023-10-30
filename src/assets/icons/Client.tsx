import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'
import { SvgIconProps } from 'types/ui'

function Client({ color, ...props }: SvgProps & SvgIconProps) {
  const {
    colors: { pumpkin85 },
  } = useTheme()

  return (
    <Svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path
        d="m16.957 3.768-4.574-1.715c-.76-.284-2.007-.284-2.768 0L5.041 3.768c-1.054.394-1.916 1.64-1.916 2.759v6.81c0 1.082.715 2.503 1.586 3.154l3.941 2.942c1.293.972 3.42.972 4.712 0l3.942-2.942c.87-.651 1.586-2.072 1.586-3.153V6.527c-.019-1.119-.88-2.365-1.934-2.76Zm-6.022 2.676c1.082 0 1.962.88 1.962 1.962a1.947 1.947 0 0 1-1.889 1.952h-.091c-1.1-.036-1.925-.889-1.925-1.952a1.948 1.948 0 0 1 1.943-1.962Zm2.072 8.553c-.56.366-1.284.559-2.008.559s-1.457-.183-2.007-.56c-.523-.348-.807-.824-.816-1.347 0-.513.293-1.008.816-1.356 1.109-.734 2.915-.734 4.024 0 .522.348.816.825.816 1.347-.01.513-.303 1.008-.825 1.357Z"
        fill={color || pumpkin85}
      />
    </Svg>
  )
}

export default memo(Client)
