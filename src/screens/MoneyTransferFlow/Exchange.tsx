import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  AccountHeader,
  AccountPicker,
  BodySmall,
  Button,
  Caption,
  Column,
  Container,
  CurrencyExchangeRateBar,
  ExchangeInput,
  IconButton,
  KeyboardAvoidingView,
  PaymentDetailsInput,
  SmallBackground,
  Subtitle,
  TouchableOpacity,
} from 'components'
import useClients from 'hooks/useClients'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useQuery } from 'react-query'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { getCurrencyExchange } from 'utils/apiQueries/currency'
import { currencyEnum, currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'
import { filterPositiveAccounts } from 'utils/mappers'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'
import { checkIsNil, formatExchangeWithCourse, numbersWithDot } from 'utils/ui'
import { renderIcon } from 'utils/ui'

function Exchange() {
  const { goBack, navigate, setParams } =
    useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.Exchange>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const { selectedClient: customClient } = useClients()
  const sentAmountInput = useRef<TextInput>(null)
  const receivedAmountInput = useRef<TextInput>(null)
  const customAccounts = customClient?.accounts

  const [fromAccounts, setFromAccounts] = useState(filterPositiveAccounts(customAccounts) || [])

  const [fromAccount, setFromAccount] = useState<MappedAccount | undefined>(
    params?.from?.accountNumber ? params.from : fromAccounts[0],
  )

  const accountsToShow = useMemo(
    () => customAccounts?.filter(it => it.currency !== fromAccount?.currency) || [],
    [customAccounts, fromAccount],
  )

  const [toAccount, setToAccount] = useState<MappedAccount | undefined>(
    params?.to?.accountNumber
      ? params.to
      : accountsToShow.find(account => account.accountNumber !== fromAccount?.accountNumber),
  )

  useEffect(() => {
    const withoutToCurrency = filterPositiveAccounts(customAccounts)?.filter(
      acc => acc.currency !== toAccount?.currency,
    )
    setFromAccounts(withoutToCurrency || [])
  }, [toAccount?.currency, customAccounts])

  const [amountSent, setAmountSent] = useState(params?.amount?.toString() || '')
  const [amountReceived, setAmountReceived] = useState('')
  const [paymentDetails, setPaymentDetails] = useState(params?.paymentDetails || '')
  const [course, setCourse] = useState(1)

  useEffect(() => {
    if (params?.resetData) {
      setFromAccount(fromAccounts[0])
      setToAccount(
        accountsToShow.find(account => account.accountNumber !== fromAccounts[0]?.accountNumber),
      )
      setAmountSent('')
      setAmountReceived('')
      setPaymentDetails('')
      setParams({ resetData: false })
    }
  }, [params?.resetData, fromAccounts, accountsToShow])

  const defToAccount = useMemo(
    () => customAccounts?.find(it => it.id !== params?.from?.id),
    [customAccounts, params],
  )

  const toCurrency = useMemo(() => {
    const filterAccount = customAccounts?.find(it => it.id !== fromAccount?.id)
    if (!toAccount?.currency) {
      if (defToAccount?.currency !== fromAccount?.currency) {
        return defToAccount?.currency
      } else {
        return filterAccount?.currency
      }
    } else {
      return toAccount?.currency
    }
  }, [customAccounts, fromAccount, toAccount, defToAccount])

  useEffect(() => {
    if (fromAccount?.accountNumber === toAccount?.accountNumber) {
      const notFromAccount = customAccounts?.find(
        acc => acc.accountNumber !== fromAccount?.accountNumber,
      )
      setToAccount(notFromAccount)
    }
  }, [fromAccount?.accountNumber])

  useEffect(() => {
    if (sentAmountInput?.current?.isFocused()) {
      const amount = formatExchangeWithCourse(amountSent, course)
      setAmountReceived(amount)
    }
    if (receivedAmountInput?.current?.isFocused()) {
      const amount = formatExchangeWithCourse(amountReceived, course, true)
      setAmountSent(amount)
    }
  }, [amountSent, amountReceived, course])

  useEffect(() => {
    if (!sentAmountInput?.current?.isFocused() && !receivedAmountInput?.current?.isFocused()) {
      const amount = formatExchangeWithCourse(amountSent, course)
      setAmountReceived(amount)
    }
  }, [course, toAccount])

  const onExchange = useCallback(() => {
    if (toAccount) {
      setFromAccount(toAccount)
    }
    setToAccount(fromAccount)
  }, [toAccount, fromAccount])

  const { data: exchangeRate } = useQuery(
    ['currencyExchange', fromAccount?.currency, toCurrency, parseFloat(amountSent)],
    getCurrencyExchange,
  )

  useEffect(() => {
    if (exchangeRate && !checkIsNil(exchangeRate)) {
      if (fromAccount.currency !== toCurrency) {
        setCourse(exchangeRate.exchangeRate)
      }
    }
  }, [exchangeRate, fromAccount, toCurrency])

  const onSelectAccount = useCallback(
    path => (account: MappedAccount) => {
      const selectedAccount = customAccounts?.find(
        it => it.accountNumber === account?.accountNumber,
      )
      switch (path) {
        case 'from': {
          return selectedAccount ? setFromAccount(selectedAccount) : null
        }
        case 'to': {
          return setToAccount(selectedAccount)
        }
        default:
          return null
      }
    },
    [customAccounts],
  )

  const onContinue = () => {
    const transactionDetails = {
      amountReceived: +numbersWithDot(amountReceived),
      amountSent: +numbersWithDot(amountSent),
      transactionFee: 0,
      rate: course !== 1 ? course : undefined,
    }
    if (toAccount) {
      navigate(ROUTES.ConfirmTransfer, {
        from: fromAccount,
        to: toAccount,
        transactionDetails,
        paymentDetails,
        type: CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE,
      })
    }
  }

  const onSeeCurrencyRates = useCallback(() => {
    navigate(ROUTES.CurrencyRates, { currency: fromAccount?.currency })
  }, [fromAccount, navigate])

  const handleGoToContactUs = useCallback(() => {
    navigate(ROUTES.ContactUs, { message: '' })
  }, [])

  const emptyState = () => {
    return (
      <Wrapper>
        <IconButton icon={renderIcon(icons.noAccounts)} onPress={handleGoToContactUs} />
        <BodySmall fontWeight="600" mt={20}>{t('NO_ACCOUNTS_FOUND')}</BodySmall>
        <Subtitle textAlign="center" mt={20} mb={20}>{t('EXCHANGE_EMPTY')}</Subtitle>
        <Button title={t('OPEN_NEW_ACCOUNT')} onPress={handleGoToContactUs} width="100%" />
      </Wrapper>
    )
  }

  const currencyExchange = () => {
    return (
      <>
        <Column flex={1} ph="l" mt="l">
          <AccountPicker
            label={t('FROM_ACCOUNT') as string}
            accounts={fromAccounts}
            initialAccount={fromAccount}
            onSelect={onSelectAccount('from')}
          />
          <ExchangeInput
            label={t('AMOUNT_TO_EXCHANGE') as string}
            currencySymbol={currencySymbols[fromAccount?.currency as string]}
            operationSymbol="-"
            currency={currencyEnum[fromAccount?.currency as string]}
            value={amountSent}
            onChangeText={setAmountSent}
            ref={sentAmountInput}
            autoFocus
          />
          <CurrencyExchangeRateBar
            disabled={!toAccount}
            onExchange={onExchange}
            fromCurr={fromAccount?.currency}
            toCurr={toCurrency}
            course={course}
          />
          <AccountPicker
            label={t('TO_ACCOUNT') as string}
            accounts={accountsToShow}
            initialAccount={toAccount}
            onSelect={onSelectAccount('to')}
          />
          <ExchangeInput
            value={amountReceived}
            onChangeText={setAmountReceived}
            label={t('AMOUNT_TO_RECEIVE') as string}
            currency={currencyEnum[toCurrency as string]}
            currencySymbol={currencySymbols[toCurrency as string]}
            operationSymbol="+"
            ref={receivedAmountInput}
          />
          <TouchableOpacity alignSelf="flex-end" onPress={onSeeCurrencyRates}>
            <Caption mt="m" color="pumpkin85">
              {t('SEE_CURRENCY_RATES')}
            </Caption>
          </TouchableOpacity>
        </Column>
        <Column mt="s" mb={1}>
          <PaymentDetailsInput
            value={paymentDetails}
            placeholder={t('PAYMENT_DETAILS') as string}
            onChangeText={setPaymentDetails}
          />
          <Button
            onPress={onContinue}
            title={t(`${I18N_NAMESPACES.COMMON}::CONTINUE`)}
            m="l"
            disabled={
              !amountSent ||
              fromAccount?.currency === toAccount?.currency ||
              !toAccount ||
              paymentDetails.length < 2
            }
          />
        </Column>
      </>
    );
  }

  return (
    <Container safeBottom type="secondary">
      <StyledKeyboardAvoidingView behavior="padding">
        <SmallBackground>
          <AccountHeader title={t('CURRENCY_EXCHANGE')} onBack={goBack} />
        </SmallBackground>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          extraHeight={230}
          contentContainerStyle={containerStyle}
          showsVerticalScrollIndicator={false}
          keyboardOpeningTime={0}>

          {accountsToShow.length > 0 ? currencyExchange() : emptyState()}

        </KeyboardAwareScrollView>
      </StyledKeyboardAvoidingView>
    </Container>
  )
}

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView).attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))`
  background-color: ${({ theme }) => theme.colors.white};
`

const containerStyle = { flexGrow: 1 }

const Wrapper = styled(Column)`
  justify-content: center;
  align-items: center;
  width: 100%;
  padding:10%;
`

export default memo(Exchange)