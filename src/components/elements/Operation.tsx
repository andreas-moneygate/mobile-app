import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Caption } from 'components/typography/Caption'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components/native'
import { IconProp } from 'types/ui'
import { renderIcon } from 'utils/ui'

export interface OperationProps {
  title: string
  icon: IconProp
  type?: 'send' | 'favorite' | 'default'
  onPress: (title: string) => void
  disabled?: boolean
}

export const Operation = memo((props: OperationProps) => {
  const { icon, title, onPress, type = 'default', disabled } = props
  const onSelect = useCallback(() => onPress(title), [onPress, title])

  const renderBG = useMemo(() => {
    switch (type) {
      case 'send':
        return 'pumpkin85'
      case 'favorite':
        return 'white'
      case 'default':
        return 'white20'
    }
  }, [type])

  return (
    <Centered opacity={disabled ? 0.5 : 1}>
      <Circle bg={renderBG} onPress={onSelect} disabled={disabled}>
        <Centered>{renderIcon(icon)}</Centered>
      </Circle>
      <Title mt="xs">{title}</Title>
    </Centered>
  )
})

const Circle = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 50px;
`
const Title = styled(Caption)`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  width: 80px;
`
