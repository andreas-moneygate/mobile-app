import moment from 'moment'

import { timePeriod } from './enum'

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const extremePoints = (start: boolean, end: boolean) => ({
  customTextStyle: {
    fontWeight: start || end ? 'bold' : '400',
    color: start || end ? 'white' : 'black',
  },
  startingDay: start,
  endingDay: end,
  color: start || end ? '#FB7021' : '#FFEFE6',
})

export const formatShortMonth = (date: any) => moment(date).format('MMMM Y')
export const formatCurrentDate = (date: any) => moment(date).format('YYYY-MM-DD')
export const submitFormatDate = (date: any) => moment(date).format('ddd, D MMM')
export const getPastDate = (date: any, month: number) => moment(date).add(-month, 'month')
export const formatWeekDayMonth = (date: any) =>
  `${weekDays[moment(date).day()]}, ${moment(date).format('DD MMMM')}`
export const formatDayMonth = (date: any) => moment(date).format('D MMM')
export const formatMonth = (date: any) => moment(date).format('MMM')
export const formatDay = (date: any) => moment(date).format('D')
export const formatDate = (date: any) => moment(date).format('DD MMM YYYY')
export const formatDateWithTime = (date: any) => moment(date).format('DD MMM YYYY, HH:mm')
export const formatTime = (date: any) => moment(date).format('HH:mm')
export const compareDate = (d1: any, d2: any) => {
  return new Date(d1?.replace(/-/g, '/')) > new Date(d2?.replace(/-/g, '/'))
}

export const formatSelectedPeriod = (start: string, end: string) => {
  const startDate = formatDayMonth(start)
  const endDate = formatDayMonth(end)
  if (start && !compareDate(start, end)) {
    if (formatMonth(start) !== formatMonth(end)) {
      return `${startDate} - ${end ? endDate : ''}`
    } else {
      return `${formatDay(start)} - ${endDate}`
    }
  } else return ''
}

export const getStartPeriod = (startDate: any, day: any) => {
  const date: any = {}
  for (const d: any = moment(startDate); d.isSameOrBefore(day.dateString); d.add(1, 'days')) {
    const stepData: any = formatCurrentDate(d)
    const start: any = stepData === startDate
    const end: any = stepData === day?.dateString
    date[stepData] = extremePoints(start, end)
    if (start) {
      date[stepData].startingDay = true
    }
    if (end) {
      date[stepData].endingDay = true
    }
  }
  return date
}

export const getPeriod = ({
  start,
  end,
}: {
  start: string | undefined
  end: string | undefined
}) => {
  if (!start || !end) return timePeriod.MONTH
  if (
    moment(end).isSame(moment(), 'day') &&
    moment(start).isSame(moment().add(-1, 'month'), 'day')
  ) {
    return timePeriod.MONTH
  }
  if (
    moment(end).isSame(moment(), 'day') &&
    moment(start).isSame(moment().add(-2, 'month'), 'day')
  ) {
    return timePeriod.MM
  }
  return timePeriod.CUSTOM
}
