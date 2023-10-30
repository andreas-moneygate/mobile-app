import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AccountHeader, AccountPicker, Button, Column, Container, PaymentDetailsInput, PeriodPicker, SmallBackground } from 'components'
import useClients from 'hooks/useClients'
import moment from 'moment'
import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { getAccountStatement } from 'utils/apiQueries/account'
import { getClientStatements } from 'utils/apiQueries/client'
import { submitFormatDate } from 'utils/date'
import { I18N_NAMESPACES } from 'utils/i18n'

interface AccountStatementQuery {
  maxTransactionsPerAccount?: number
  fromDate?: string
  toDate?: string
}

function AccountStatement() {
  const { goBack, navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.AccountDetails>>()
  const { t } = useTranslation()
  const { selectedClient } = useClients()
  const [isLoading, setIsLoading] = useState(false)

  const [selectedAccount, setSelectedAccount] = useState(
    params?.from?.accountNumber ? params?.from : null
  )

  const [selectedQuery, setSelectedQuery] = useState<AccountStatementQuery>({
    fromDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
  })

  const selectedPeriod = useMemo(() => {
    if (selectedQuery.fromDate && selectedQuery.toDate) {
      return `${submitFormatDate(selectedQuery.fromDate)} - ${submitFormatDate(
        selectedQuery.toDate,
      )}`
    }
    if (selectedQuery.maxTransactionsPerAccount) {
      return t('LAST_TRANSACTIONS', { number: selectedQuery.maxTransactionsPerAccount })
    }
    return ''
  }, [selectedQuery, t])

  const handleResetQuery = useCallback(() => {
    setSelectedQuery({})
  }, [])

  const handleGetStatement = useCallback(async () => {
    if (!isLoading) {
      setIsLoading(true)
      const query = { ...selectedQuery }
      if (query.maxTransactionsPerAccount) {
        query.fromDate = moment().subtract(1, 'years').format('YYYY-MM-DD')
        query.toDate = moment().format('YYYY-MM-DD')
      }
      if (selectedAccount) {
        const accountStatement = await getAccountStatement(selectedAccount.accountNumber, query)
        setIsLoading(false)
        const fileName = `${t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::ACCOUNT_STATEMENT_FILE_NAME`)}_${selectedAccount.accountNumber
          }`
        navigate(ROUTES.DocumentPreview, { fileName, file: accountStatement })
      } else {
        const clientStatement = await getClientStatements(selectedClient.id, query)
        setIsLoading(false)
        const fileName = `${t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::CLIENT_STATEMENT_FILE_NAME`)}_${selectedClient.title
          }`
        navigate(ROUTES.DocumentPreview, { fileName, file: clientStatement })
      }
    }
  }, [selectedAccount?.accountNumber, isLoading, selectedQuery, t, navigate])

  return (
    <Wrapper safeBottom>
      <Column>
        <SmallBackground>
          <AccountHeader
            title={t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::REQUEST_ACCOUNT_STATEMENT`)}
            onBack={goBack}
          />
        </SmallBackground>

        <Column ph="l" pt="l">
          <AccountPicker
            accounts={selectedClient.accounts}
            initialAccount={selectedAccount}
            onSelect={setSelectedAccount}
            includesAllFilter={true}
          />
        </Column>

        <PeriodPicker value={selectedQuery} onSelect={setSelectedQuery} />
      </Column>

      <Column>
        <PaymentDetailsInput
          value={selectedPeriod}
          placeholder={t('NO_DATES_SELECTED')}
          onReset={handleResetQuery}
          editable={false}
        />
        <Button
          title={t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::GET_STATEMENT`)}
          onPress={handleGetStatement}
          disabled={!selectedPeriod}
          isLoading={isLoading}
          m="l"
        />
      </Column>
    </Wrapper>
  )
}

const Wrapper = styled(Container)`
  flex: 1px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: space-between;
`

export default memo(AccountStatement)
