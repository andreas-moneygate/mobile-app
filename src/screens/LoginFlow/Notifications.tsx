import { NavigationProp, useNavigation } from '@react-navigation/native'
import icons from 'assets/icons'
import images from 'assets/images'
import {
  BodySmall,
  Button,
  Caption,
  Centered,
  Column,
  Container,
  IconButton,
  KeyboardAvoidingView,
  NotificationsCard,
  Title,
} from 'components'
import { memo, useCallback } from 'react'
import { Image } from 'react-native'
import { DashboardStackParamList, LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'

function Notifications() {
  const { goBack, navigate } =
    useNavigation<NavigationProp<LogInStackParamList & DashboardStackParamList>>()

  const navigateHome = useCallback(() => navigate(ROUTES.Home), [navigate])

  return (
    <Container type="secondary">
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column alignItems="flex-start" mt="m">
            <IconButton icon={icons.arrowLeft} onPress={goBack} />
            <Title mt="m">Don’t miss anything</Title>
            <BodySmall mt="s">
              Get notified when something important happens, like balance changes, security alerts,
              so you're always in the know.
            </BodySmall>
          </Column>
          <Column alignItems="center">
            <Column>
              <Ellipse source={images.ellipse} />
              <IPhone source={images.iPhone13Pro} />
            </Column>
            <NotificationsCard />
            <Info>
              <Caption color="darkGray">You can change this settings any time</Caption>
            </Info>
          </Column>
          <Column>
            <Button title="Enable Push notifications" mb="m" onPress={navigateHome} />
            <Button type="light" title="Not now" mb="l" onPress={navigateHome} />
          </Column>
        </ScrollWrapper>
      </KeyboardAvoidingView>
    </Container>
  )
}

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingHorizontal: 20,
  },
}))``

const Ellipse = styled(Image)`
  height: 220px;
  width: 220px;
  margin-top: ${({ theme }) => theme.spacings.xs}px;
`
const IPhone = styled(Image)`
  height: 140px;
  width: 220px;
  position: absolute;
`

const Info = styled(Centered)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin-top: ${({ theme }) => theme.spacings.l}px;
  width: 280px;
  height: 40px;
`

export default memo(Notifications)
