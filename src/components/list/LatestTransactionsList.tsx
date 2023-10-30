import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { TransactionCard } from 'components/card/TransactionCard'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { MappedTransaction } from 'types/mapped/transactions'
import { I18N_NAMESPACES } from 'utils/i18n'

interface ListProps {
  data: Array<MappedTransaction>
}

export const LatestTransactionsList = memo(({ data }: ListProps) => {
  const { navigate } = useNavigation()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const [showAll, setShowAll] = useState(false)

  const dataToShow = useMemo(() => (showAll ? data : data.slice(0, 4)), [showAll, data])

  const toggleShowAll = useCallback(() => {
    setShowAll(!showAll)
  }, [showAll])

  const handleOpenTransaction = useCallback(
    (transaction: MappedTransaction) => {
      navigate(ROUTES.TransactionDetails, {
        transactionReference: transaction.transfer.reference,
        accountNumber: transaction.transfer.accountNumber,
        type: transaction.transfer.type,
        isFee: transaction.transfer.isFee,
        feeData: transaction.transfer.feeData,
      })
    },
    [navigate],
  )

  return (
    <Column mt="s">
      <Row justifyContent="space-between">
        <Title>{t('LATEST_TRANSACTIONS')}</Title>
        <TouchableOpacity onPress={toggleShowAll}>
          <TitleBtn color="midGray">
            {!showAll
              ? t(`${I18N_NAMESPACES.COMMON}::SEE_ALL`)
              : t(`${I18N_NAMESPACES.COMMON}::SEE_LATEST`)}
          </TitleBtn>
        </TouchableOpacity>
      </Row>
      {dataToShow?.map((transaction, index: number) => (
        <TransactionCard
          {...transaction.transfer}
          transaction={transaction}
          onOpen={handleOpenTransaction}
          mt={index !== 0 ? 's' : 'm'}
          key={`${transaction.transfer.reference}-${index}`}
        />
      ))}
    </Column>
  )
})

const Title = styled(BodySmall)`
  font-weight: 600;
`
const TitleBtn = styled(BodySmall)`
  font-weight: 500;
  text-transform: capitalize;
`
