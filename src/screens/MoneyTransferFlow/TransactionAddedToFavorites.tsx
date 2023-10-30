import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import images from 'assets/images'
import { Background, BodySmall, Button, Column, Container, Title } from 'components'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-native'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { I18N_NAMESPACES } from 'utils/i18n'

function TransactionAddedToFavorites() {
  const { navigate } =
    useNavigation<NavigationProp<MoneyTransferStackParamList & DashboardStackParamList>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

  const handleSubmit = useCallback(() => navigate(ROUTES.Home), [navigate])

  return (
    <Background image={images.background}>
      <Container type="transparent">
        <Wrapper mh="l">
          <Column alignItems="center" pb={100}>
            <TickCircle source={images.tickCircle} />
            <TitleSuccess>{t('TRANSACTION_SAVED')}</TitleSuccess>
            <Description>{t('TRANSACTION_SAVED_DESCRIPTION')}</Description>
          </Column>
          <ContainerBtn>
            <Button title={t(`${I18N_NAMESPACES.COMMON}::DONE`)} onPress={handleSubmit} />
          </ContainerBtn>
        </Wrapper>
      </Container>
    </Background>
  )
}

const Wrapper = styled(Column)`
  flex: 1;
  justify-content: center;
`

const ContainerBtn = styled(Column)`
  width: 100%;
  position: absolute;
  bottom: 20px;
`

const TitleSuccess = styled(Title)`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacings.l}px;
`

const Description = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacings.l}px;
  text-align: center;
`

const TickCircle = styled(Image)`
  height: 60px;
  width: 60px;
`

export default memo(TransactionAddedToFavorites)
