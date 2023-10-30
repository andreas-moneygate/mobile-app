import { useMemo } from 'react'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'

import useFavoriteTransactions from './useFavouritesTransactions'

const useTransferHistory = () => {
  const { favoriteTransactions } = useFavoriteTransactions()

  const transferHistory = useMemo(
    () =>
      favoriteTransactions
        ?.filter(transaction => transaction.type === CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT)
        .map((transaction, id) => ({
          title: transaction.title,
          beneficiaryName: transaction.beneficiaryName,
          beneficiaryAddress: transaction.beneficiaryAddress,
          iban: transaction.iban,
          swiftCode: transaction.swift,
          amount: transaction.amount,
          paymentDetails: transaction.paymentDetails,
          id,
        })),
    [favoriteTransactions],
  )

  return transferHistory
}

export default useTransferHistory
