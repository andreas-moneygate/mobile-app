import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { CurrencyCard } from 'components/card/CurrencyCard'
import { Body } from 'components/typography/Body'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { Currency } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'

interface CurrencyRatesListProps {
  data: Currency[]
  hideRates?: boolean
  hideArrow?: boolean
  onSelect: (account: any) => void
  onCloseModal: () => void
}

export const CurrencyRatesList = memo((props: CurrencyRatesListProps & LayoutItemProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const { data, hideRates, hideArrow, onSelect, onCloseModal, ...restProps } = props

  const onSelected = useCallback(
    item => () => {
      onSelect(item)
      onCloseModal()
    },
    [onSelect, onCloseModal],
  )

  const renderHeader = useCallback(() => {
    return <Title mb="xxl">{t('CHANGE_BASE_CURRENCY')}</Title>
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <CurrencyCard
        item={item}
        onSelect={onSelected(item)}
        hideRate={hideRates}
        hideArrow={hideArrow}
      />
    ),
    [hideArrow, hideRates, onSelected],
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
  margin: ${({ theme }) => theme.spacings.l}px;
`
