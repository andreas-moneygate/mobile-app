import { BodySmall } from 'components/typography/BodySmall'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import styled from 'styled-components/native'

import { Row } from './Row'

interface SimpleToastProps {
  show: boolean
  text: string
}

export const SimpleToast = ({ show, text }: SimpleToastProps) =>
  show ? (
    <AnimatedView entering={FadeIn} exiting={FadeOut}>
      <Row justifyContent="center" bg="darkGray" br={25} pv="xs" ph="s">
        <BodySmall color="white">{text}</BodySmall>
      </Row>
    </AnimatedView>
  ) : null

const AnimatedView = styled(Animated.View)`
  position: absolute;
  top: -5px;
  right: 25px;
`
