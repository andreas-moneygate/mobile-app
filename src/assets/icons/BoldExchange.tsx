import { memo } from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
import { useTheme } from 'styled-components/native'

function BoldExchange({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" {...props}>
      <Path
        d="M20.8268 19.9267H8.08417L10.0295 17.9815C10.2539 17.7571 10.3799 17.4528 10.3799 17.1356C10.3799 16.8183 10.2539 16.514 10.0295 16.2897C9.80518 16.0654 9.50091 15.9393 9.18364 15.9393C8.86638 15.9393 8.56211 16.0654 8.33777 16.2897L4.35038 20.2771C4.2393 20.3882 4.15118 20.52 4.09106 20.6652C4.03094 20.8103 4 20.9659 4 21.123C4 21.2801 4.03094 21.4356 4.09106 21.5807C4.15118 21.7259 4.2393 21.8578 4.35038 21.9688L8.33777 25.9562C8.56211 26.1806 8.86638 26.3066 9.18364 26.3066C9.50091 26.3066 9.80518 26.1806 10.0295 25.9562C10.2539 25.7319 10.3799 25.4276 10.3799 25.1103C10.3799 24.7931 10.2539 24.4888 10.0295 24.2645L8.08417 22.3192H20.8268C21.1441 22.3192 21.4483 22.1931 21.6727 21.9688C21.897 21.7445 22.023 21.4402 22.023 21.123C22.023 20.8057 21.897 20.5014 21.6727 20.2771C21.4483 20.0528 21.1441 19.9267 20.8268 19.9267Z"
        fill={color || white}
      />
      <Path
        d="M9.95445 8.8684H22.6971L20.7517 6.9231C20.5274 6.69876 20.4014 6.39449 20.4014 6.07723C20.4014 5.75996 20.5274 5.45569 20.7517 5.23135C20.9761 5.00701 21.2803 4.88098 21.5976 4.88098C21.9149 4.88098 22.2191 5.00701 22.4435 5.23135L26.4309 9.21874C26.542 9.32982 26.6301 9.46169 26.6902 9.60682C26.7503 9.75196 26.7812 9.90752 26.7812 10.0646C26.7812 10.2217 26.7503 10.3773 26.6902 10.5224C26.6301 10.6675 26.542 10.7994 26.4309 10.9105L22.4435 14.8979C22.2191 15.1222 21.9149 15.2482 21.5976 15.2482C21.2803 15.2482 20.9761 15.1222 20.7517 14.8979C20.5274 14.6735 20.4014 14.3693 20.4014 14.052C20.4014 13.7347 20.5274 13.4305 20.7517 13.2061L22.6971 11.2608H9.95445C9.63719 11.2608 9.33293 11.1348 9.1086 10.9105C8.88426 10.6861 8.75823 10.3819 8.75823 10.0646C8.75823 9.74735 8.88426 9.44309 9.1086 9.21876C9.33293 8.99443 9.63719 8.8684 9.95445 8.8684Z"
        fill={color || white}
      />
    </Svg>
  )
}

export default memo<SvgProps>(BoldExchange)
