import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { TypeAccountCard } from 'components/card/TypeAccountCard'
import { Body } from 'components/typography/Body'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { Account } from 'utils/currencies'
import { MappedAccount } from 'types/mapped/account'
import { CustomRowAccountCard } from 'components/card/CustomRowAccountCard'
import { useTranslation } from 'react-i18next'

interface AccountPickerListProps {
  accounts: any[]
  onSelect: (account: any) => void
  onCloseModal: () => void
  includesAllFilter?: boolean
}

interface Item {
  type: 'item' | 'custom',
  account?: MappedAccount,
  title?: string
}

export const AccountPickerList = memo((props: AccountPickerListProps & LayoutItemProps) => {
  const { accounts, onSelect, onCloseModal, includesAllFilter, ...restProps } = props

  const { t } = useTranslation()

  const accountPickerData = useMemo(() => {
    const items: Item[] = accounts.map((account) => {
      return {
        type: 'item',
        account: account
      }
    });
    if (includesAllFilter === true) {
      const customItem: Item = { type: 'custom', title: t('ALL_ACCOUNTS')! };
      items.unshift(customItem);
    }
    return items;
  }, [accounts, includesAllFilter]);

  const onSelected = useCallback(
    (account?: Account) => {
      onSelect(account)
      onCloseModal()
    },
    [onSelect, onCloseModal],
  )

  const onFilterSelected = useCallback(
    () => {
      onSelect(null)
      onCloseModal()
    },
    [onSelect, onCloseModal],
  )

  const renderHeader = useCallback(() => {
    return <Title>Select account</Title>
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: Item }) => {
      {
        switch (item.type) {
          case 'item':
            return <TypeAccountCard account={item.account!} mt="l" onPress={onSelected} />;
          case 'custom':
            return <CustomRowAccountCard title={item.title} onPress={onFilterSelected} />;
        }
      }
    },
    [onSelected],
  )

  return (
    <List
      data={accountPickerData}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={false}
      {...restProps}
    />
  )
})

const List = styled(BottomSheetFlatList)`
  margin: ${({ theme }) => theme.spacings.l}px;
`

const Title = styled(Body)`
  font-weight: 500;
`