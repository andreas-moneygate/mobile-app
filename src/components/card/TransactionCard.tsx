import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Body } from 'components/typography/Body'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { LinearGradient } from 'expo-linear-gradient'
import usePrice from 'hooks/usePrice'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components/native'
import { gradients } from 'theme/gradients'
import { MappedTransaction } from 'types/mapped/transactions'
import { LayoutItemProps, SvgComponent } from 'types/ui'
import { currencySymbols } from 'utils/currencies'
import { createTextLogo, renderIcon } from 'utils/ui'

interface TransactionCardProps {
  transaction: MappedTransaction
  icon: SvgComponent | undefined
  onOpen: (transaction: MappedTransaction) => void
  beneficiaryLabel?: string
  beneficiaryName?: string
  grosAmount: number
  currency: string
  typeLabel: string
}

export const TransactionCard = memo((props: TransactionCardProps & LayoutItemProps) => {
  const {
    transaction,
    beneficiaryLabel,
    beneficiaryName,
    typeLabel,
    grosAmount,
    currency,
    icon,
    onOpen,
    ...restProps
  } = props
  const onSelect = useCallback(() => onOpen(transaction), [onOpen, transaction])

  const currencySymbol = useMemo(() => currencySymbols[currency], [currency])

  const { ceilPart, fractionalPart, isPositive } = usePrice(grosAmount)

  const title = beneficiaryLabel

  const txtLogo = useMemo(() => createTextLogo(beneficiaryName || ''), [beneficiaryName])
  return (
    <Card onPress={onSelect} {...restProps}>
      <Row flex={0.8}>
        <Gradient
          colors={isPositive ? gradients.income.colors : gradients.outcome.colors}
          start={[1, 1]}
          end={[0, 0]}
          locations={isPositive ? gradients.income.locations : gradients.outcome.locations}
        >
          {icon ? <Icon>{renderIcon(icon)}</Icon> : <Body color="white">{txtLogo}</Body>}
        </Gradient>
        <Column ml="m">
          <Title flex={1} flexWrap="wrap" ellipsizeMode="tail" numberOfLines={2}>
            {title}
          </Title>
          <Caption flex={1} color="midGray">
            {typeLabel}
          </Caption>
        </Column>
      </Row>
      <Box>
        <BodySmall color={isPositive ? 'green' : 'black'}>
          {!isPositive ? '-' : ''}
          {currencySymbol}
          {ceilPart}
        </BodySmall>
        <Caption color={isPositive ? 'green' : 'midGray'}>.{fractionalPart}</Caption>
      </Box>
    </Card>
  )
})

const Card = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  min-height: 40px;
  width: 100%;
`

const Gradient = styled(LinearGradient)`
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 40px;
  width: 40px;
`

const Box = styled(Centered)`
  flex-direction: row;
`

const Icon = styled(Centered)`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`
