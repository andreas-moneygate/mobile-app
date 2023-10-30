import { ProgressBar } from 'components/content/ProgressBar'
import { ValidPassword } from 'components/elements/ValidPassword'
import { Column } from 'components/layout/Column'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { I18N_NAMESPACES } from 'utils/i18n'

interface ValidPassBarProps {
  value: string
}

type Fields = {
  title: string
  id: number
  condition: any
}

export const ValidPassBar = memo((props: ValidPassBarProps) => {
  const { value } = props
  const [valid, setValid] = useState<number[]>([])
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

  const validFields = useMemo(
    () => [
      { title: t('CHANGE_PASSWORD_VALIDATION1'), condition: /^().{8,}$/, id: 1 },
      { title: t('CHANGE_PASSWORD_VALIDATION2'), condition: /[A-Z]/, id: 2 },
      { title: t('CHANGE_PASSWORD_VALIDATION3'), condition: /\d/, id: 3 },
      { title: t('CHANGE_PASSWORD_VALIDATION4'), condition: /\W/, id: 4 },
    ],
    [t],
  )

  const onValid = useCallback(
    (field: Fields) => {
      const { condition, id } = field
      if (value.match(condition)) {
        if (!valid.includes(id)) {
          setValid([...valid, id])
        }
      } else {
        if (valid.includes(id)) {
          const newArray = valid.filter((n: number) => n !== id)
          setValid(newArray)
        }
      }
      return value.match(condition)
    },
    [value, valid],
  )

  useEffect(() => {
    if (value === '') {
      setValid([])
    }
  }, [value])

  return (
    <Column mb="xxl">
      <ProgressBar step={valid.length} numberOfSteps={4} line />
      {validFields.map((field: Fields, index: number) => (
        <ValidPassword {...field} complete={!!(value && onValid(field))} key={index} mt="m" />
      ))}
    </Column>
  )
})
