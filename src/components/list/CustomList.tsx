import { Indicator } from 'components/elements/Indicator'
import { Column } from 'components/layout/Column'
import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

interface ListProps {
  listHeight?: number
  children: JSX.Element
}

export const CustomList = memo((props: ListProps & LayoutItemProps) => {
  const { listHeight, children, ...restProps } = props
  return (
    <Wrapper height={listHeight} {...restProps}>
      <Indicator />
      {children}
    </Wrapper>
  )
})

const Wrapper = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`
