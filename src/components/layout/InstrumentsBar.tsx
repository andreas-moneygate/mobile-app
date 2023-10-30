import { ActionButton } from 'components/buttons/ActionButton'
import { Row } from 'components/layout/Row'
import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

interface InstrumentsBarProps {
  leftIcon: 'filter' | undefined
  rightIcon: 'search' | undefined
  onLeftPress?: any
  onRightPress?: any
  children?: JSX.Element
}

export const InstrumentsBar = memo((props: InstrumentsBarProps & LayoutItemProps) => {
  const { leftIcon, rightIcon, onLeftPress, onRightPress, children, ...restProps } = props
  return (
    <Container {...restProps}>
      <ActionButton type={leftIcon} onAction={onLeftPress} />
      {children}
      <ActionButton type={rightIcon} onAction={onRightPress} />
    </Container>
  )
})

const Container = styled(Row)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 7px;
`
