import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Body } from 'components/typography/Body'
import moment from 'moment'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

export const WeekDaysBar = memo(({ ...restProps }: LayoutItemProps) => {
  const week = useMemo(() => Array(...Array(7)), [])
  const weekDays = useMemo(
    () =>
      week.map(function (_, i) {
        return moment(i, 'e')
          .startOf('week')
          .isoWeekday(i + 1)
          .format('dd')
      }),
    [week],
  )
  return (
    <Container {...restProps}>
      <Row justifyContent="space-between" ph="m">
        {weekDays.map((name: any, i: number) => (
          <Centered flex={1} key={i}>
            <Body key={i} color="midGray">
              {name}
            </Body>
          </Centered>
        ))}
      </Row>
    </Container>
  )
})

const Container = styled(Column)`
  width: 100%;
  height: 50px;
  padding-top: ${({ theme }) => theme.spacings.l}px;
  padding-bottom: ${({ theme }) => theme.spacings.s}px;
  border-color: ${({ theme }) => theme.colors.gray95};
  border-bottom-width: 1px;
`
