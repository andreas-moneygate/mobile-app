import { memo } from 'react'
import Svg, { ClipPath, Defs, G, Mask, Path, Rect, SvgProps } from 'react-native-svg'

function CardSmall(props: SvgProps) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_4034_12331)">
        <Mask
          id="path-1-outside-1_4034_12331"
          maskUnits="userSpaceOnUse"
          x="-0.75"
          y="1.75"
          width="21"
          height="21"
          fill="black"
        >
          <Rect fill="white" x="-0.75" y="1.75" width="21" height="16" />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.55769 3.75C2.28319 3.75 1.25 4.78319 1.25 6.05769V6.875H18.9583V6.05769C18.9583 4.78319 17.9251 3.75 16.6506 3.75H3.55769ZM18.9583 7.91667H1.25V13.9423C1.25 15.2168 2.28319 16.25 3.5577 16.25H16.6506C17.9251 16.25 18.9583 15.2168 18.9583 13.9423V7.91667Z"
          />
        </Mask>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.55769 3.75C2.28319 3.75 1.25 4.78319 1.25 6.05769V6.875H18.9583V6.05769C18.9583 4.78319 17.9251 3.75 16.6506 3.75H3.55769ZM18.9583 7.91667H1.25V13.9423C1.25 15.2168 2.28319 16.25 3.5577 16.25H16.6506C17.9251 16.25 18.9583 15.2168 18.9583 13.9423V7.91667Z"
          fill="#FB7021"
        />
        <Path
          d="M1.25 6.875H0.0961539V8.02885H1.25V6.875ZM18.9583 6.875V8.02885H20.1122V6.875H18.9583ZM18.9583 7.91667H20.1122V6.76282H18.9583V7.91667ZM1.25 7.91667V6.76282H0.0961539V7.91667H1.25ZM2.40385 6.05769C2.40385 5.42044 2.92044 4.90385 3.55769 4.90385V2.59615C1.64594 2.59615 0.0961539 4.14594 0.0961539 6.05769H2.40385ZM2.40385 6.875V6.05769H0.0961539V6.875H2.40385ZM1.25 8.02885H18.9583V5.72115H1.25V8.02885ZM17.8045 6.05769V6.875H20.1122V6.05769H17.8045ZM16.6506 4.90385C17.2879 4.90385 17.8045 5.42044 17.8045 6.05769H20.1122C20.1122 4.14594 18.5624 2.59615 16.6506 2.59615V4.90385ZM3.55769 4.90385H16.6506V2.59615H3.55769V4.90385ZM18.9583 6.76282H1.25V9.07051H18.9583V6.76282ZM2.40385 13.9423V7.91667H0.0961539V13.9423H2.40385ZM3.5577 15.0962C2.92044 15.0962 2.40385 14.5796 2.40385 13.9423H0.0961539C0.0961539 15.8541 1.64594 17.4038 3.5577 17.4038V15.0962ZM16.6506 15.0962H3.5577V17.4038H16.6506V15.0962ZM17.8045 13.9423C17.8045 14.5796 17.2879 15.0962 16.6506 15.0962V17.4038C18.5624 17.4038 20.1122 15.8541 20.1122 13.9423H17.8045ZM17.8045 7.91667V13.9423H20.1122V7.91667H17.8045Z"
          fill="white"
          mask="url(#path-1-outside-1_4034_12331)"
        />
        <Rect x="3.125" y="11.25" width="2.5" height="2.5" rx="0.625" fill="white" />
      </G>
      <Defs>
        <ClipPath id="clip0_4034_12331">
          <Rect width="20" height="20" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default memo<SvgProps>(CardSmall)
