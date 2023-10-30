import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import images from 'assets/images'
import { Background, BodySmall, Button, Column, Container, Row, Title } from 'components'
import { Operation } from 'components/elements/Operation'
import useTransactions from 'hooks/useTransactions'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BackHandler, Image } from 'react-native'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { getBulkTransactionReceipt, getTransactionReceipt } from 'utils/apiQueries/transaction'
import { currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'
import { CLIENT_SIDE_TRANSACTION_TYPES, TRANSACTION_STATUSES } from 'utils/transactions'

function SuccessTransaction() {
  const { navigate } =
    useNavigation<NavigationProp<MoneyTransferStackParamList & DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.SuccessTransaction>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)

  const { transfer: transaction, status } = params

  const isBulk = params.type === CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigate(ROUTES.Home)
      return true
    })

    return () => backHandler.remove()
  }, [])

  const showDownloadReceiptBtn =
    status === TRANSACTION_STATUSES.EXECUTED || status === TRANSACTION_STATUSES.PENDING

  const showAddToFavoritesBtn =
    !isBulk && (status === TRANSACTION_STATUSES.EXECUTED || status === TRANSACTION_STATUSES.PENDING)

  const { loadTransactions } = useTransactions()

  const formatNumber = useMemo(
    () => `****${transaction.beneficiaryAccountNumber?.slice(-4)}`,
    [transaction],
  )

  const statusIcon = useMemo(() => {
    switch (status) {
      case TRANSACTION_STATUSES.EXECUTED:
        return images.tickCircle
      case TRANSACTION_STATUSES.REJECTED:
        return images.cancelCircle
      case TRANSACTION_STATUSES.PENDING:
      case TRANSACTION_STATUSES.REQUIRES_APPROVAL:
        return images.time
    }
  }, [status])

  const title = useMemo(() => {
    switch (status) {
      case TRANSACTION_STATUSES.EXECUTED:
        return t('SUCCESS_TRANSACTION')
      case TRANSACTION_STATUSES.REJECTED:
        return t('PAYMENT_REJECTED')
      case TRANSACTION_STATUSES.PENDING:
        return t('PAYMENT_PENDING')
      case TRANSACTION_STATUSES.REQUIRES_APPROVAL:
        return t('PAYMENT_REQUIRES_APPROVAL')
    }
  }, [status, t])

  const description = useMemo(() => {
    switch (status) {
      case TRANSACTION_STATUSES.EXECUTED:
        return isBulk
          ? t('SUCCESS_BULK_DESCRIPTION', {
              transfersNumber: transaction?.bulkTransfersDetails?.length,
            })
          : t('YOU_SUCCESSFULLY_SENT', {
              amount: currencySymbols[transaction.currencyCode] + params.totalAmount,
              account: `${params.beneficiaryName}, ${formatNumber}`,
            })
      case TRANSACTION_STATUSES.REJECTED:
        return t('YOUR_PAYMENT_REJECTED')
      case TRANSACTION_STATUSES.PENDING:
        return t('YOUR_PAYMENT_IN_PROGRESS')
      case TRANSACTION_STATUSES.REQUIRES_APPROVAL:
        return t('YOUR_PAYMENT_REQUIRES_APPROVAL')
    }
  }, [formatNumber, isBulk, params, status, t, transaction])

  const onNext = useCallback(() => {
    loadTransactions()
    navigate(ROUTES.Home, { refreshBalance: true })
  }, [navigate])

  const onFavorite = useCallback(
    () =>
      navigate(ROUTES.AddTransactionToFavorites, {
        accountNumber: transaction.fromAccountNumber,
        reference: params.reference,
        transactionDate: params.transactionDate,
        currency: transaction.currencyCode,
        amount: params.transfer?.amount || params.totalAmount,
        paymentDetails: transaction.paymentDetails,
      }),
    [navigate, transaction, params],
  )

  const handleGetReceipt = useCallback(async () => {
    const base64Receipt = isBulk
      ? await getBulkTransactionReceipt(params.reference)
      : await getTransactionReceipt(transaction.fromAccountNumber, params.reference)

    const fileName = `TransactionReceipt-${params.reference}`

    navigate(ROUTES.DocumentPreview, { fileName, file: base64Receipt })
  }, [isBulk, params.reference, transaction.fromAccountNumber, navigate])

  const handleNewPayment = useCallback(() => {
    switch (params.type) {
      case CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT: {
        return navigate(ROUTES.ToOwnAccount, { resetData: true })
      }
      case CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE: {
        return navigate(ROUTES.Exchange, { resetData: true })
      }
      case CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT: {
        return navigate(ROUTES.ToMoneyGateSecondStep, { resetData: true })
      }
      case CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT: {
        return navigate(ROUTES.CreatePayment, { resetData: true })
      }
    }
  }, [navigate, params.type])

  return (
    <Background image={images.background}>
      <Container type="transparent">
        <Wrapper mh="l">
          <Column alignItems="center">
            <TickCircle source={statusIcon} />
            <TitleSuccess>{title}</TitleSuccess>
            <Description>{description}</Description>
          </Column>
          <Row mt={45} justifyContent="space-evenly">
            {showDownloadReceiptBtn ? (
              <Operation
                title={t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::DOWNLOAD_RECEIPT`)}
                icon={icons.boldDownload}
                onPress={handleGetReceipt}
              />
            ) : null}
            {showAddToFavoritesBtn ? (
              <Operation
                title={t('ADD_TO_FAVORITES') as string}
                type="default"
                icon={icons.favoriteBorder}
                onPress={onFavorite}
              />
            ) : null}

            {!isBulk && params.type ? (
              <Operation
                title={t('NEW_PAYMENT') as string}
                icon={icons.sendMoney}
                onPress={handleNewPayment}
              />
            ) : null}
          </Row>
          <ContainerBtn>
            <Button title="Done" onPress={onNext} />
          </ContainerBtn>
        </Wrapper>
      </Container>
    </Background>
  )
}

const Wrapper = styled(Column)`
  flex: 1;
  justify-content: center;
`

const ContainerBtn = styled(Column)`
  width: 100%;
  position: absolute;
  bottom: 20px;
`

const TitleSuccess = styled(Title)`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacings.l}px;
`

const Description = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacings.l}px;
  text-align: center;
`

const TickCircle = styled(Image)`
  height: 60px;
  width: 60px;
`

export default memo(SuccessTransaction)
