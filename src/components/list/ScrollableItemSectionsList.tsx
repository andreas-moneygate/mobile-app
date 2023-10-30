import { TypeCard } from 'components/card/TypeCard'
import { SearchInput } from 'components/input/SearchInput'
import { Column } from 'components/layout/Column'
import { t } from 'i18next'
import { memo, useCallback, useMemo, useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Item } from 'types/pickers'
import { I18N_NAMESPACES } from 'utils/i18n'

interface ScrollableItemSectionList {
  data: Array<Item>
  value: Item['value']
  onSelect: (type: Item) => void
}

export const ScrollableItemSectionsList = memo((props: ScrollableItemSectionList) => {
  const { data, onSelect, value: selectedValue } = props

  const onSelected = useCallback(
    (value: Item) => () => {
      onSelect(value)
    },
    [onSelect],
  )

  const [searchTerm, setTerm] = useState('')
  const handleSearch = useCallback((text: any) => setTerm(text), [])
  const onReset = useCallback(() => setTerm(''), [])

  const filteredData = useMemo(
    () =>
      data?.filter(
        (transfer: Item) =>
          transfer.label.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, data],
  )

  return (
    <Column>
      <SearchInput
        placeholder={t(`${I18N_NAMESPACES.COMMON}::SEARCH`) as string}
        value={searchTerm}
        onChangeText={handleSearch}
        onReset={onReset}
        outline
        search
      />
      <FlatList
        data={filteredData}
        renderItem={({ item, index }) =>
          <TypeCard
            title={item.label}
            onSelect={onSelected(item)}
            isSelected={selectedValue === item.value}
            key={`${item.value}-${index}`}
          />}
        keyExtractor={item => item.label}
      />
    </Column>
  )
})
