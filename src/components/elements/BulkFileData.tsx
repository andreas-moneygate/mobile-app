import { Column } from 'components/layout/Column'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { BulkFileTransfer } from 'types/api/transaction'
import { currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'

type BulkFileDataProps = BulkFileTransfer['bulkTransfersDetails'][number] & {
  currency: string
}
export const BulkFileData = memo((props: BulkFileDataProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)

  const getColor = useCallback(
    (fieldName: string) => {
      if (!props?.errors) {
        return 'black'
      }

      if (props.errors[fieldName]) {
        return 'darkRed'
      }

      return 'black'
    },
    [props?.errors],
  )

  return (
    <Column mv="m">
      <Section>
        <BodySmall color="darkGray">{t('BENEFICIARY_ACCOUNT_NUMBER')}</BodySmall>
        <BodySmall color={getColor('BeneficiaryAccountNumber')}>
          {props.beneficiaryAccountNumber}
        </BodySmall>
      </Section>
      <Section>
        <BodySmall color="darkGray">{t('BENEFICIARY_NAME')}</BodySmall>
        <BodySmall color={getColor('BeneficiaryName')}>{props.beneficiaryName}</BodySmall>
      </Section>
      <Section>
        <BodySmall color="darkGray">{t('BENEFICIARY_ADDRESS')}</BodySmall>
        <BodySmall color={getColor('BeneficiaryAddress')}>{props.beneficiaryAddress}</BodySmall>
      </Section>
      <Section>
        <BodySmall color="darkGray">{t('BENEFICIARY_BANK_BIC')}</BodySmall>
        <BodySmall color={getColor('BeneficiaryBankBic')}>{props.beneficiaryBankBic}</BodySmall>
      </Section>
      <Section>
        <BodySmall color="darkGray">{t('DESCRIPTION')}</BodySmall>
        <BodySmall color={getColor('PaymentDetails')}>{props.paymentDetails}</BodySmall>
      </Section>
      <Section>
        <BodySmall color="darkGray">{t('AMOUNT')}</BodySmall>
        <BodySmall color={getColor('Amount')}>
          {currencySymbols[props.currency] + props.amount}
        </BodySmall>
      </Section>
      <Section>
        <BodySmall color="darkGray">{t('FEE')}</BodySmall>
        <BodySmall color={getColor('Fee')}>{currencySymbols[props.currency] + props.fee}</BodySmall>
      </Section>
    </Column>
  )
})

const Section = styled(Column)`
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 0;
`
