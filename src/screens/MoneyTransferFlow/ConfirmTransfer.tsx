import 'react-native-get-random-values'

import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import {
  AccountHeader,
  BodySmall,
  Button,
  Column,
  Container,
  ErrorMessage,
  Row,
  SmallBackground,
  TransferCard,
  TransferInfoCard,
} from 'components'
import useErrorHandler from 'hooks/useErrorModal'
import _ from 'lodash'
import moment from 'moment'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { ExternalTransferData, InternalTransferInitiateData } from 'types/api/transaction'
import { getTransactionFees } from 'utils/apiQueries/transaction'
import { currencySymbols } from 'utils/currencies'
import { ROUTE_REFERENCE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'
import {
  CLIENT_SIDE_TRANSACTION_TYPES,
  execTransferHandlers,
  initTransferHandlers,
  TRANSACTION_STATUSES,
} from 'utils/transactions'
import { v4 as uuid } from 'uuid'

function ConfirmTransfer() {
  const { goBack, navigate } = useNavigation<StackNavigationProp<MoneyTransferStackParamList>>()
  const isFocused = useIsFocused()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.ConfirmTransfer>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)

  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const { from, to, transactionDetails, paymentDetails, transfer, type, files } = params
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isFocused) {
      setIsLoading(false)
    }
  }, [isFocused])

  const isBank = type === CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT
  const isBulk = type === CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT

  const transferData = useMemo<InternalTransferInitiateData | ExternalTransferData>(
    () =>
      transfer
        ? transfer
        : {
            fromAccountNumber: from.accountNumber,
            beneficiaryAccountNumber: (to.accountNumber || to.beneficiaryAccountNumber) as string,
            currencyCode: from.currency,
            executionDate: moment().format('YYYY-MM-DD'),
            amount: transactionDetails?.amountSent,
            paymentDetails,
            requestIdentifier: uuid(),
          },
    [
      from.accountNumber,
      from.currency,
      paymentDetails,
      to?.accountNumber,
      to?.beneficiaryAccountNumber,
      transactionDetails?.amountSent,
      transfer,
    ],
  )

  const { data: transactionFeeData } = useQuery(
    ['transactionFee', transferData],
    getTransactionFees,
    { enabled: !isBank && !isBulk },
  )

  const transactionFee = useMemo(
    () =>
      !(isBank || isBulk)
        ? transactionFeeData?.reduce((feeAmount, fee) => feeAmount + fee.amount, 0) || 0
        : transactionDetails.transactionFee,
    [isBank, isBulk, transactionDetails.transactionFee, transactionFeeData],
  )

  const totalPrice = useMemo(
    () =>
      `${currencySymbols[from?.currency]}${(
        transactionDetails?.amountSent + transactionFee
      ).toFixed(2)}`,
    [from?.currency, transactionDetails?.amountSent, transactionFee],
  )

  const onPay = useCallback(async () => {
    if (isLoading) {
      return
    }

    setIsLoading(true)
    try {
      const init = initTransferHandlers[type]
      const exec = execTransferHandlers[type]

      const totalAmount = parseFloat(
        totalPrice.slice(currencySymbols[from?.currency]?.length || 1),
      ).toFixed(2)

      if (isBulk) {
        navigate(ROUTES.OneTimePassword, {
          transactionData: {
            transfer: transferData,
            totalAmount,
            beneficiaryName: to?.client || transferData.beneficiaryName,
            type,
          },
          reference: ROUTE_REFERENCE.CONFIRM,
        })
        return
      }

      const initiateResponse = await init(transferData)

      if (initiateResponse.requiresSca) {
        navigate(ROUTES.OneTimePassword, {
          transactionData: {
            transfer: transferData,
            totalAmount,
            beneficiaryName: to.client,
            files,
            type,
          },
          reference: ROUTE_REFERENCE.CONFIRM,
        })
        return
      }
      const executeResponse = await exec({
        transfer: transferData,
      })

      navigate(ROUTES.SuccessTransaction, {
        transfer: transferData,
        reference: executeResponse.reference,
        status: executeResponse.status as TRANSACTION_STATUSES,
        totalAmount,
        transactionDate: executeResponse.transactionDate,
        beneficiaryName: to.client,
        type,
      })
    } catch (err: unknown) {
      showErrorModal(err)
      setIsLoading(false)
    }
  }, [
    isLoading,
    type,
    isBulk,
    transferData,
    navigate,
    totalPrice,
    from?.currency,
    to?.client,
    showErrorModal,
    files,
  ])

  const isOwnAccount =
    type === CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT ||
    type === CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE

  return (
    <Container safeBottom type="secondary">
      <SmallBackground>
        <AccountHeader title={t('CONFIRM_TRANSFER')} onBack={goBack} />
      </SmallBackground>

      {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}

      <Wrapper>
        <Column>
          <Column mh="l">
            <TransferInfoCard
              subtitle={t(`${I18N_NAMESPACES.COMMON}::FROM`)}
              {...from}
              isOwnAccount
              mt="xxl"
            />
            <TransferInfoCard
              subtitle={t(`${I18N_NAMESPACES.COMMON}::TO`)}
              {...to}
              isOwnAccount={isOwnAccount}
              bulkFiles={transfer?.bulkTransfersDetails?.length}
              mt="xl"
            />
          </Column>
          <Line />
          {!_.isEmpty(paymentDetails) && (
            <Row mh="l" mt="l">
              <BodySmall color="darkGray" flex={1}>
                {t(`${I18N_NAMESPACES.COMMON}::DETAILS`)}
              </BodySmall>
              <BodySmall flex={2}>{paymentDetails}</BodySmall>
            </Row>
          )}
          <TransferCard
            {...transactionDetails}
            transactionFee={transactionFee}
            currencySent={from?.currency}
            currencyReceived={to?.currency || transactionDetails.currency}
            mh="l"
            mt="xxl"
          />
        </Column>
        <Button onPress={onPay} title={`${t('PAY')} ${totalPrice}`} isLoading={isLoading} m="l" />
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled(Column)`
  flex: 1px;
  justify-content: space-between;
`

const Line = styled(Column)`
  border-color: ${({ theme }) => theme.colors.gray95};
  margin-top: ${({ theme }) => theme.spacings.l}px;
  height: 1px;
  border-width: 1px;
`

export default memo(ConfirmTransfer)
