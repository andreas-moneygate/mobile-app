import { NavigationProp, useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { SmallCard } from 'components/card/SmallCard'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Caption } from 'components/typography/Caption'
import useFavouritesTransactions from 'hooks/useFavouritesTransactions'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { LayoutItemProps } from 'types/ui'
import { I18N_NAMESPACES } from 'utils/i18n'
import { TRANSACTION_ICONS } from 'utils/transactions'

interface ListProps {
  onCloseModal: () => void
}

export const FavouriteTransactionList = memo(({ onCloseModal }: LayoutItemProps & ListProps) => {
  const { favoriteTransactions, repeatFavoriteTransaction, isLoading } = useFavouritesTransactions()
  const { navigate } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const onOpen = useCallback(() => {
    navigate(ROUTES.FavouritesTransactions)
    onCloseModal?.()
  }, [navigate, onCloseModal])

  const createHandlePress = useCallback(
    item => () => {
      repeatFavoriteTransaction(item.id)
      onCloseModal?.()
    },
    [onCloseModal, repeatFavoriteTransaction],
  )

  const renderItem = useCallback(
    ({ item, index }) => (
      <SmallCard
        {...item}
        icon={TRANSACTION_ICONS[item.type]}
        onPress={createHandlePress(item)}
        ml={index !== 0 ? 'm' : 'l'}
      />
    ),
    [],
  )

  return (
    <List mt="s">
      <Row justifyContent="space-between" mb="l" mh="l">
        <Title>{t('FAVORITE_TRANSACTIONS')}</Title>
        <TouchableOpacity onPress={onOpen}>
          <TitleBtn color="midGray">{t(`${I18N_NAMESPACES.COMMON}::SEE_ALL`)}</TitleBtn>
        </TouchableOpacity>
      </Row>
      <FlatList
        data={favoriteTransactions}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Row
        height={favoriteTransactions.length ? 0 : 60}
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? <ActivityIndicator color={colors.pumpkin} size="large" /> : null}
        {!favoriteTransactions.length && !isLoading ? (
          <Caption color="gray">There are no favorite transactions</Caption>
        ) : null}
      </Row>
    </List>
  )
})

const List = styled(Column)`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.gray95};
  padding-bottom: ${({ theme }) => theme.spacings.m}px;
`

const Title = styled(Caption)`
  font-weight: 600;
`
const TitleBtn = styled(Caption)`
  font-weight: 500;
`
