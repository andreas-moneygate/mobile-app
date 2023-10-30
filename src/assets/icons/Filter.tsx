import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function Filter({ color, ...props }: SvgProps) {
  const {
    colors: { midGray },
  } = useTheme()

  return (
    <Svg width={22} height={22} viewBox="0 0 22 22" {...props}>
      <Path
        d="M4.95003 1.92499H17.05C18.0584 1.92499 18.8834 2.74999 18.8834 3.75832V5.77499C18.8834 6.50832 18.425 7.42499 17.9667 7.88332L14.025 11.3667C13.475 11.825 13.1084 12.7417 13.1084 13.475V17.4167C13.1084 17.9667 12.7417 18.7 12.2834 18.975L11 19.8C9.80837 20.5333 8.15837 19.7083 8.15837 18.2417V13.3833C8.15837 12.7417 7.7917 11.9167 7.42503 11.4583L3.9417 7.79165C3.48337 7.33332 3.1167 6.50832 3.1167 5.95832V3.84999C3.1167 2.74999 3.9417 1.92499 4.95003 1.92499Z"
        stroke={color || midGray}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  )
}

export default memo<SvgProps>(Filter)
