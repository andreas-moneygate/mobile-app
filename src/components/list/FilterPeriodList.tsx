import { Button } from 'components/buttons/Button'
import { CustomCalendar } from 'components/content/CustomCalendar'
import { WeekDaysBar } from 'components/elements/WeekDaysBar'
import { Column } from 'components/layout/Column'
import { PeriodButtonsList } from 'components/list/PeriodButtonsList'
import moment from 'moment'
import { memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import {
  compareDate,
  formatCurrentDate,
  formatSelectedPeriod,
  getPastDate,
  getPeriod,
  getStartPeriod,
} from 'utils/date'
import { timePeriod } from 'utils/enum'

interface ListProps {
  onSelect: (period: any) => void
  periodData: any[]
  initialPeriod?: { start: string; end: string }
  title?: string
  calendarContainerHeight?: number
  hidePeriodButtons?: boolean
  disableBtn?: boolean
}

export const FilterPeriodList = memo((props: ListProps) => {
  const {
    onSelect,
    periodData,
    initialPeriod,
    title,
    calendarContainerHeight,
    disableBtn,
    hidePeriodButtons,
    ...restProps
  } = props

  const [period, setPeriod] = useState<any>(initialPeriod || { start: null, end: null })
  const { start, end } = period

  const [markedDates, setMarkedDates] = useState({})
  const [selectedBtn, setSelectedBtn] = useState(getPeriod(period))

  const currentDate = formatCurrentDate(new Date())
  const selectedPeriod = formatSelectedPeriod(start, end)

  const onSelectedCustomPeriod = useCallback(
    (day: any) => {
      if (start && !end) {
        const date = getStartPeriod(start, day)
        setMarkedDates(date)
        setPeriod({ ...period, end: day.dateString })
      } else {
        setPeriod({ start: day.dateString, end: null })
        setMarkedDates({
          [day.dateString]: internalPointsStyle,
        })
      }
    },
    [period, start, end],
  )

  useEffect(() => {
    if (start && end) {
      const date = getStartPeriod(start, { dateString: end })
      date[end] = endDayStyle
      setMarkedDates(date)
    }
  }, [])

  const renderPeriod = useCallback(
    month => {
      const startDay = getPastDate(currentDate, month)
      const formatStartDay = formatCurrentDate(startDay)
      const date = getStartPeriod(formatStartDay, currentDate)
      date[currentDate] = endDayStyle
      setMarkedDates(date)
      setPeriod({ start: formatStartDay, end: currentDate })
    },
    [currentDate],
  )

  const onDayPress = useCallback(
    (day: any) => {
      onSelectedCustomPeriod(day)
    },
    [onSelectedCustomPeriod],
  )

  const onReset = useCallback(() => {
    setMarkedDates({})
    setPeriod({ start: null, end: null })
  }, [])

  const renderPeriodType = useCallback(
    (title: string) => () => {
      setSelectedBtn(title)
      switch (title) {
        case timePeriod.MONTH: {
          return renderPeriod(1)
        }
        case timePeriod.MM: {
          return renderPeriod(2)
        }
        case timePeriod.QUARTER: {
          return renderPeriod(4)
        }
        default:
          return onReset()
      }
    },
    [renderPeriod, onReset],
  )

  const onChoose = useCallback(() => {
    onSelect({ start, end })
  }, [onSelect, start, end])

  useEffect(() => {
    if (selectedBtn === timePeriod.MONTH) {
      renderPeriod(1)
    }
  }, [selectedBtn, renderPeriod])

  return (
    <Container {...restProps}>
      <WeekDaysBar />
      <Column height={calendarContainerHeight}>
        <CustomCalendar
          current={currentDate}
          markedDates={markedDates}
          minDate={yearAgo}
          maxDate={currentDate}
          onDayPress={onDayPress}
        />
      </Column>
      <Column>
        {!hidePeriodButtons ? (
          <PeriodButtonsList data={periodData} selected={selectedBtn} onSelect={renderPeriodType} />
        ) : null}
        <Button
          onPress={onChoose}
          title={title || `Choose ${selectedPeriod}`}
          m="l"
          disabled={disableBtn || !start || !end || compareDate(start, end) || start === end}
        />
      </Column>
    </Container>
  )
})

const Container = styled(Column)`
  flex: 1px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: space-between;
`

const internalPointsStyle = {
  startingDay: true,
  endingDay: true,
  customTextStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  color: '#FB7021',
}

const endDayStyle = {
  endingDay: true,
  customTextStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  customContainerStyle: { borderBottomLeftRadius: 0, borderTopLeftRadius: 0 },
  color: '#FB7021',
}

const yearAgo = moment().add(-1, 'year').format('YYYY-MM-DD')
