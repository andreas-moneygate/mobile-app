import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Body } from 'components/typography/Body'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import styled from 'styled-components/native'

interface CategoryProps {
  color: any
  name: string
  y: string | number
  index: number
}

export const ExpenditureCategory = memo((props: CategoryProps) => {
  const { color, name, y, index } = props
  return (
    <Row mt={index !== 0 ? 'm' : 0} justifyContent="space-between">
      <Row>
        <Square color={color} mr="m" />
        <BodySmall>{name}</BodySmall>
      </Row>
      <Body>{y}%</Body>
    </Row>
  )
})

const Square = styled(Column)<{ color: string }>`
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background-color: ${({ color }) => color};
`
