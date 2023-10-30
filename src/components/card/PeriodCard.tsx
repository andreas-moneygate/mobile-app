import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import styled from 'styled-components/native'

interface PeriodButtonProps {
  title: string
  isSelected: boolean
  onSelect: () => void
}

export const PeriodCard = memo((props: PeriodButtonProps) => {
  const { title, isSelected, onSelect, ...restProps } = props
  return (
    <Btn ph="m" bc={isSelected ? 'black' : 'darkGray'} onPress={onSelect} {...restProps}>
      <Caption color={isSelected ? 'black' : 'darkGray'}>{title}</Caption>
    </Btn>
  )
})

const Btn = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  height: 30px;
  border-width: 1px;
  border-radius: 40px;
`
