import { TypeCard } from 'components/card/TypeCard'
import { Column } from 'components/layout/Column'
import { Item } from 'components/picker/ItemPicker'
import { memo, useCallback } from 'react'

interface ItemSectionList {
  data: Array<Item>
  value: Item['value']
  onSelect: (type: Item) => void
}

export const ItemSectionsList = memo((props: ItemSectionList) => {
  const { data, onSelect, value: selectedValue } = props

  const onSelected = useCallback(
    (value: Item) => () => {
      onSelect(value)
    },
    [onSelect],
  )

  return (
    <Column>
      {data.map((item, index) => (
        <TypeCard
          title={item.label}
          onSelect={onSelected(item)}
          isSelected={selectedValue === item.value}
          key={`${item.value}-${index}`}
        />
      ))}
    </Column>
  )
})
