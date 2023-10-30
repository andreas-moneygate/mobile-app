import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  AccountPicker,
  BodySmall,
  Button,
  Column,
  ErrorMessage,
  InputLoadingIndicator,
  KeyboardAvoidingView,
  ScrollView,
  SmallBackground,
  TextInput,
} from 'components'
 import { ScrollableItemPicker } from 'components/picker/ScrollableItemPicker'
import { ItemPicker } from 'components/picker/ItemPicker'
import { RadioPicker } from 'components/picker/RadioPicker'
import useClients from 'hooks/useClients'
import useErrorHandler from 'hooks/useErrorModal'
import isIban from 'iban'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ScrollView as ScrollViewType } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { ValidBankData } from 'types/api/transaction'
import { MappedAccount } from 'types/mapped/account'
import { getCountries } from 'utils/apiQueries/country'
import { validateBic as validateBicApi, validateIban } from 'utils/apiQueries/transaction'
import { I18N_NAMESPACES } from 'utils/i18n'
import { filterPositiveAccounts } from 'utils/mappers'
import {
  BANK_TRANSFER_OPTION,
  CHARGE_BEARER,
  CLIENT_SIDE_TRANSACTION_TYPES,
} from 'utils/transactions'
import { withoutSpaces } from 'utils/ui'
import validationSchema from 'utils/validation'

interface BankPaymentForm {
  fullName: string
  beneficiaryAddress: string
  beneficiaryCountryCode: string
  iban: string
  swiftCode: string
  bankName: string
  bankAddress: string
  chargeBearer: CHARGE_BEARER
  transferOption: BANK_TRANSFER_OPTION
}

function CreatePayment() {
  const { goBack, navigate, setParams } =
    useNavigation<NavigationProp<MoneyTransferStackParamList, ROUTES.CreatePayment>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.CreatePayment>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const { selectedClient } = useClients()
  const scrollRef = useRef<ScrollViewType>()
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const insets = useSafeAreaInsets()

  const accounts = useMemo(() => filterPositiveAccounts(selectedClient?.accounts), [selectedClient])

  const [fromAccount, setFromAccount] = useState<MappedAccount>(
    params?.from?.accountNumber ? params?.from : accounts[0],
  )
  const [isSwift, setIsSwift] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
    reset,
    trigger,
    setValue,
    watch,
  } = useForm<BankPaymentForm>({
    defaultValues: {
      ...defaultFormValues,
      fullName: params?.to?.beneficiaryName || defaultFormValues.fullName,
      beneficiaryAddress: params?.to?.beneficiaryAddress || defaultFormValues.beneficiaryAddress,
      beneficiaryCountryCode: params?.to?.beneficiaryCountryCode || defaultFormValues.beneficiaryCountryCode,
      iban: params?.to?.iban || defaultFormValues.iban,
      swiftCode: params?.to?.swiftCode || defaultFormValues.swiftCode,
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (params?.resetData) {
      reset({ ...defaultFormValues })
      scrollRef?.current?.scrollTo({ y: 0 })
      setParams({ resetData: false })
    }
  }, [params?.resetData])

  const ibanOrAccount = withoutSpaces(watch('iban'))
  const bicOrSwift = withoutSpaces(watch('swiftCode'))

  const handleAutoCompleteData = useCallback(
    (data: ValidBankData | Array<ValidBankData>) => {
      let autoCompleteData
      if (Array.isArray(data)) {
        const main = data.find(item => item.bic.slice(-3) === 'XXX')
        autoCompleteData = main || data[0]
      } else {
        autoCompleteData = data
      }
      setIsSwift(!isIban.isValid(ibanOrAccount))
      setValue('bankName', autoCompleteData.bankName)
      setValue(
        'bankAddress',
        Array.isArray(autoCompleteData.addressLines)
          ? autoCompleteData.addressLines.join(' ')
          : autoCompleteData.addressLines || '',
      )
      setValue('swiftCode', autoCompleteData.bic)
      trigger('bankAddress')
    },
    [ibanOrAccount, setValue],
  )

  const { data: validatedIbanData, isLoading: isLoadingIban } = useQuery(
    ['validateBic', ibanOrAccount],
    validateIban,
    {
      enabled: isIban.isValid(ibanOrAccount),
      onError: showErrorModal,
      onSuccess: handleAutoCompleteData,
    },
  )

  const {
    data: validatedBicData,
    isSuccess: isBicValid,
    isLoading: isLoadingBic,
  } = useQuery(['validateBic', bicOrSwift], validateBicApi, {
    enabled: Boolean(bicOrSwift.length),
    onError: showErrorModal,
    onSuccess: handleAutoCompleteData,
  })

  const chargeBearerOptions = useMemo(
    () => [
      { value: CHARGE_BEARER.OUR, label: t('CHARGES_OUR') },
      { value: CHARGE_BEARER.BENEFICIARY, label: t('CHARGES_BENEFICIARY') },
      { value: CHARGE_BEARER.SHARED, label: t('CHARGES_SHARED') },
    ],
    [t],
  )
 
  const { data: countries } = useQuery(['countries'], getCountries)
  
  const countryOptions = useMemo(
    () => {
     return  countries?.map((item) => { return { value: item.isoAlpha2Code, label: item.name } })
    },
    [countries],
  )

  const bankTransferOptions = useMemo(
    () => [
      {
        value: BANK_TRANSFER_OPTION.STANDARD,
        label: t('STANDARD_TRANSFER'),
        subLabel: `1-2 ${t('BUSINESS_DAYS')}`,
      },
      {
        value: BANK_TRANSFER_OPTION.URGENT,
        label: t('URGENT_TRANSFER'),
        subLabel: `1 ${t('BUSINESS_DAYS')}`,
      },
    ],
    [t],
  )

  const onSubmit = useCallback(
    (data: BankPaymentForm) => {
      navigate(ROUTES.EnterAmount, {
        from: fromAccount,
        to: {
          ...params?.to,
          currency: fromAccount.currency,
          beneficiaryName: data.fullName,
          client: data.fullName,
          accountNumber: withoutSpaces(data.iban),
          chargeBearer: data.chargeBearer,
          bankBic: withoutSpaces(data.swiftCode),
          bankName: data.bankName,
          bankAddress: data.bankAddress,
          beneficiaryCountryCode: data.beneficiaryCountryCode,
          address: data.beneficiaryAddress,
          isUrgent: data.transferOption === BANK_TRANSFER_OPTION.URGENT,
        },
        paymentDetails: params?.to?.paymentDetails,
        amount: params?.to?.amount,
        type: CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT,
      })
    },
    [params?.to, navigate, fromAccount],
  )

  return (
    <KeyboardAvoidingView>
      <SmallBackground>
        <AccountHeader title={t('TO_BANK_ACCOUNT')} onBack={goBack} />
      </SmallBackground>
      {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}
      <ScrollWrapper innerRef={scrollRef} pb={insets.bottom}>
        <Column>
          <BodySmall fontWeight="600" mt="xl" mb="m">
            {t('FROM_ACCOUNT')}
          </BodySmall>
          <AccountPicker
            accounts={accounts}
            initialAccount={fromAccount}
            onSelect={setFromAccount}
          />
        </Column>
        <Column mt="xxl">
          <BodySmall fontWeight="600" mb="m">
            {t('TO_ACCOUNT')}
          </BodySmall>
          <Controller
            name="fullName"
            control={control}
            rules={validationSchema.username}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={t('FULL_NAME') as string}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.fullName?.message}
              />
            )}
          />
          <Controller
            name="beneficiaryAddress"
            control={control}
            rules={validationSchema.text}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={t('BENEFICIARY_ADDRESS') as string}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                error={errors?.beneficiaryAddress?.message}
                mt="s"
              />
            )}
          />
          <Controller
            name="beneficiaryCountryCode"
            control={control}
            rules={validationSchema.text}
            render={({ field: { onChange, value } }) => (
              <ScrollableItemPicker
                title={t('COUNTRY') as string}
                data={countryOptions}
                value={value}
                onSelect={onChange}
              />
            )}
          />
          <Controller
            name="iban"
            control={control}
            rules={validationSchema.text}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={t('IBAN_ACCOUNT_NUMBER') as string}
                onChangeText={onChange}
                onBlur={onBlur}
                value={withoutSpaces(value)}
                error={errors?.iban?.message}
                mt="s"
                rightAddon={
                  <InputLoadingIndicator
                    isLoading={isLoadingIban}
                    isValid={Boolean(validatedIbanData)}
                  />
                }
              />
            )}
          />
          <Controller
            name="swiftCode"
            control={control}
            rules={validationSchema.text}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={t('BIC_SWIFT') as string}
                onChangeText={onChange}
                onBlur={onBlur}
                value={withoutSpaces(value)}
                mt="s"
                rightAddon={
                  <InputLoadingIndicator
                    isLoading={isLoadingBic}
                    isValid={Boolean(validatedBicData)}
                  />
                }
              />
            )}
          />
          <Controller
            name="bankName"
            control={control}
            rules={validationSchema.text}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={t('BANK_NAME') as string}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
                mt="s"
              />
            )}
          />
          <Controller
            name="bankAddress"
            control={control}
            rules={validationSchema.text}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={t('BANK_ADDRESS') as string}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
                mt="s"
              />
            )}
          />
          <Controller
            name="chargeBearer"
            control={control}
            rules={validationSchema.text}
            render={({ field: { onChange, value } }) => (
              <ItemPicker
                title={t('CHARGES') as string}
                data={chargeBearerOptions}
                value={value}
                onSelect={onChange}
              />
            )}
          />
          {isSwift ? (
            <Controller
              name="transferOption"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioPicker
                  label={t('TRANSFER_OPTIONS') as string}
                  data={bankTransferOptions}
                  value={value}
                  onSelect={onChange}
                />
              )}
            />
          ) : null}
        </Column>
        <Button
          onPress={handleSubmit(onSubmit)}
          title={t(`${I18N_NAMESPACES.COMMON}::CONTINUE`)}
          mv="l"
          disabled={!isValid || !isBicValid}
        />
      </ScrollWrapper>
    </KeyboardAvoidingView>
  )
}

const ScrollWrapper = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingHorizontal: 20,
  },
}))`
  background-color: ${({ theme }) => theme.colors.white};
`

const defaultFormValues = {
  fullName: '',
  beneficiaryAddress: '',
  beneficiaryCountryCode: '',
  iban: '',
  swiftCode: '',
  bankName: '',
  bankAddress: '',
  chargeBearer: CHARGE_BEARER.SHARED,
  transferOption: BANK_TRANSFER_OPTION.STANDARD,
}

export default memo(CreatePayment)
