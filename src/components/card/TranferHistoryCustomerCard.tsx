import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Body } from 'components/typography/Body'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { gradients } from 'theme/gradients'
import { LayoutItemProps, SvgComponent } from 'types/ui'
import { createTextLogo, renderIcon } from 'utils/ui'

export interface TransactionHistoryCardProps {
  accountNumber: string
  beneficiaryName: string
  logo?: SvgComponent | JSX.Element | undefined
  onPress?: () => void
}

export const TransferHistoryCustomerCard = memo<LayoutItemProps & TransactionHistoryCardProps>(
  props => {
    const { beneficiaryName, accountNumber, logo, onPress, ...restProps } = props
    const txtLogo = useMemo(() => createTextLogo(beneficiaryName), [beneficiaryName])

    return (
      <Card onPress={onPress} {...restProps}>
        <Row>
          <Gradient
            colors={gradients.logo.colors}
            start={[1, 1]}
            end={[0, 0]}
            locations={gradients.logo.locations}
          >
            {logo ? <Icon>{renderIcon(logo)}</Icon> : <Body color="white">{txtLogo}</Body>}
          </Gradient>
          <Column ml="m">
            <Title>{beneficiaryName}</Title>
            <Caption color="midGray">{accountNumber}</Caption>
          </Column>
        </Row>
        <Column>{renderIcon(icons.chevronRight)}</Column>
      </Card>
    )
  },
)

const Gradient = styled(LinearGradient)`
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  height: 40px;
  width: 40px;
`

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
