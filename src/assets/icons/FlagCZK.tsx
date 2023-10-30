import { memo } from 'react'
import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from 'react-native-svg'
import { SvgIconProps } from 'types/ui'

function FlagCZK({ ...props }: SvgIconProps & SvgProps) {
  return (
    <Svg width="30" height="31" viewBox="0 0 30 31" fill="none" {...props}>
      <G clipPath="url(#clip0_4169_12646)">
        <G clipPath="url(#clip1_4169_12646)">
          <Path
            d="M0.00134277 15.9989C0.00134277 13.4282 0.647865 11.0086 1.78746 8.89374L29.9987 15.9989L2.12019 23.689C0.774776 21.4404 0.00134277 18.8097 0.00134277 15.9989Z"
            fill="#14477D"
          />
          <Path
            d="M21.2123 15.9989H29.9987C29.9986 7.71487 23.2835 1 14.9997 1C19.1415 1 21.2123 8.49945 21.2123 15.9989Z"
            fill="#F3F4F5"
          />
          <Path
            d="M14.9997 30.9976C14.9111 30.9976 14.8246 30.9962 14.7371 30.9953C14.8247 30.9972 14.9118 31 14.9997 31C23.2835 31 29.9986 24.2851 29.9986 16.0014H21.2123C21.212 23.4998 19.141 30.9976 14.9997 30.9976Z"
            fill="#DB2F2A"
          />
          <Path
            d="M1.78766 8.89373L15 15.9989H21.2123C21.2123 8.49945 19.1416 1 14.9997 1C9.28691 1 4.31998 4.19379 1.78766 8.89373Z"
            fill="#F3F4F5"
          />
          <Path
            d="M21.2123 16.0013H15L1.75781 23.0507C4.24232 27.7086 9.11281 30.8988 14.7371 30.9954C14.8247 30.9963 14.9112 30.9977 14.9997 30.9977C19.141 30.9976 21.2121 23.4998 21.2123 16.0013Z"
            fill="#DB2F2A"
          />
        </G>
        <Path
          opacity="0.08"
          d="M16.9629 30.8737C16.3217 30.9562 15.6758 30.9975 15.0293 30.9974C6.74531 30.9974 0.0292969 24.2814 0.0292969 15.9974C0.0292969 7.71339 6.74531 0.997376 15.0293 0.997376C15.6758 0.997276 16.3217 1.03857 16.9629 1.12101C9.5918 2.06964 3.89648 8.36788 3.89648 15.9974C3.89648 23.6269 9.5918 29.9251 16.9629 30.8737Z"
          fill="black"
        />
        <Path
          opacity="0.06"
          d="M16.9629 30.8737C16.3217 30.9562 15.6758 30.9975 15.0293 30.9974C6.74531 30.9974 0.0292969 24.2814 0.0292969 15.9974C0.0292969 7.71339 6.74531 0.997376 15.0293 0.997376C15.6758 0.997276 16.3217 1.03857 16.9629 1.12101C9.5918 2.06964 3.89648 8.36788 3.89648 15.9974C3.89648 23.6269 9.5918 29.9251 16.9629 30.8737Z"
          fill="black"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4169_12646">
          <Rect width="30" height="30" fill="white" transform="translate(0 0.997375)" />
        </ClipPath>
        <ClipPath id="clip1_4169_12646">
          <Rect width="30" height="30" fill="white" transform="translate(0 1)" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default memo(FlagCZK)