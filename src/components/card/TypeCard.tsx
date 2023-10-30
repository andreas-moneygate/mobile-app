import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface TypeCardProps {
  title: string
  beneficiaryName?: string
  onSelect: () => void
  isSelected?: boolean
}

export const TypeCard = memo((props: TypeCardProps & LayoutItemProps) => {
  const { title, isSelected, onSelect, ...restProps } = props
  return (
    <TouchableOpacity onPress={onSelect}>
      <Card ph="l" {...restProps}>
        <Title numberOfLines={1} mr="l" flex={1}>
          {title}
        </Title>
        <Round bg={isSelected ? 'pumpkin85' : 'white'} bw={isSelected ? 0 : 1}>
          <Column>{isSelected && renderIcon(icons.check)}</Column>
        </Round>
      </Card>
    </TouchableOpacity>
  )
})

const Card = styled(Row)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-color: ${({ theme }) => theme.colors.gray95};
  border-bottom-width: 1px;
  height: 60px;
`

const Round = styled(Row)`
  border-color: ${({ theme }) => theme.colors.darkGray};
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 11px;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`
