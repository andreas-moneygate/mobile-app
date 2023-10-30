import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { AccountHeader, Button, Column, Container, MedBackground, ScrollView } from 'components'
import BulkTransferItem from 'components/elements/BulkTransferItem'
import { memo, useCallback, useState } from 'react'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { BulkFileTransfer } from 'types/api/transaction'
import { initBulkTransfer } from 'utils/apiQueries/transaction'
import { formatCurrentDate } from 'utils/date'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'

function BulkFilePayment() {
  const { goBack, navigate } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.BulkFilePayment>>()
  const [transfers, setTransfers] = useState<BulkFileTransfer['bulkTransfersDetails']>(
    params.transfer?.bulkTransfersDetails || [],
  )

  const handleRemoveTransfer = useCallback(
    (index: number) => {
      const newTransfers = transfers.filter((_, i) => i !== index)
      setTransfers(newTransfers)
    },
    [transfers],
  )

  const handleContinue = useCallback(async () => {
    let transfer = params.transfer
    const previouslyHasErrors = params.transfer?.bulkTransfersDetails.some(
      transfer => transfer.errors,
    )
    if (previouslyHasErrors) {
      transfer = await initBulkTransfer({
        ...params.transfer,
        bulkTransfersDetails: transfers,
      })
    }
    navigate(ROUTES.ConfirmTransfer, {
      from: params?.from,
      transfer: transfer,
      transactionDetails: {
        amountSent: transfer.totalAmount,
        amountReceived: transfer.totalAmount,
        executionDate: formatCurrentDate(transfer.executionDate),
        currency: transfer.currencyCode,
        transactionFee: transfer.bulkTransfersDetails.reduce(
          (totalFee, transfer) => totalFee + transfer.fee,
          0,
        ),
      },
      type: CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT,
    })
  }, [navigate, params?.from, params.transfer, transfers])

  return (
    <Container safeBottom type="secondary" justifyContent="space-between">
      <MedBackground>
        <AccountHeader title="Bulk Transfer File Upload" onBack={goBack} />
      </MedBackground>
      <ScrollView>
        <Column m="l">
          {transfers.map((item, index) => (
            <BulkTransferItem
              key={index}
              item={item}
              index={index}
              fromAccount={params.from}
              onRemoveTransfer={handleRemoveTransfer}
            />
          ))}
        </Column>
        <Button
          onPress={handleContinue}
          title="Continue"
          disabled={transfers.some(transfer => transfer.errors)}
          m="m"
        />
      </ScrollView>
    </Container>
  )
}

export default memo(BulkFilePayment)
