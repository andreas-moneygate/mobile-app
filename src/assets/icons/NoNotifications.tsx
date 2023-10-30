import { memo } from 'react'
import Svg, { Circle, ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg'

function NoNotifications({ color, ...props }: SvgProps) {
  return (
    <Svg width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
      <Circle cx="36" cy="36" r="36" fill="#F5F5F5" fillOpacity="0.2" />
      <G clipPath="url(#clip0_2855_13416)">
        <Path
          d="M43.8217 51.3329C43.8217 55.5672 40.3891 58.9995 36.1548 58.9995C31.9206 58.9995 28.4883 55.5672 28.4883 51.3329C28.4883 47.0987 31.9206 43.666 36.1548 43.666C40.3891 43.666 43.8217 47.0987 43.8217 51.3329Z"
          fill="white"
          fillOpacity="0.6"
        />
        <Path
          d="M49.5868 35.8493C43.0893 34.9214 38.0717 29.3342 38.0717 22.584C38.0717 20.6671 38.4816 18.8484 39.2081 17.1979C38.2269 16.968 37.2073 16.834 36.1548 16.834C28.7568 16.834 22.7383 22.8521 22.7383 30.2505V35.5941C22.7383 39.3872 21.0765 42.9676 18.1612 45.4324C17.4157 46.0686 16.9883 46.9983 16.9883 47.9796C16.9883 49.8295 18.4928 51.334 20.3423 51.334H51.9673C53.8172 51.334 55.3217 49.8295 55.3217 47.9796C55.3217 46.9983 54.8943 46.0686 54.1295 45.4152C51.3005 43.0213 49.6598 39.5462 49.5868 35.8493Z"
          fill="white"
        />
        <Path
          d="M61.0712 22.5835C61.0712 27.8762 56.7805 32.1665 51.4877 32.1665C46.195 32.1665 41.9043 27.8762 41.9043 22.5835C41.9043 17.2907 46.195 13 51.4877 13C56.7805 13 61.0712 17.2907 61.0712 22.5835Z"
          fill="#FB7021"
        />
        <Path
          d="M56.6673 19.5L50.2507 25.9167L47.334 23"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_2855_13416">
          <Rect width="46" height="46" fill="white" transform="translate(16 13)" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default memo<SvgProps>(NoNotifications)
