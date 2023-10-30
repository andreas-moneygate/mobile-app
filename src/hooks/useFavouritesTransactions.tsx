import { NavigationProp, useNavigation } from '@react-navigation/native'
import icons from 'assets/icons'
import { useCallback, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import { PaginatedData } from 'types/api/common'
import { FavoriteTransaction } from 'types/api/transaction'
import {
  deleteTransactionFromFavorites as deleteTransactionFromFavoritesApi,
  getFavoriteTransaction,
  getFavoriteTransactions,
} from 'utils/apiQueries/transaction'
import { mapTransactionType } from 'utils/mappers/mapTransactionData'
import {
  CLIENT_SIDE_TRANSACTION_TYPES,
  getDataForRepeatTransaction,
  getRouteForRepeatTransaction,
  REPEAT_TRANSACTION_ROUTES,
  TRANSACTION_TYPES,
} from 'utils/transactions'

import useClients from './useClients'

const useFavoriteTransactions = () => {
  const { navigate } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { clients } = useClients()
  const queryClient = useQueryClient()

  const { data: favoriteTransactionsData, isLoading } = useQuery(
    ['favoriteTransactions'],
    getFavoriteTransactions,
  )

  const clientIds = useMemo(() => clients.map(client => client.id), [clients])

  const favoriteTransactions = useMemo(
    () =>
      favoriteTransactionsData?.data?.map(favTransaction => ({
        title: favTransaction.favoriteName,
        beneficiaryName: favTransaction.counterPartyName,
        beneficiaryAccountNumber: favTransaction.counterPartyAccountNumber,
        accountNumber: favTransaction.accountNumber,
        icon: icons.exchange,
        id: favTransaction.id,
        type: mapTransactionType(favTransaction, clientIds),
        amount: favTransaction.amount,
        paymentDetails: favTransaction.paymentDetails,
        // bank data:
        beneficiaryAddress: favTransaction.counterPartyAddress,
        iban: favTransaction.counterPartyAccountNumber,
        swift: favTransaction.counterPartyBankBic,
      })) || [],
    [favoriteTransactionsData?.data, clientIds],
  )

  const repeatFavoriteTransaction = useCallback(
    async (id: string) => {
      const transaction = await getFavoriteTransaction(id)

      const route = getRouteForRepeatTransaction(
        transaction.transactionType,
        transaction.userHasAccessToCounterPartyAccount,
      )

      const repeatData = await getDataForRepeatTransaction(transaction)

      return navigate(route as keyof MoneyTransferStackParamList, repeatData)
    },
    [navigate],
  )

  const updateFavoriteTransactions = (deletedId: string) => {
    queryClient.setQueryData(
      ['favoriteTransactions'],
      (
        favoriteTransactionsData: PaginatedData<Array<FavoriteTransaction>> | undefined,
      ): PaginatedData<Array<FavoriteTransaction>> => ({
        ...(favoriteTransactionsData as PaginatedData<Array<FavoriteTransaction>>),
        data:
          favoriteTransactionsData?.data.filter(
            favTransaction => favTransaction.id !== deletedId,
          ) || [],
      }),
    )
  }

  const { mutate: deleteTransactionFromFavorites, isLoading: isLoadingMutation } = useMutation(
    deleteTransactionFromFavoritesApi,
    {
      onSuccess: (_, deletedId) => {
        updateFavoriteTransactions(deletedId)
      },
    },
  )

  return {
    favoriteTransactions,
    repeatFavoriteTransaction,
    deleteTransactionFromFavorites,
    isLoading,
    isLoadingMutation,
  }
}

export default useFavoriteTransactions
