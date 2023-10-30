import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  AmountInput,
  Button,
  Caption,
  Column,
  Container,
  ErrorMessage,
  KeyboardAvoidingView,
  PaymentDetailsList,
  SmallBackground,
} from 'components'
import { ExchangeRate } from 'components/elements/ExchangeRate'
import { RemarkPayment } from 'components/elements/RemarkPayment'
import useErrorHandler from 'hooks/useErrorModal'
import moment from 'moment'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useQuery } from 'react-query'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { ExternalTransferData } from 'types/api/transaction'
import { getCurrencyExchange } from 'utils/apiQueries/currency'
import { getExtTransactionFees } from 'utils/apiQueries/transaction'
import { currencyEnum, currencySymbols } from 'utils/currencies'
import { checkFileSize, checkFileType, getFileInBase64 } from 'utils/files'
import { I18N_NAMESPACES } from 'utils/i18n'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'
import { checkIsNil, numbersWithDot } from 'utils/ui'
import validation from 'utils/validation'
import { v4 as uuid } from 'uuid'

const PAYMENTS_AMOUNT_LIMIT = 10000 // in euro

function EnterAmount() {
  const { goBack, navigate } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.EnterAmount>>()
  const { t } = useTranslation()
  const { from, to, type } = params
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()

  const isLargePaymentsEnabled = from.clientId !== to.clientId
  const isBank = type === CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT

  const [course, setCourse] = useState(1)
  const [files, setFiles] = useState<Array<File & { base64: string }>>([])

  const {
    handleSubmit,
    control,
    formState: { isValid },
    trigger,
    watch,
  } = useForm({
    defaultValues: {
      value: params?.amount?.toString() || '',
      paymentDetails: params?.paymentDetails || '',
    },
    mode: 'onChange',
  })

  const amount = +numbersWithDot(watch('value'))

  const bankTransfer = useMemo<ExternalTransferData | null>(
    () =>
      isBank
        ? {
            fromAccountNumber: from.accountNumber,
            beneficiaryAccountNumber: to.accountNumber,
            currencyCode: from.currency,
            executionDate: moment().format('YYYY-MM-DD'),
            amount,
            paymentDetails: 'temp',
            requestIdentifier: uuid(),
            beneficiaryBankBic: to.bankBic,
            beneficiaryBankName: to.bankName,
            beneficiaryBankAddress: to.bankAddress.slice(0, 32),
            beneficiaryName: to.beneficiaryName,
            beneficiaryCountryCode: to.beneficiaryCountryCode,
            beneficiaryAddress: to.address,
            chargeBearer: to.chargeBearer,
            isUrgent: to.isUrgent,
          }
        : null,
    [amount, from, isBank, to],
  )

  const { data: bankTransactionFees, isLoading: isFeeLoading } = useQuery(
    ['bankTransactionFees', bankTransfer],
    getExtTransactionFees,
    {
      enabled: isBank && amount !== 0,
      retryDelay: 1000,
    },
  )

  const totalFee = useMemo(
    () => bankTransactionFees?.reduce((total, fee) => total + fee.amount, 0) || 0,
    [bankTransactionFees],
  )

  const onFileSelect = useCallback(
    async (file: File) => {
      if (!checkFileType(file.name)) {
        return showErrorModal(t(`${I18N_NAMESPACES.TRANSFER_FLOW}::WRONG_FILE_TYPE`))
      }

      const isPermittedSize = await checkFileSize(file.uri)
      if (!isPermittedSize) {
        return showErrorModal(t(`${I18N_NAMESPACES.TRANSFER_FLOW}::WRONG_FILE_SIZE`))
      }

      const base64 = await getFileInBase64(file.uri)

      setFiles([...files, { ...file, base64 }])
      trigger('value')
    },
    [files, showErrorModal, t, trigger],
  )

  const onDelete = useCallback(
    (removeIndex: number) => {
      setFiles(files.filter((_, index) => index !== removeIndex))
      trigger('value')
    },
    [files, trigger],
  )

  const onContinue = useCallback(
    async (data: FieldValues) => {
      const { value: amountSent, paymentDetails } = data

      const transactionDetails = {
        amountReceived: +numbersWithDot(amountSent) * course,
        amountSent: +numbersWithDot(amountSent),
        transactionFee: totalFee,
        feeData: bankTransactionFees?.length > 1 ? bankTransactionFees : undefined,
        executionDate: bankTransfer?.executionDate,
        rate: course !== 1 ? course : undefined,
      }

      navigate(ROUTES.ConfirmTransfer, {
        from: params?.from,
        to: params?.to,
        type,
        transfer: isBank ? { ...bankTransfer, paymentDetails } : undefined,
        transactionDetails,
        paymentDetails,
        files: files.map(file => file.base64),
      })
    },
    [
      bankTransactionFees,
      bankTransfer,
      course,
      isBank,
      navigate,
      params?.from,
      params?.to,
      totalFee,
      type,
      files,
    ],
  )

  const { data: exchangeRate } = useQuery(
    ['currencyExchange', from?.currency, to.currency, amount],
    getCurrencyExchange,
  )

  const { data: euroRate } = useQuery(
    ['currencyExchange', from?.currency, currencyEnum.EUR, amount],
    getCurrencyExchange,
    {
      enabled: from?.currency !== currencyEnum.EUR,
    },
  )

  const amountInEuro =
    from?.currency !== currencyEnum.EUR ? Number(euroRate?.convertedAmount) : amount

  useEffect(() => {
    if (exchangeRate && !checkIsNil(exchangeRate)) {
      if (from.currency !== to.currency) {
        setCourse(exchangeRate.exchangeRate)
      }
    }
  }, [from.currency, to.currency, setCourse, exchangeRate])

  return (
    <Container safeBottom>
      <StyledKeyboardAvoidingView behavior="padding">
        <SmallBackground>
          <AccountHeader
            title={`${t(`${I18N_NAMESPACES.COMMON}::TO`)} ${to.client || to.beneficiaryName}`}
            cardNumber={to?.accountNumber}
            onBack={goBack}
          />
        </SmallBackground>
        {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={containerStyle}
          showsVerticalScrollIndicator={false}
          enableAutomaticScroll={false}
        >
          <Column flex={1} justifyContent="space-between">
            <Controller
              name="value"
              rules={validation.transactionAmount(
                files,
                amountInEuro >= PAYMENTS_AMOUNT_LIMIT && isLargePaymentsEnabled,
              )}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Column alignItems="center" mh="l">
                  <Column mt="l" mb="xxl" minHeight={90}>
                    {amountInEuro >= PAYMENTS_AMOUNT_LIMIT && isLargePaymentsEnabled ? (
                      <RemarkPayment
                        currencySymbol={currencySymbols[from?.currency]}
                        amount={PAYMENTS_AMOUNT_LIMIT}
                      />
                    ) : null}
                  </Column>
                  <Caption color="darkGray">
                    {`${t('BALANCE')}: ${currencySymbols[from?.currency]}${from?.balance?.toFixed(
                      2,
                    )}`}
                  </Caption>
                  <AmountInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoFocus
                    mt="s"
                    currencySymbol={currencySymbols[from?.currency]}
                  />
                  <ExchangeRate
                    fromCurr={from.currency}
                    toCurr={to.currency}
                    value={value}
                    course={course}
                    fee={totalFee}
                  />
                </Column>
              )}
            />
          </Column>
        </KeyboardAwareScrollView>
        <Column>
          <Controller
            name="paymentDetails"
            control={control}
            rules={validation.paymentDetails}
            render={({ field: { onChange, onBlur, value } }) => (
              <PaymentDetailsList
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                onUpload={onFileSelect}
                onDelete={onDelete}
                data={files}
                placeholder={t(`${I18N_NAMESPACES.TRANSFER_FLOW}::PAYMENT_DETAILS`) as string}
                withFiles={isLargePaymentsEnabled && amountInEuro >= PAYMENTS_AMOUNT_LIMIT}
              />
            )}
          />
          <Button
            onPress={handleSubmit(onContinue)}
            title={t('CONTINUE')}
            m="l"
            disabled={!isValid || isFeeLoading}
            isLoading={isFeeLoading}
          />
        </Column>
      </StyledKeyboardAvoidingView>
    </Container>
  )
}

const containerStyle = { flexGrow: 1 }

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView).attrs(() => ({
  contentContainerStyle: {
    flex: 1,
  },
}))`
  background-color: ${({ theme }) => theme.colors.lightGray};
`

export default memo(EnterAmount)
