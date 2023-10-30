import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import images from 'assets/images'
import {
  Background,
  BodySmall,
  Button,
  Caption,
  Centered,
  Column,
  CustomList,
  Header,
  ScrollView,
  TouchableOpacity,
  TransactionBackdrop,
  TransactionDetailsCard,
  TransferInfoCard,
} from 'components'
import useClients from 'hooks/useClients'
import useFavoriteTransactions from 'hooks/useFavouritesTransactions'
import useGlobalSpinner from 'hooks/useGlobalSpinner'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { Transaction, TransactionDetails as TransactionDetailsType } from 'types/api/transaction'
import {
  getFavoriteTransactionByReference,
  getTransactionDetails,
  getTransactionReceipt,
} from 'utils/apiQueries/transaction'
import { I18N_NAMESPACES } from 'utils/i18n'
import {
  CLIENT_SIDE_TRANSACTION_TYPES,
  getDataForRepeatTransaction,
  getRouteForRepeatTransaction,
  TRANSACTION_ICONS,
} from 'utils/transactions'
import { renderIcon } from 'utils/ui'

function TransactionDetails() {
  const { navigate, goBack } =
    useNavigation<NavigationProp<MoneyTransferStackParamList & DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.TransactionDetails>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const { deleteTransactionFromFavorites } = useFavoriteTransactions()
  const { showGlobalSpinner, hideGlobalSpinner } = useGlobalSpinner()
  const { transactionReference, accountNumber, type, isFee, feeData } = params
  const { selectedClient } = useClients()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (!isFee) {
      showGlobalSpinner({ type: 'transparent' })
    }
  }, [])

  const { data: transactionDetailsData } = useQuery(
    ['transaction', accountNumber, transactionReference],
    getTransactionDetails,
    { enabled: !isFee, onSuccess: hideGlobalSpinner },
  )

  const { data: favoriteData } = useQuery(
    ['favoriteData', transactionDetailsData?.referenceNumber],
    getFavoriteTransactionByReference,
    {
      enabled: Boolean(!isFee && transactionDetailsData?.referenceNumber),
      onSuccess: data => setIsFavorite(Boolean(data)),
    },
  )

  const transactionDetails = useMemo<
    TransactionDetailsType | (Transaction & { paymentDetails: string }) | undefined
  >(() => (isFee ? feeData : transactionDetailsData), [feeData, isFee, transactionDetailsData])

  const isDebit = transactionDetails ? transactionDetails?.accountAmount < 0 : false

  const icon = useMemo(() => {
    if (type === CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT) {
      return TRANSACTION_ICONS[type + (isDebit ? '_DEBIT' : '_CREDIT')]
    }
    return TRANSACTION_ICONS[type]
  }, [isDebit, type])

  const transactionStatus = useMemo(() => [t('PENDING'), t('COMPLETED')], [t])

  const onFavorite = useCallback(() => {
    if (isFavorite && favoriteData?.id) {
      deleteTransactionFromFavorites(favoriteData.id)
      return setIsFavorite(false)
    }
    if (transactionDetails) {
      navigate(ROUTES.AddTransactionToFavorites, {
        accountNumber: transactionDetails.accountNumber,
        reference: transactionDetails.referenceNumber,
        transactionDate: transactionDetails.transactionDate,
        currency: transactionDetails.accountCurrency,
        amount: Math.abs(transactionDetails.accountAmount),
        paymentDetails: transactionDetails.paymentDetails,
      })
    }
  }, [isFavorite, favoriteData?.id, transactionDetails, deleteTransactionFromFavorites, navigate])

  const handleRepeatTransaction = useCallback(async () => {
    if (transactionDetails) {
      const route = getRouteForRepeatTransaction(
        transactionDetails.transactionType,
        transactionDetails.userHasAccessToCounterPartyAccount,
      )

      const repeatData = await getDataForRepeatTransaction(transactionDetails)

      navigate(route, repeatData)
    }
  }, [navigate, transactionDetails])

  const handleGetReceipt = useCallback(async () => {
    if (transactionDetails?.accountNumber && transactionDetails?.referenceNumber) {
      const base64Receipt = await getTransactionReceipt(
        transactionDetails.accountNumber,
        transactionDetails.referenceNumber,
      )

      const fileName = `${t('RECEIPT_FILE_NAME')}-${transactionDetails.referenceNumber}`

      navigate(ROUTES.DocumentPreview, { fileName, file: base64Receipt })
    }
  }, [transactionDetails?.accountNumber, transactionDetails?.referenceNumber, t, navigate])

  const isBankPayment = type === CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT

  const isOwnAccount =
    type === CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE ||
    type === CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT

  const detailsAccountNumber = useMemo(
    () =>
      isBankPayment
        ? transactionDetails?.counterPartytBic
        : transactionDetails?.counterPartyAccountNumber,
    [isBankPayment, transactionDetails],
  )

  const bankExtraNumber = useMemo(
    () =>
      type === CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT
        ? transactionDetails?.counterPartyAccountNumber
        : undefined,
    [type, transactionDetails],
  )

  const fromAccount = useMemo(() => {
    const account = selectedClient.accounts?.find(
      acc => acc.accountNumber === transactionDetails?.counterPartyAccountNumber,
    )
    return account
  }, [selectedClient.accounts, transactionDetails?.counterPartyAccountNumber])

  return transactionDetails ? (
    <Background image={images.background}>
      <Header
        leftIcon="arrowBack"
        rightIcon={transactionDetails?.canBeAddedToFavorites ? 'favorite' : undefined}
        isFavorite={isFavorite}
        onLeftPress={goBack}
        onRightPress={onFavorite}
      />
      <ScrollWrapper bounces={false}>
        <Column mt="m" mh="l">
          <TransactionBackdrop
            currency={transactionDetails.accountCurrency}
            grosAmount={transactionDetails.accountAmount}
            date={transactionDetails.valueDate}
            status={transactionStatus[transactionDetails.status]}
            beneficiaryName={transactionDetails.counterPartyAccountName}
            icon={icon}
          />
          {isDebit && !isFee && transactionDetails?.canBeAddedToFavorites ? (
            <Button
              title={t(`${I18N_NAMESPACES.COMMON}::REPEAT`)}
              icon={icons.repeat}
              onPress={handleRepeatTransaction}
            />
          ) : null}
        </Column>
        <CustomList minHeight={500} mt="xxl">
          <Column>
            <Column ph="l">
              <TransferInfoCard
                title={fromAccount?.title || ''}
                accountNumber={detailsAccountNumber}
                extra={bankExtraNumber}
                currency={transactionDetails.transactionCurrency || fromAccount?.currency}
                beneficiaryName={transactionDetails.counterPartyAccountName}
                subtitle={isDebit ? t('SEND_TO') : t('SEND_FROM')}
                isOwnAccount={isOwnAccount}
                isFee={transactionDetails.isFee}
                rightAlign
                mt="s"
              />
              {transactionDetails.paymentDetails ? (
                <Description mt="l">
                  <Caption color={transactionDetails.paymentDetails ? 'black' : 'darkGray'}>
                    {transactionDetails.paymentDetails ||
                      t(`${I18N_NAMESPACES.COMMON}::NO_DESCRIPTION`)}
                  </Caption>
                </Description>
              ) : null}
            </Column>
            <TransactionDetailsCard
              reference={transactionDetails.referenceNumber}
              amountSent={transactionDetails.accountAmount}
              transactionFee={transactionDetails.fees}
              currency={transactionDetails.accountCurrency}
              currencyReceived={transactionDetails?.transactionCurrency}
              rate={
                transactionDetails?.exchangeRate === 1
                  ? undefined
                  : transactionDetails?.exchangeRate
              }
              isFee={transactionDetails.isFee}
              mt="xl"
            />
            {!isFee ? (
              <DownloadReceipt onPress={handleGetReceipt} mh="xxl" mv="xl">
                {renderIcon(icons.boldDownload, iconStyle)}
                <BodySmall ml="m">{t('DOWNLOAD_RECEIPT')}</BodySmall>
              </DownloadReceipt>
            ) : null}
          </Column>
        </CustomList>
      </ScrollWrapper>
    </Background>
  ) : null
}

const ScrollWrapper = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
}))``

const Description = styled(Centered)`
  background-color: ${({ theme }) => theme.colors.mintCream};
  padding: ${({ theme }) => theme.spacings.m}px;
  border-radius: 10px;
  width: 100%;
  min-height: 50px;
`

const DownloadReceipt = styled(TouchableOpacity)`
  flex-direction: row;
  width: 160px;
`

const iconStyle = { width: 22, height: 22, color: '#FB7021' }

export default memo(TransactionDetails)
