import { Row } from 'components/layout/Row'
import { Caption } from 'components/typography/Caption'
import _ from 'lodash'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'
import { numbersWithDot } from 'utils/ui'

interface TransformationCourseProps {
  value: string
  fromCurr: string
  toCurr: string
  course: number
  fee?: string | number
}
export const ExchangeRate = memo((props: TransformationCourseProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const { value, fromCurr, toCurr, course, fee } = props
  const defaultValue = useMemo(
    () => (value !== currencySymbols[fromCurr] ? value : 0),
    [value, fromCurr],
  )
  const numberValue = useMemo(
    () => (value?.length > 1 ? +numbersWithDot(value) || '0.00' : defaultValue),
    [defaultValue, value],
  )

  const sum = useMemo(() => (+numberValue * course).toFixed(2), [numberValue, course])

  if (fee) {
    return (
      <Transfer ph="m">
        <Caption color="purple85">{t(`${I18N_NAMESPACES.COMMON}::TRANSACTION_FEE`)}:&nbsp;</Caption>
        <Caption color="purple85" bold>
          {currencySymbols[fromCurr]}
          {fee}
        </Caption>
      </Transfer>
    )
  }

  return course !== 1 ? (
    <Transfer ph="m">
      <Caption color="purple85" bold>
        {sum} {toCurr}&nbsp;
      </Caption>
      <Caption color="purple85">
        {t('PER_COURSE')} 1{currencySymbols[fromCurr]} = {course} {toCurr}
      </Caption>
    </Transfer>
  ) : null
})

const Transfer = styled(Row)`
  background-color: ${({ theme }) => theme.colors.mintCream};
  border-radius: 20px;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 20px;
  flex: 1px;
`
