import images from 'assets/images'
import { memo } from 'react'
import { ImageBackground, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

interface ImageBackgroundProps {
  children: JSX.Element
  image: ImageSourcePropType
}

export const MedBackground = memo((props: ImageBackgroundProps & any) => {
  const { image, children, ...restProps } = props
  return (
    <StyledImage source={images.medBG} resizeMode="cover" {...restProps}>
      {children}
    </StyledImage>
  )
})

const StyledImage = styled(ImageBackground)`
  width: 100%;
`
