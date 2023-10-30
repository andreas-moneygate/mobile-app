import { Column } from 'components/layout/Column'
import moment from 'moment'
import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { formatCurrentDate, submitFormatDate } from 'utils/date'

import { DatePicker } from './DatePicker'
import { DatePickerTitleCalendar } from './DatePickerTitleCalendar'
import { NumbersPicker } from './NumbersPicker'
import { RadioPicker } from './RadioPicker'

interface Period {
  fromDate: string | undefined
  toDate: string | undefined
  maxTransactionsPerAccount: number | undefined
}

interface PeriodPickerProps {
  value: Period
  onSelect: (value: Period) => void
}

export const PeriodPicker = memo(({ value, onSelect }: PeriodPickerProps) => {
  const { t } = useTranslation()

  const [transactionsNumber, setTransactionsNumber] = useState<number>(
    value.maxTransactionsPerAccount || 10,
  )

  const handleChangeTransactionsNumber = useCallback(
    (value: number) => {
      setTransactionsNumber(value)

      onSelect({
        maxTransactionsPerAccount: value,
      })
    },
    [onSelect],
  )

  const periodItems = useMemo(
    () => [
      {
        label: (
          <NumbersPicker
            data={transactionNumberItems}
            value={transactionsNumber}
            onSelect={handleChangeTransactionsNumber}
          />
        ),
        value: {
          maxTransactionsPerAccount: transactionsNumber,
        },
      },
      {
        label: t('LAST_30_DAYS'),
        subLabel: submitFormatDate(last30days) + ' - ' + submitFormatDate(now),
        value: {
          fromDate: last30days,
          toDate: now,
        },
      },
      {
        label: t('LAST_60_DAYS'),
        subLabel: submitFormatDate(last60days) + ' - ' + submitFormatDate(now),
        value: {
          fromDate: last60days,
          toDate: now,
        },
      },
      {
        label: t('LAST_90_DAYS'),
        subLabel: submitFormatDate(last90days) + ' - ' + submitFormatDate(now),
        value: {
          fromDate: last90days,
          toDate: now,
        },
      },
    ],
    [handleChangeTransactionsNumber, t, transactionsNumber],
  )

  const initDatePickerValue = useMemo(
    () => ({
      start: value.fromDate,
      end: value.toDate,
    }),
    [value.fromDate, value.toDate],
  )

  const handleSelectPeriod = useCallback(
    (period: Period | string, end?: string) => {
      if (typeof period === 'string' && end) {
        return onSelect({ fromDate: period, toDate: end })
      }
      onSelect(period)
    },
    [onSelect],
  )

  return (
    <Column justifyContent="space-between">
      <Column ph="l">
        <RadioPicker
          value={value}
          data={periodItems}
          onSelect={handleSelectPeriod}
          radioSize={25}
          withDivider
        />

        <DatePicker
          title={t(`PICK_FROM_CALENDAR`)}
          initValue={initDatePickerValue}
          onSelect={handleSelectPeriod}
          hidePeriodButtons
          CustomPickerButton={DatePickerTitleCalendar}
        />
      </Column>
    </Column>
  )
})

const now = formatCurrentDate(moment())
const last30days = formatCurrentDate(moment().subtract(30, 'days'))
const last60days = formatCurrentDate(moment().subtract(60, 'days'))
const last90days = formatCurrentDate(moment().subtract(90, 'days'))

const transactionNumberItems = [
  {
    label: '5',
    value: 5,
  },
  {
    label: '10',
    value: 10,
  },
  {
    label: '20',
    value: 20,
  },
  {
    label: '30',
    value: 30,
  },
]
