import { NavigationProp, useNavigation } from '@react-navigation/native'
import icons from 'assets/icons'
import { Button } from 'components/buttons/Button'
import { Column } from 'components/layout/Column'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components'
import colors from 'theme/colors'
import { I18N_NAMESPACES } from 'utils/i18n'
import { renderIcon } from 'utils/ui'

interface NoTransactionsProps {
  inSearch?: boolean
  transactionFilters: any
  isLoading: boolean
  changeTransactionFilters: (options: any) => void
}

export const NoTransactions = ({
  inSearch,
  transactionFilters,
  changeTransactionFilters,
  isLoading,
}: NoTransactionsProps) => {
  const { navigate } =
    useNavigation<NavigationProp<DashboardStackParamList & MoneyTransferStackParamList>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

  const withFilters = !transactionFilters.isDefault

  const goToFilters = useCallback(() => {
    navigate(ROUTES.Filter)
  }, [])

  const resetFilters = useCallback(() => {
    changeTransactionFilters({ reset: true })
  }, [])

  return (
    <Wrapper>
      {isLoading ? (
        <ActivityIndicator color={colors.pumpkin} size="large" />
      ) : withFilters ? (
        <WithFiltersWrapper>
          <WithoutButtons>
            {renderIcon(icons.noTransactionsFound)}
            <BodySmall fontWeight="600">{t('NO_TRANSACTIONS_FOUND')}</BodySmall>
            <Caption textAlign="center">{t('NO_TRANSACTIONS_FOUND_DESCRIPTION')}</Caption>
          </WithoutButtons>
          {!inSearch ? (
            <>
              <Button title={t('CHANGE_FILTER')} onPress={goToFilters} width="100%" mv={7} />
              <Button
                title={t('RESET_FILTER')}
                onPress={resetFilters}
                type="light"
                width="100%"
                mv={7}
              />
            </>
          ) : null}
        </WithFiltersWrapper>
      ) : (
        <WithoutFiltersWrapper>
          {renderIcon(icons.noTransactions)}
          <BodySmall fontWeight="600">{t('NO_TRANSACTIONS')}</BodySmall>
          <Caption textAlign="center">{t('NO_TRANSACTIONS_DESCRIPTION')} </Caption>
        </WithoutFiltersWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Column)`
  justify-content: center;
  align-items: center;
  width: 100%;
`

const WithFiltersWrapper = styled(Column)`
  padding-top: 100px;
  width: 100%;
`

const WithoutButtons = styled(Column)`
  height: 160px;
  width: 100%;
  margin-bottom: 75px;
  justify-content: space-around;
  align-items: center;
`

const WithoutFiltersWrapper = styled(Column)`
  margin-top: 130px;
  height: 160px;
  padding: 0 17%;
  justify-content: space-around;
  align-items: center;
`
