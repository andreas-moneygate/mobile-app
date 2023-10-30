import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  AccountPicker,
  Button,
  Column,
  Container,
  SmallBackground,
} from 'components'
import { ItemPicker } from 'components/picker/ItemPicker'
import useClients from 'hooks/useClients'
import moment from 'moment'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { getFeeStatement } from 'utils/apiQueries/account'
import { I18N_NAMESPACES } from 'utils/i18n'

function FeeStatement() {
  const { goBack, navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.AccountDetails>>()
  const { t } = useTranslation()
  const { selectedClient } = useClients()
  const [isLoading, setIsLoading] = useState(false)
  const [year, setYear] = useState(moment().format('YYYY'))

  const [selectedAccount, setSelectedAccount] = useState(
    params?.from?.accountNumber ? params?.from : selectedClient?.accounts?.[0],
  )

  const handleSelectYear = useCallback((value: unknown) => {
    setYear(value as string)
  }, [])

  const years = useMemo(() => {
    const years = []
    for (let i = moment(selectedAccount.openingDate).year(); i <= moment().year(); i++) {
      years.push({
        label: i.toString(),
        value: i.toString(),
      })
    }
    return years
  }, [selectedAccount])

  useEffect(() => {
    setYear(moment().format('YYYY'))
  }, [selectedAccount])

  const handleGetStatement = useCallback(async () => {
    if (selectedAccount?.accountNumber && !isLoading) {
      setIsLoading(true)
      const endOfYear = moment(year).endOf('year')
      const query = {
        fromDate: moment(year).startOf('year').format('YYYY-MM-DD'),
        toDate: (moment().isBefore(endOfYear) ? moment() : endOfYear).format('YYYY-MM-DD'),
      }

      const feeStatement = await getFeeStatement(selectedAccount.accountNumber, query)
      setIsLoading(false)

      const fileName = `${t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::FEE_STATEMENT_FILE_NAME`)}_${
        selectedAccount.accountNumber
      }`

      navigate(ROUTES.DocumentPreview, { fileName, file: feeStatement })
    }
  }, [selectedAccount?.accountNumber, isLoading, t, navigate, year])

  return (
    <Wrapper safeBottom>
      <Column>
        <SmallBackground>
          <AccountHeader
            title={t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::REQUEST_FEE_STATEMENT`)}
            onBack={goBack}
          />
        </SmallBackground>

        <Column ph="l" pt="l">
          <AccountPicker
            accounts={selectedClient.accounts}
            initialAccount={selectedAccount}
            onSelect={setSelectedAccount}
          />
        </Column>
        <Column ph="l" pt="l">
          <ItemPicker
            title={t('YEAR') as string}
            data={years}
            value={year}
            onSelect={handleSelectYear}
          />
        </Column>
      </Column>

      <Column>
        <Button
          title={t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::GET_STATEMENT`)}
          onPress={handleGetStatement}
          disabled={!year}
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

export default memo(FeeStatement)
