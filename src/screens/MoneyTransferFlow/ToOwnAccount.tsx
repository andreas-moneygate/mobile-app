import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AccountHeader, Button, Column, MedBackground } from 'components'
import { ClientAndAccountPickers } from 'components/picker/ClientAndAccountPickers'
import useClients from 'hooks/useClients'
import useGlobalSpinner from 'hooks/useGlobalSpinner'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { MappedClient } from 'types/mapped/client'
import { getAccounts } from 'utils/apiQueries/account'
import { I18N_NAMESPACES } from 'utils/i18n'
import { filterPositiveAccounts, mapAccountsData } from 'utils/mappers'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'

function ToOwnAccount() {
  const { goBack, navigate, setParams } =
    useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.ToOwnAccount>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const { clients, selectedClient } = useClients()
  const { showGlobalSpinner, hideGlobalSpinner } = useGlobalSpinner()
  const [fromClient, setFromClient] = useState<MappedClient>(
    clients.find(client => client.id === params?.from?.clientId) || selectedClient,
  )
  const [toClient, setToClient] = useState<MappedClient | undefined>(
    clients?.find(client =>
      params?.to?.clientId ? client.id === params?.to?.clientId : client.id !== fromClient.id,
    ),
  )
  const [fromAccount, setFromAccount] = useState<MappedAccount | undefined>(
    params?.from?.accountNumber ? params?.from : undefined,
  )
  const [toAccount, setToAccount] = useState<MappedAccount | undefined>(
    params?.to?.accountNumber ? params?.to : undefined,
  )

  useEffect(() => {
    showGlobalSpinner({ type: 'transparent' })
  }, [])

  useEffect(() => {
    if (params?.resetData) {
      setFromClient(selectedClient)
      setFromAccount(selectedClient?.accounts?.[0])
      const toClient = clients.find(client => client.id !== selectedClient.id) || selectedClient
      setToClient(toClient)
      setToAccount(
        toClient?.id !== selectedClient?.id
          ? toClient.accounts?.[0]
          : selectedClient?.accounts?.[1],
      )
      refetchFromAccounts()
      refetchToAccounts()
      setParams({ resetData: false })
    }
  }, [params?.resetData])

  const { data: fromAccountsData, refetch: refetchFromAccounts } = useQuery(
    ['accounts', fromClient.id],
    getAccounts,
    {
      enabled: Boolean(fromClient?.id),
      onSuccess: hideGlobalSpinner,
    },
  )
  const { data: toAccountsData, refetch: refetchToAccounts } = useQuery(
    ['accounts', toClient?.id],
    getAccounts,
    {
      enabled: Boolean(toClient?.id),
      onSuccess: hideGlobalSpinner,
    },
  )

  const fromAccounts = useMemo(
    () =>
      filterPositiveAccounts(
        fromAccountsData?.data?.map((acc, id) => mapAccountsData(acc, id, fromClient?.title)) || [],
      ),
    [fromAccountsData?.data, fromClient?.title],
  )

  const toAccounts = useMemo(
    () =>
      toAccountsData?.data
        .filter(acc => acc.accountNumber !== fromAccount?.accountNumber)
        .map((acc, id) => mapAccountsData(acc, id, toClient?.title)) || [],
    [fromAccount?.accountNumber, toAccountsData?.data, toClient?.title],
  )

  useEffect(() => {
    const fromAnotherClient = !fromAccounts.some(
      account => account.accountNumber === fromAccount?.accountNumber,
    )
    if (!fromAccount || fromAnotherClient) {
      const [initAccount] = fromAccounts
      setFromAccount(initAccount)
    } else {
      const updatedAccount = fromAccounts?.find(
        acc => acc.accountNumber === fromAccount?.accountNumber,
      )
      if (updatedAccount) {
        setFromAccount(updatedAccount)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAccounts])

  useEffect(() => {
    const fromAnotherClient = !toAccounts.some(
      account => account.accountNumber === toAccount?.accountNumber,
    )
    if ((fromAnotherClient || !toAccount) && toAccounts?.length) {
      const [initAccount] = toAccounts
      setToAccount(initAccount)
    } else if (fromAccounts?.length === 1 && !toAccounts?.length) {
      const anotherClient = clients?.find(
        client => client.id !== fromClient.id && client.id !== toClient?.id,
      )
      if (anotherClient) {
        setToClient(anotherClient)
      }
    } else {
      const updatedAccount = toAccounts?.find(acc => acc.accountNumber === toAccount?.accountNumber)
      if (updatedAccount) {
        setToAccount(updatedAccount)
      }
    }
  }, [toAccounts])

  const onCreateTransfer = useCallback(() => {
    if (toAccount && fromAccount) {
      navigate(ROUTES.EnterAmount, {
        from: fromAccount,
        to: toAccount,
        type: CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT,
        amount: params?.amount,
        paymentDetails: params?.paymentDetails,
      })
    }
  }, [fromAccount, navigate, params?.amount, params?.paymentDetails, toAccount])

  return (
    <Wrapper>
      <Column justifyContent="flex-start">
        <MedBackground>
          <AccountHeader title={t('TO_OWN_ACCOUNT')} onBack={goBack} />
        </MedBackground>

        <ClientAndAccountPickers
          key="from"
          title={t('FROM_ACCOUNT') as string}
          selectedClient={fromClient}
          accounts={fromAccounts}
          selectedAccount={fromAccount}
          onSelectClient={setFromClient}
          onSelectAccount={setFromAccount}
        />

        <ClientAndAccountPickers
          key="to"
          title={t('TO_ACCOUNT') as string}
          selectedClient={toClient}
          accounts={toAccounts}
          selectedAccount={toAccount}
          onSelectClient={setToClient}
          onSelectAccount={setToAccount}
        />
      </Column>

      <Button title={t('CREATE_NEW_PAYMENT')} m="l" mb={40} onPress={onCreateTransfer} />
    </Wrapper>
  )
}

const Wrapper = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  height: 100%;
  justify-content: space-between;
`

export default memo(ToOwnAccount)
