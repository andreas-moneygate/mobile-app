import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { currencyIcons } from 'utils/currencies'
import { renderIcon } from 'utils/ui'

interface LanguageCardProps {
  item: any
  isSelected: boolean
  onSelect: () => void
}

export const LanguageCard = memo((props: LanguageCardProps & LayoutItemProps) => {
  const { item, isSelected, onSelect, ...restProps } = props
  const { label, icon } = item

  return (
    <Card {...restProps} onPress={onSelect} bbw={1}>
      <Row alignItems="center">
        {renderIcon(icon, iconStyle)}
        <Column ml="m">
          <Caption color="darkGray">{label}</Caption>
        </Column>
      </Row>
      {isSelected ? <GreenCircle>{renderIcon(icons.check)}</GreenCircle> : null}
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

const GreenCircle = styled(Column)`
  border-radius: 10px;
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.green};
`

const iconStyle = { width: 24, height: 24 }
