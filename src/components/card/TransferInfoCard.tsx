import icons from 'assets/icons'
import { ActionTypeSetting } from 'components/elements/ActionTypeSetting'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { currencyEnum, currencyIcons } from 'utils/currencies'
import { SECTION_FIELD_TYPE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'
import { renderIcon } from 'utils/ui'
import * as Clipboard from 'expo-clipboard'

interface TransferInfoCardProps {
  subtitle: string
  title?: string
  accountNumber?: string
  currency?: typeof currencyEnum | string
  beneficiaryAccountNumber?: string
  extra?: string
  client?: string
  beneficiaryName?: string
  rightAlign?: boolean
  isOwnAccount?: boolean
  isFee?: boolean
  bulkFiles?: number
}

export const TransferInfoCard = memo((props: TransferInfoCardProps & LayoutItemProps) => {
  const {
    subtitle,
    client,
    accountNumber,
    currency = currencyEnum.EUR,
    beneficiaryAccountNumber,
    extra,
    beneficiaryName,
    title,
    rightAlign,
    isOwnAccount,
    isFee,
    bulkFiles,
    ...restProps
  } = props
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const hiddenCardNumber = useMemo(() => `*${accountNumber?.slice(-4)}`, [accountNumber])
  const formatIBAN = useMemo(() => accountNumber?.replace(/ +/g, '').trim(), [accountNumber])
  const position = useMemo(() => (rightAlign ? 'flex-end' : 'flex-start'), [rightAlign])

  const onCopy = useCallback(
    (item) => () => {
      Clipboard.setStringAsync(item)
    },
    [],
  )

  return (
    <Row {...restProps}>
      {!isFee ? (
        <BodySmall color="darkGray" flex={1}>
          {subtitle}
        </BodySmall>
      ) : null}
      {!isFee ? (
        <Column flex={2} alignItems={position}>
          <Title>{!bulkFiles ? client || beneficiaryName : 'Bulk file'}</Title>
          <Column mt="s" alignItems={position}>
            {!isOwnAccount ? (
              <Row alignItems="center">
                {bulkFiles ? renderIcon(icons.shiftedFile, { width: 25, height: 25 }) : null}

                <Caption mr="xs">
                  {!bulkFiles
                    ? formatIBAN
                    : `${bulkFiles} ${t('BULK_TRANSACTIONS').toLocaleLowerCase()}`}
                </Caption>

                {extra
                  ? null :
                  (accountNumber ? <ActionTypeSetting onAction={onCopy(accountNumber)} label={"Account Number"} type={SECTION_FIELD_TYPE.COPY} /> : null)
                }
              </Row>
            ) : (
              <Row alignItems="center">
                {currencyIcons[currency as string]
                  ? renderIcon(currencyIcons[currency as string], dimensions)
                  : null}
                <Caption ml="s" mr="xs">
                  {title ? `${title}, ` : null}
                  {hiddenCardNumber}
                </Caption>
                {extra ? null : <ActionTypeSetting onAction={onCopy(accountNumber)} label={"Account Number"} type={SECTION_FIELD_TYPE.COPY} />}
              </Row>
            )}
            {extra ?
              <Row alignItems='center' mt="xs">
                <Caption mr="xs">{extra}</Caption>
                <ActionTypeSetting onAction={onCopy(extra)} label={"Account Number"} type={SECTION_FIELD_TYPE.COPY} />
              </Row>
              : null}

          </Column>
        </Column>
      ) : (
        <Row justifyContent="flex-end" alignItems="center" width="100%">
          {renderIcon(icons.smallLogo, { width: 15, height: 15 })}
          <BodySmall ml="xs">MoneyGate</BodySmall>
        </Row>
      )}
    </Row>
  )
})

const dimensions = { height: 16, width: 16 }

const Title = styled(BodySmall)`
  font-weight: 500;
`
