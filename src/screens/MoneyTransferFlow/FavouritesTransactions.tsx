import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  AccountHeader,
  Body,
  Button,
  Caption,
  Column,
  CustomBottomModalSheet,
  FavouriteTransactionCard,
  KeyboardAvoidingView,
  MedBackground,
  SearchInput,
} from 'components'
import useFavouritesTransactions from 'hooks/useFavouritesTransactions'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import styled from 'styled-components/native'
import { I18N_NAMESPACES } from 'utils/i18n'
import { TRANSACTION_ICONS } from 'utils/transactions'

function FavouritesTransactions() {
  const { goBack } =
    useNavigation<NavigationProp<MoneyTransferStackParamList & DashboardStackParamList>>()
  const { t } = useTranslation()
  const insets = useSafeAreaInsets()
  const { favoriteTransactions, repeatFavoriteTransaction, deleteTransactionFromFavorites } =
    useFavouritesTransactions()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const [title, setTitle] = useState('')
  const [removeIndex, setRemoveIndex] = useState<number | undefined>()
  const [removeItem, setRemoveItem] = useState('')

  const filteredData = useMemo(
    () =>
      favoriteTransactions.filter((transaction: any) =>
        transaction.title.toLowerCase().includes(title.toLowerCase()),
      ),
    [favoriteTransactions, title],
  )

  const handleRemoveItem = useCallback(
    (item: any, index: number) => () => {
      Keyboard.dismiss()
      bottomSheetModalRef?.current?.present()
      setRemoveIndex(index)
      setRemoveItem(item)
    },
    [],
  )

  const handlePressItem = useCallback(
    item => () => {
      repeatFavoriteTransaction(item.id)
    },
    [repeatFavoriteTransaction],
  )

  const handleCloseBottomModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
    setRemoveIndex(undefined)
    setRemoveItem(undefined)
  }, [])

  const handleChangeBottomModal = useCallback((index: number) => {
    if (index <= 0) {
      handleCloseBottomModal()
    }
  }, [])

  const handleRemoveTransaction = useCallback(() => {
    if (removeItem?.id) {
      deleteTransactionFromFavorites(removeItem.id)
      handleCloseBottomModal()
    }
  }, [removeItem?.id])

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <FavouriteTransactionCard
        {...item}
        icon={TRANSACTION_ICONS[item.type]}
        onToggle={handleRemoveItem(item, index)}
        onPress={handlePressItem(item)}
        isFavorite={index !== removeIndex}
        mt="l"
      />
    ),
    [handlePressItem, removeIndex],
  )

  const handleSearch = useCallback((text: any) => setTitle(text), [])

  const onReset = useCallback(() => setTitle(''), [])

  return (
    <KeyboardAvoidingView>
      <MedBackground>
        <AccountHeader
          title={t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::FAVORITE_TRANSACTIONS`)}
          onBack={goBack}
        />
        <SearchInput
          placeholder={t('SEARCH')}
          value={title}
          onChangeText={handleSearch}
          onReset={onReset}
          search
        />
      </MedBackground>
      <Wrapper ph="l" pb={insets.bottom}>
        {filteredData.length > 0 ? (
          <List
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Caption color="darkGray" mt="l">
            No matching results found
          </Caption>
        )}
      </Wrapper>
      <CustomBottomModalSheet
        innerRef={bottomSheetModalRef}
        onChange={handleChangeBottomModal}
        snapPoints={['1%', 300]}
      >
        <Column m="l">
          <Body fontWeight="600" textAlign="center" mh="xl" mt="l" mb="xl">
            {t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::REMOVE_FROM_FAVORITES`, {
              title: removeItem?.title,
            })}
          </Body>

          <Button title={t('REMOVE')} onPress={handleRemoveTransaction} mt="s" />
          <Button title={t('CANCEL')} type="light" onPress={handleCloseBottomModal} mt="l" />
        </Column>
      </CustomBottomModalSheet>
    </KeyboardAvoidingView>
  )
}

const Wrapper = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1px;
  justify-content: space-between;
`

const List = styled(FlatList)`
  background-color: ${({ theme }) => theme.colors.white};
`

export default memo(FavouritesTransactions)
