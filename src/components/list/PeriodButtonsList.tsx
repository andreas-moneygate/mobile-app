import { PeriodCard } from 'components/card/PeriodCard'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import React, { memo, useCallback } from 'react'
import styled from 'styled-components/native'

interface PeriodButtonsListProps {
  data: any[]
  selected: string | undefined
  onSelect: (period: any) => void
}

export const PeriodButtonsList = memo((props: PeriodButtonsListProps) => {
  const { data, selected, onSelect } = props

  const onSelected = useCallback(period => onSelect(period), [onSelect])

  return (
    <Container style={shadowStyle}>
      <ScrollWrapper horizontal showsHorizontalScrollIndicator={false}>
        <Row justifyContent="center" width="100%">
          {data?.map((period: any, index: number) => (
            <PeriodCard
              {...period}
              key={index}
              ml={index !== 0 ? 'm' : 'l'}
              onSelect={onSelected(period.title)}
              isSelected={selected === period.title}
            />
          ))}
        </Row>
      </ScrollWrapper>
    </Container>
  )
})

const Container = styled(Column)`
  height: 55px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    width: '100%',
  },
}))``

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
}
