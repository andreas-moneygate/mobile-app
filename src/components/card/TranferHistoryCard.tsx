import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { gradients } from 'theme/gradients'
import { LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface TransactionHistoryCardProps {
  iban: string
  beneficiaryName?: string
  inFavorites?: boolean
}

export const TransferHistoryCard = memo<LayoutItemProps & TransactionHistoryCardProps>(props => {
  const { beneficiaryName, iban, inFavorites, title: favTitle, ...restProps } = props

  const title = useMemo(() => `${iban.slice(0, 7)}****${iban.slice(-4)}`, [iban])

  return (
    <Card {...restProps}>
      <Row>
        <LinearGradient
          colors={gradients.outcome.colors}
          start={[1, 1]}
          end={[0, 0]}
          locations={gradients.outcome.locations}
          style={{ borderRadius: 10 }}
        >
          <Icon>{renderIcon(icons.bank)}</Icon>
        </LinearGradient>
        <Column ml="m">
          <Title>{!inFavorites ? `To ID: ${title}` : favTitle}</Title>
          <Caption color="midGray">{!inFavorites ? beneficiaryName : iban}</Caption>
        </Column>
      </Row>
      <Column>{renderIcon(icons.chevronRight)}</Column>
    </Card>
  )
})

const Card = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
`
const Icon = styled(Centered)`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`
