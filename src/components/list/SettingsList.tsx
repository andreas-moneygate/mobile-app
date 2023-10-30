import { SettingSection } from 'components/card/SettingSection'
import { Column } from 'components/layout/Column'
import { memo, useCallback } from 'react'
import styled from 'styled-components/native'

interface SettingsListProps {
  data: any[]
  onChange: (data: any) => void
}

export const SettingsList = memo((props: SettingsListProps) => {
  const { data, onChange } = props

  const onSelected = useCallback(item => () => onChange(item), [onChange])

  return (
    <Column>
      {data.map((section: any, index: number) => (
        <Column key={index}>
          <Line />
          {section.fields.map((item: any, i: number) => (
            <SettingSection
              {...item}
              initialValue={item.value}
              onChange={onSelected(item)}
              index={i}
              key={i}
            />
          ))}
        </Column>
      ))}
    </Column>
  )
})

const Line = styled(Column)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 10px;
  width: 100%;
`
