import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { CURR_TO_FIXED, currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'

interface TransactionDetailsCardProps {
  amountSent: number
  rate?: number
  transactionFee: number
  currency?: string
  currencyReceived?: string
  reference: string
  isFee: boolean
}

export const TransactionDetailsCard = memo(
  (props: TransactionDetailsCardProps & LayoutItemProps) => {
    const {
      amountSent,
      rate,
      transactionFee,
      currency,
      currencyReceived,
      reference,
      isFee,
      ...restProps
    } = props

    const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

    return (
      <Card ph="m" pb="l" {...restProps}>
        {!isFee ? (
          <Category>
            <Title>{t('TRANSACTION_REFERENCE')}</Title>
            <BodySmall>{reference}</BodySmall>
          </Category>
        ) : null}
        <Category>
          <Title>
            {t(`${I18N_NAMESPACES.COMMON}::AMOUNT`)}{' '}
            {amountSent > 0
              ? t(`${I18N_NAMESPACES.COMMON}::RECEIVED`)
              : t(`${I18N_NAMESPACES.COMMON}::SENT`)}
          </Title>
          <BodySmall>{`${currencySymbols[currency]}${Math.abs(amountSent).toFixed(2)}`}</BodySmall>
        </Category>
        {rate && (
          <Category>
            <Title>{t(`${I18N_NAMESPACES.COMMON}::RATE`)}</Title>
            <BodySmall>
              {currencySymbols[currency]}1 = {rate.toFixed(CURR_TO_FIXED)} {currencyReceived}
            </BodySmall>
          </Category>
        )}
        {!isFee ? (
          <Category>
            <Title>{t(`${I18N_NAMESPACES.COMMON}::TRANSACTION_FEE`)}</Title>
            <BodySmall>{`${currencySymbols[currency]}${Math.abs(transactionFee).toFixed(
              2,
            )}`}</BodySmall>
          </Category>
        ) : null}
      </Card>
    )
  },
)

const Card = styled(Column)`
  border-color: ${({ theme }) => theme.colors.gray95};
  background-color: ${({ theme }) => theme.colors.white};
  border-top-width: 1px;
  border-bottom-width: 1px;
`

const Category = styled(Row)`
  justify-content: space-between;
  margin-top: 20px;
`
const Title = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.darkGray};
`
