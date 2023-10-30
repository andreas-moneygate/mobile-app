import { useMemo } from 'react'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'

import useFavoriteTransactions from './useFavouritesTransactions'

const useTransferHistoryCustomer = () => {
  const { favoriteTransactions } = useFavoriteTransactions()

  const transferHistoryCustomer = useMemo(
    () =>
      favoriteTransactions
        ?.filter(transaction => transaction.type === CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT)
        .map((transaction, id) => ({
          beneficiaryName: transaction.title,
          accountNumber: transaction.beneficiaryAccountNumber,
          amount: transaction.amount,
          paymentDetails: transaction.paymentDetails,
          id,
        })),
    [favoriteTransactions],
  )

  return transferHistoryCustomer
}

export default useTransferHistoryCustomer
