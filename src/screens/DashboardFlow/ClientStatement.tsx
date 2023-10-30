import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  AccountHeader,
  Button,
  Column,
  Container,
  PaymentDetailsInput,
  PeriodPicker,
  SmallBackground,
} from 'components'
import useClients from 'hooks/useClients'
import moment from 'moment'
import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { getClientStatements } from 'utils/apiQueries/client'
import { submitFormatDate } from 'utils/date'
import { I18N_NAMESPACES } from 'utils/i18n'

interface Query {
  maxTransactionsPerAccount?: number
  fromDate?: string
  toDate?: string
}

function ClientStatement() {
  const { goBack, navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { t } = useTranslation()
  const { selectedClient } = useClients()
  const [isLoading, setIsLoading] = useState(false)

  const [selectedQuery, setSelectedQuery] = useState<Query>({
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
    if (selectedClient?.id && !isLoading) {
      setIsLoading(true)
      const query = { ...selectedQuery }
      if (query.maxTransactionsPerAccount) {
        query.fromDate = moment().subtract(1, 'years').format('YYYY-MM-DD')
        query.toDate = moment().format('YYYY-MM-DD')
      }
      const clientStatement = await getClientStatements(selectedClient.id, query)

      setIsLoading(false)

      const fileName = `${t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::CLIENT_STATEMENT_FILE_NAME`)}_${
        selectedClient.title
      }`

      navigate(ROUTES.DocumentPreview, { fileName, file: clientStatement })
    }
  }, [selectedClient?.id, selectedClient.title, isLoading, selectedQuery, navigate, t])

  return (
    <Wrapper safeBottom>
      <Column>
        <SmallBackground>
          <AccountHeader
            title={t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::REQUEST_CLIENT_STATEMENT`)}
            onBack={goBack}
          />
        </SmallBackground>

        <PeriodPicker value={selectedQuery} onSelect={setSelectedQuery} />
      </Column>

      <Column>
        <PaymentDetailsInput
          value={selectedPeriod}
          placeholder={t('NO_DATES_SELECTED') as string}
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

export default memo(ClientStatement)
