import { Caption, Column } from 'components'
import usePrice from 'hooks/usePrice'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { I18N_NAMESPACES } from 'utils/i18n'

interface RemarkPaymentProps {
  currencySymbol: string
  amount: number
  withFractional?: boolean
}

export const RemarkPayment = memo((props: RemarkPaymentProps & LayoutItemProps) => {
  const { currencySymbol, amount, withFractional, ...restProps } = props
  const { ceilPart, fractionalPart } = usePrice(amount)
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  return (
    <Container pv="s" ph="l" {...restProps}>
      <Caption textAlign="center">
        {t('LARGE_PAYMENT_FILE_UPLOAD', { limit: `${ceilPart}.${fractionalPart}` })}
      </Caption>
    </Container>
  )
})

const Container = styled(Column)`
  background-color: ${({ theme }) => theme.colors.lightYellow};
  border-color: ${({ theme }) => theme.colors.lightBeige};
  border-width: 1px;
  border-radius: 8px;
`
