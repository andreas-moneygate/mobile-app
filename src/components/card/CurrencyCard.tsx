import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { Currency, currencyEnum, currencyIcons } from 'utils/currencies'
import { renderIcon } from 'utils/ui'

interface CurrencyCardProps {
  item: Currency
  containerStyle?: object
  onSelect: () => void
  base?: boolean
  index?: number | undefined
  hideRate?: boolean
  hideArrow?: boolean
}

export const CurrencyCard = memo<CurrencyCardProps & LayoutItemProps>(props => {
  const { item, base, index, hideRate, hideArrow, onSelect, ...restProps } = props
  const { currency, title, rate } = item

  const handleIcon = useMemo(
    () =>
      !hideArrow
        ? renderIcon(index !== undefined && index <= 0 ? icons.chevronDown : icons.chevronUp, {
            color: 'black',
          })
        : null,
    [hideArrow, index],
  )

  return (
    <Card {...restProps} onPress={onSelect} bbw={base ? 0 : 1}>
      <Row flex={2}>
        <Centered>
          {renderIcon(currencyIcons[currency as string] || currencyIcons['USD'], iconStyle)}
        </Centered>
        <Column ml="m">
          <BodySmall>{currencyEnum[currency as string]}</BodySmall>
          <Caption color="darkGray">{title}</Caption>
        </Column>
      </Row>
      <Row justifyContent={hideRate ? 'flex-end' : 'space-between'} flex={1}>
        {rate && !hideRate ? <BodySmall>{rate}</BodySmall> : null}
        {base ? handleIcon : !hideArrow && <Centered>{renderIcon(icons.chevronRight)}</Centered>}
      </Row>
    </Card>
  )
})

const Card = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  padding-right: ${({ theme }) => theme.spacings.xl}px;
  padding-left: ${({ theme }) => theme.spacings.l}px;
  border-color: ${({ theme }) => theme.colors.gray95};
  border-bottom-width: 1px;
`

const iconStyle = { width: 24, height: 24 }
