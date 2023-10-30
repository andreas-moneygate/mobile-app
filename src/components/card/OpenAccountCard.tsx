import { NavigationProp, useNavigation } from '@react-navigation/native'
import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { Column } from 'components/layout/Column'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo, useCallback } from 'react'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components'

export const OpenAccountCard = memo(() => {
  const { navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()

  const handleGoToContactUs = useCallback(() => {
    navigate(ROUTES.ContactUs, { message: '' })
  }, [])

  return (
    <Card>
      <IconButton icon={icons.plus} onPress={handleGoToContactUs} />
      <BodySmall fontWeight="600">Open account</BodySmall>
      <Caption color="gray">Open your first Moneygate account to start</Caption>
    </Card>
  )
})

const Card = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  height: 125px;
  width: 100%;
  padding: ${({ theme }) => theme.spacings.l}px;
  margin-top: ${({ theme }) => theme.spacings.m}px;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
`
