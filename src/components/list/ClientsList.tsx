import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { ActionCard } from 'components/card/ActionCard'
import { Column } from 'components/layout/Column'
import { Body } from 'components/typography/Body'
import useClients from 'hooks/useClients'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { I18N_NAMESPACES } from 'utils/i18n'

interface ClientsListProps {
  onPress: (client: any) => void
  onCloseModal: () => void
}

export const ClientsList = memo((props: ClientsListProps & LayoutItemProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const { onCloseModal, onPress } = props
  const { clients } = useClients()

  const onSelect = useCallback(
    client => () => {
      onPress(client)
      onCloseModal && onCloseModal()
    },
    [onPress, onCloseModal],
  )

  const renderHeader = useCallback(
    () => (
      <Column>
        <Title>{t('WANT_TO_CHANGE_CLIENT')}</Title>
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
      data={clients}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      keyExtractor={(item: any) => item.id}
    />
  )
})

const Title = styled(Body)`
  font-weight: 600;
`

const List = styled(BottomSheetFlatList).attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
}))`
  background-color: ${({ theme }) => theme.colors.white};
`
