import { memo } from 'react'
import { ImageBackground, ImageSourcePropType } from 'react-native'
import styled from 'styled-components/native'

interface ImageBackgroundProps {
  children: JSX.Element
  image: ImageSourcePropType
}

export const Background = memo((props: ImageBackgroundProps & any) => {
  const { image, children, ...restProps } = props
  return (
    <StyledImage source={image} resizeMode="cover" {...restProps}>
      {children}
    </StyledImage>
  )
})

const StyledImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  flex: 1px;
`
