import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { TransactionFee } from 'types/api/transaction'
import { LayoutItemProps } from 'types/ui'
import { currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'
import { renderIcon } from 'utils/ui'

export interface TransferCardProps {
  amountSent: number
  rate?: any
  executionDate?: string
  transactionFee: number
  amountReceived: number
  currencySymbol?: string
  currencySent?: any
  currencyReceived?: any
  feeData?: Array<TransactionFee>
}

export const TransferCard = memo((props: TransferCardProps & LayoutItemProps) => {
  const {
    amountSent,
    rate,
    transactionFee,
    amountReceived,
    executionDate,
    currencySymbol,
    currencyReceived,
    currencySent,
    feeData,
    ...restProps
  } = props
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const [showFees, setShowFees] = useState(false)

  const toggleFees = () => {
    setShowFees(!showFees)
  }

  return (
    <Card ph="m" pb="l" {...restProps}>
      <Category>
        <Title>{t(`${I18N_NAMESPACES.COMMON}::AMOUNT_SENT`)}</Title>
        <BodySmall>{`${currencySymbols[currencySent]}${amountSent.toFixed(2)}`}</BodySmall>
      </Category>
      {rate && (
        <Category>
          <Title>{t(`${I18N_NAMESPACES.COMMON}::RATE`)}</Title>
          <BodySmall>
            {currencySymbols[currencySent]}1 = {rate.toFixed(2)} {currencyReceived}
          </BodySmall>
        </Category>
      )}
      {executionDate && (
        <Category>
          <Title>{t('EXECUTION_DATE')}</Title>
          <BodySmall>{executionDate}</BodySmall>
        </Category>
      )}
      <Category>
        <Title>{t(`${I18N_NAMESPACES.COMMON}::TRANSACTION_FEE`)}</Title>
        <Row>
          <BodySmall>{`${currencySymbols[currencySent]}${transactionFee.toFixed(2)}`}</BodySmall>
          {feeData?.length ? (
            <IconButton
              icon={renderIcon(showFees ? icons.chevronUp : icons.chevronDown, {
                color: colors.pumpkin,
                height: 20,
                width: 20,
              })}
              onPress={toggleFees}
              ml="xs"
            />
          ) : null}
        </Row>
      </Category>
      {showFees &&
        feeData?.map(fee => (
          <Row justifyContent="space-between" mt="s" ml="m">
            <Title>{fee.description}</Title>
            <BodySmall key={fee.feeType}>{`${currencySymbols[fee.currencyCode]}${fee.amount.toFixed(
              2,
            )}`}</BodySmall>
          </Row>
        ))}
      <Category>
        <Amount>{t('AMOUNT_RECEIVED')}</Amount>
        <BodySmall bold>{`${currencySymbols[currencyReceived]}${amountReceived.toFixed(
          2,
        )}`}</BodySmall>
      </Category>
    </Card>
  )
})

const Card = styled(Column)`
  background-color: ${({ theme }) => theme.colors.mintCream};
  border-radius: 10px;
`

const Category = styled(Row)`
  justify-content: space-between;
  margin-top: 20px;
`
const Title = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.darkGray};
`

const Amount = styled(Title)`
  font-weight: 600;
`
