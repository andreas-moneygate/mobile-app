import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  AccountHeader,
  AccountPicker,
  BodySmall,
  Button,
  Column,
  Container,
  ErrorMessage,
  KeyboardAvoidingView,
  MedBackground,
  Row,
  TextInput,
} from 'components'
import { InputLoadingIndicator } from 'components/input/InputLoadingIndicator'
import useClients from 'hooks/useClients'
import useErrorHandler from 'hooks/useErrorModal'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useQuery } from 'react-query'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { validateAccountNumber } from 'utils/apiQueries/transaction'
import { I18N_NAMESPACES } from 'utils/i18n'
import { filterPositiveAccounts } from 'utils/mappers'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'
import { withoutSpaces } from 'utils/ui'
import { Keyboard } from 'react-native'

function ToMoneyGateSecondStep() {
  const { goBack, navigate, setParams } =
    useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } =
    useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.ToMoneyGateSecondStep>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const accountNumberInputRef = useRef<any>(null)
  const { selectedClient } = useClients()

  const fromAccounts = useMemo(
    () => filterPositiveAccounts(selectedClient.accounts) || [],
    [selectedClient.accounts],
  )

  const [toAccountNumber, setToAccountNumber] = useState(params?.to || '')
  const [fromAccount, setFromAccount] = useState<MappedAccount | undefined>(
    params?.from?.accountNumber ? params.from : fromAccounts[0],
  )

  useEffect(() => {
    accountNumberInputRef?.current?.focus()
  }, [])

  useEffect(() => {
    if (params?.resetData) {
      setToAccountNumber('')
      setFromAccount(fromAccounts[0])
      setParams({ resetData: false })
    }
  }, [params?.resetData])

  const handleValidationError = useCallback(
    (err: unknown) => {
      if (err?.status === 404) {
        showErrorModal(t('ACCOUNT_NOT_FOUND'))
      } else {
        showErrorModal(err)
      }
    },
    [t],
  )

  const { data: validatedAccount, isLoading } = useQuery(
    ['validateAccount', toAccountNumber],
    validateAccountNumber,
    {
      onSuccess: (result) => { if (result) { Keyboard.dismiss() } },
      onError: handleValidationError,
    },
  )

  const handleClick = useCallback(() => {
    if (fromAccount && validatedAccount && toAccountNumber) {
      navigate(ROUTES.EnterAmount, {
        from: fromAccount,
        to: {
          accountNumber: toAccountNumber,
          client: validatedAccount.clientName,
          title: toAccountNumber,
          currency: validatedAccount.currency,
        },
        type: CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT,
        amount: params?.amount,
        paymentDetails: params?.paymentDetails,
      })
    }
  }, [
    fromAccount,
    validatedAccount,
    toAccountNumber,
    navigate,
    params?.amount,
    params?.paymentDetails,
  ])

  const onChangeText = useCallback(
    (value: string) => {
      setToAccountNumber(value)
      hideErrorModal()
    },
    [],
  )

  return (
    <Container safeBottom type="secondary">
      <KeyboardAvoidingView behavior="padding">
        <MedBackground>
          <AccountHeader title={t('TO_MNGT_CUSTOMER')} onBack={goBack} />
        </MedBackground>

        {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}
        <KeyboardAwareScroll
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll={false}
        >
          <Column>
            <BodySmall fontWeight="600" mh="l" mt="xl">
              From Account
            </BodySmall>
            <AccountPicker
              accounts={fromAccounts}
              initialAccount={fromAccount}
              onSelect={setFromAccount}
              mh="l"
              mt="m"
            />

            <BodySmall fontWeight="600" mh="l" mt="xl">
              To Account
            </BodySmall>

            <TextInput
              label={t('MONEYGATE_ACCOUNT_NUMBER') as string}
              value={withoutSpaces(toAccountNumber)}
              autoCorrect={false}
              onChangeText={onChangeText}
              rightAddon={
                <InputLoadingIndicator isLoading={isLoading} isValid={Boolean(validatedAccount)} />
              }
              mt="m"
              mh="l"
            />

            {validatedAccount?.clientName ? (
              <NameWrapper>
                <BodySmall color="midGray">{t(`${I18N_NAMESPACES.COMMON}::NAME`)}</BodySmall>
                <BodySmall>{validatedAccount?.clientName}</BodySmall>
              </NameWrapper>
            ) : null}
          </Column>
          <Button
            onPress={handleClick}
            disabled={!validatedAccount || !fromAccount}
            title={t(`${I18N_NAMESPACES.COMMON}::CONTINUE`) as string}
            m="l"
          />
        </KeyboardAwareScroll>
      </KeyboardAvoidingView>
    </Container>
  )
}

const NameWrapper = styled(Row)`
  padding: 15px;
  margin: 20px;
  margin-top: 10px;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 10px;
`

const KeyboardAwareScroll = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
}))`
  background-color: ${({ theme }) => theme.colors.white};
`

export default memo(ToMoneyGateSecondStep)
