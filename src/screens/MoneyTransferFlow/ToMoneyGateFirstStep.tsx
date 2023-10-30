import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  BodySmall,
  Button,
  Caption,
  Container,
  KeyboardAvoidingView,
  MedBackground,
  SearchInput,
  TransferHistoryCustomerCard,
} from 'components'
import useTransferHistoryCustomer from 'hooks/useTransferHistoryCustomer'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { AccountCustomer } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'

function ToMoneyGateCustomer() {
  const { goBack, navigate } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.ToMoneyGateFirstStep>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const transferHistoryCustomerData = useTransferHistoryCustomer()
  const [accountNumber, setAccountNumber] = useState('')

  const filteredData = useMemo(() => {
    if (isNaN(Number(accountNumber))) {
      return transferHistoryCustomerData.filter((transfer: AccountCustomer) =>
        transfer.beneficiaryName.toLowerCase().includes(accountNumber.toLowerCase()),
      )
    }
    return transferHistoryCustomerData.filter((transfer: AccountCustomer) =>
      transfer.accountNumber.includes(accountNumber),
    )
  }, [transferHistoryCustomerData, accountNumber])

  const onCreateTransfer = useCallback(
    (recipientAccount: MappedAccount) => () =>
      navigate(ROUTES.ToMoneyGateSecondStep, {
        from: params?.from,
        to: recipientAccount?.accountNumber,
        amount: recipientAccount?.amount,
        paymentDetails: recipientAccount?.paymentDetails,
      }),
    [navigate, params],
  )

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <TransferHistoryCustomerCard {...item} mt="l" onPress={onCreateTransfer(item)} />
    ),
    [onCreateTransfer],
  )

  const handleSearch = useCallback((text: string) => setAccountNumber(text), [])

  const onReset = useCallback(() => setAccountNumber(''), [])

  const onCreate = useCallback(() => {
    navigate(ROUTES.ToMoneyGateSecondStep, {
      from: params?.from,
    })
  }, [params, navigate])


  useEffect(() => {
    if (filteredData.length == 0) {
      goBack()
      navigate(ROUTES.ToMoneyGateSecondStep)
    }
  }, [])

  return (
    <Container safeBottom type="secondary">
      <KeyboardAvoidingView>
        <MedBackground>
          <AccountHeader title={t('TO_MNGT_CUSTOMER')} onBack={goBack} />
        </MedBackground>
        <BodySmall fontWeight="600" mh="l" mt="xl">
          {t('REPEAT_TRANSACTION')}
        </BodySmall>
        <SearchInput
          placeholder={t(`${I18N_NAMESPACES.COMMON}::SEARCH`) as string}
          value={accountNumber}
          onChangeText={handleSearch}
          onReset={onReset}
          outline
          search
        />
        {filteredData.length > 0 ? (
          <List
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollWrapper>
            <Caption color="darkGray" mt="l">
              {accountNumber.length < 11
                ? 'No matching results found'
                : 'Now you can create payment'}
            </Caption>
          </ScrollWrapper>
        )}
        <Button onPress={onCreate} title={t('CREATE_NEW_PAYMENT')} m="l" />
      </KeyboardAvoidingView>
    </Container>
  )
}

const List = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    padding: 20,
  },
}))`
  background-color: ${({ theme }) => theme.colors.white};
`

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingHorizontal: 20,
  },
}))``

export default memo(ToMoneyGateCustomer)
