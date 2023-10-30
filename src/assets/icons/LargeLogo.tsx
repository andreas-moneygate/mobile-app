import { memo } from 'react'
import Svg, { Defs, LinearGradient, Path, Rect, Stop, SvgProps } from 'react-native-svg'
import { SvgIconProps } from 'types/ui'

function LargeLogo({ ...props }: SvgIconProps & SvgProps) {
  return (
    <Svg width={40} height={40} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Rect width={40} height={40} rx={20} fill="#D9D9D9" />
      <Rect width={40} height={40} rx={20} fill="url(#a)" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m22.25 28.977-.004-.001-9.268-3.835a.717.717 0 0 1-.445-.66V13.682c0-.27.153-.517.398-.638a.734.734 0 0 1 .76.067l6.043 4.51.3.224.298-.223 6.043-4.511a.726.726 0 0 1 .76-.067.716.716 0 0 1 .398.638v10.145l-1.448-.41v-8.299l-.799.596-4.819 3.596a.732.732 0 0 1-.871 0l-4.82-3.595-.799-.597v9.021l.317.125 6.822 2.695.683.27V23.49l-.329-.12-2.71-.985.964-.727.017-.012.007-.007.004-.003a.525.525 0 0 1 .067-.038.944.944 0 0 1 .34-.088c.176-.015.315.002.404.02a.867.867 0 0 1 .102.027l.007.003.009.004.016.005 2.078.747a.72.72 0 0 1 .476.674v5.33c0 .24-.118.46-.32.593a.741.741 0 0 1-.681.064Z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient id="a" x1={2} y1={3.5} x2={36.5} y2={38} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#773358" />
          <Stop offset={1} stopColor="#B894A7" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default memo(LargeLogo)
