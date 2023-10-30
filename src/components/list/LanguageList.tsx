import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { LanguageCard } from 'components/card/LanguageCard'
import { Body } from 'components/typography/Body'
import useLanguages from 'hooks/useLanguages'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

interface LanguageListProps {
  onSelect: (account: any) => void
  onCloseModal: () => void
}

export const LanguageList = memo((props: LanguageListProps & LayoutItemProps) => {
  const { onSelect, onCloseModal, ...restProps } = props
  const { i18n } = useTranslation()

  const data = useLanguages()

  const onSelected = useCallback(
    item => () => {
      onSelect(item)
      onCloseModal()
    },
    [onSelect, onCloseModal],
  )

  const renderHeader = useCallback(() => {
    return (
      <Title mb="xxl" mh="l">
        Change language
      </Title>
    )
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <LanguageCard
        item={item}
        onSelect={onSelected(item)}
        isSelected={item.value === i18n.language}
      />
    ),
    [i18n.language, onSelected],
  )
  return (
    <List
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item: any) => item?.id}
      showsVerticalScrollIndicator={false}
      {...restProps}
    />
  )
})

const Title = styled(Body)`
  font-weight: 600;
`
const List = styled(BottomSheetFlatList)`
  margin-top: ${({ theme }) => theme.spacings.l}px;
  margin-bottom: ${({ theme }) => theme.spacings.l}px;
`
