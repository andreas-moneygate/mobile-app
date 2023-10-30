import { Body } from 'components/typography/Body'
import useSortedStyleProps from 'hooks/useSortedStyleProps'
import { memo, useCallback } from 'react'
import { CalendarList, CalendarProps } from 'react-native-calendars-with-gesture-handling'
import styled from 'styled-components/native'
import { formatShortMonth } from 'utils/date'

export const CustomCalendar = memo((props: CalendarProps) => {
  const styledProps = useSortedStyleProps(props)

  const Header = useCallback((props: any) => {
    return <MonthName ml="m">{formatShortMonth(props.current)}</MonthName>
  }, [])

  return (
    <CalendarList
      calendarHeight={300}
      customHeader={Header}
      hideDayNames
      hideExtraDays
      showSixWeeks={false}
      horizontal={false}
      firstDay={1}
      theme={themeCalendar}
      markingType="period"
      futureScrollRange={0}
      pastScrollRange={12}
      {...styledProps}
    />
  )
})

const MonthName = styled(Body)`
  font-weight: 600;
`

const themeCalendar: any = {
  calendarBackground: '#FFFFFF',
}
