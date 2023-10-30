import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Body } from 'components/typography/Body'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { LinearGradient } from 'expo-linear-gradient'
import { memo, useMemo } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { gradients } from 'theme/gradients'
import { LayoutItemProps, SvgComponent } from 'types/ui'
import { renderIcon } from 'utils/ui'

export interface FavoriteTransactionCardProps {
  title: string
  beneficiaryName: string
  category: string
  icon?: SvgComponent | JSX.Element | undefined
  onPress?: () => void
  onToggle?: () => void
  isFavorite: boolean
}

export const FavouriteTransactionCard = memo<LayoutItemProps & FavoriteTransactionCardProps>(
  props => {
    const {
      title,
      beneficiaryName,
      category,
      icon,
      isFavorite = true,
      onPress,
      onToggle,
      ...restProps
    } = props

    const {
      colors: { gray, purple },
    } = useTheme()

    const txtLogo = useMemo(() => beneficiaryName?.match(/[A-Z]/gu)?.slice(0, 2), [beneficiaryName])

    return (
      <Card {...restProps}>
        <TouchableOpacity onPress={onPress}>
          <Row>
            <Gradient
              colors={gradients.logo.colors}
              start={[1, 1]}
              end={[0, 0]}
              locations={gradients.logo.locations}
            >
              {icon ? <Icon>{renderIcon(icon)}</Icon> : <Body color="white">{txtLogo}</Body>}
            </Gradient>
            <Column ml="m">
              <Title>{title}</Title>
              <Caption color="midGray">{category}</Caption>
            </Column>
          </Row>
        </TouchableOpacity>

        <IconButton
          icon={isFavorite ? icons.favorite : icons.favoriteBorder}
          iconColor={isFavorite ? purple : gray}
          iconStyle={iconStyle}
          onPress={onToggle}
        />
      </Card>
    )
  },
)

const Card = styled(Column)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  width: 100%;
`
const Gradient = styled(LinearGradient)`
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 40px;
  width: 40px;
`

const Icon = styled(Centered)`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`
const iconStyle = { height: 20, width: 20 }

const Title = styled(BodySmall)`
  font-weight: 500;
`
