import { ActionCard } from 'components/card/ActionCard'
import { Column } from 'components/layout/Column'
import { Body } from 'components/typography/Body'
import useActions from 'hooks/useActions'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { I18N_NAMESPACES } from 'utils/i18n'

interface MoreActionsList {
  onNext: (action: any) => void
  onCloseModal: () => void
}

export const MoreActionsList = memo((props: MoreActionsList & LayoutItemProps) => {
  const { t } = useTranslation()
  const { onCloseModal, onNext } = props
  const actions = useActions()

  const onSelect = useCallback(
    action => () => {
      onNext(action.route)
      onCloseModal()
    },
    [onNext, onCloseModal],
  )

  const renderHeader = useCallback(
    () => (
      <Column>
        <Title>{t('CHOOSE_ACTION')}</Title>
      </Column>
    ),
    [],
  )
  const renderItem = useCallback(
    ({ item, index }) => (
      <ActionCard {...item} mt={index !== 0 ? 'l' : 'xxl'} onPress={onSelect(item)} />
    ),
    [onSelect],
  )

  return (
    <List
      data={actions}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item: any) => item.id}
    />
  )
})

const Title = styled(Body)`
  font-weight: 600;
`

const List = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
}))`
  background-color: ${({ theme }) => theme.colors.white};
`
