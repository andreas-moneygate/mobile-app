import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'
import images from 'assets/images'
import { Background, BodySmall, Button, Column, Title } from 'components'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DashboardStackParamList, LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { I18N_NAMESPACES } from 'utils/i18n'

function SuccessPassword() {
  const { navigate } =
    useNavigation<NavigationProp<LogInStackParamList & DashboardStackParamList>>()
  const {
    params: { isPhone, isForgotPassword },
  } = useRoute<NavigationProp<LogInStackParamList & DashboardStackParamList>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const insets = useSafeAreaInsets()

  const onNext = useCallback(() => {
    navigate(isForgotPassword ? ROUTES.Login : ROUTES.Home)
  }, [navigate, isForgotPassword])

  return (
    <Background image={images.background}>
      <Content mh="l">
        <TickCircle source={images.tickCircle} />
        <TitlePass>{isPhone ? t('PHONE_CHANGED') : t('PASSWORD_CHANGED')}</TitlePass>
        <Description>
          {isPhone ? t('PHONE_CHANGED_DESCRIPTION') : t('PASSWORD_CHANGED_DESCRIPTION')}
        </Description>
        <ContainerBtn mb={insets.bottom}>
          <Button title="Done" onPress={onNext} />
        </ContainerBtn>
      </Content>
    </Background>
  )
}

const Content = styled(Column)`
  justify-content: center;
  align-items: center;
  flex: 1;
`

const ContainerBtn = styled(Column)`
  width: 100%;
  position: absolute;
  bottom: 20px;
`

const TitlePass = styled(Title)`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacings.l}px;
`

const Description = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacings.s}px;
  text-align: center;
`

const TickCircle = styled(Image)`
  height: 60px;
  width: 60px;
`

export default memo(SuccessPassword)
