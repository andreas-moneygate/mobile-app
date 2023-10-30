import moment from 'moment'
import { useCallback, useContext, useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'
import { FiltersContext } from 'state/contexts'
import { TransactionFilters } from 'types/filters'
import { getTransactions } from 'utils/apiQueries/transaction'
import { DEFAULT_FILTER_DATE, isDefaultTransactionFilters } from 'utils/filters'
import { mapTransactionsData } from 'utils/mappers/mapTransactionData'
import { CLIENT_SIDE_TRANSACTION_TYPES, matchClientAndSearchTypes } from 'utils/transactions'

import useClients from './useClients'

const useTransactions = (selectedAccount?: string) => {
  const {
    transactions: { filters, setFilters },
  } = useContext(FiltersContext)
  const { clients, selectedClient } = useClients()

  const requestFilters = useMemo(
    () => ({
      clientId: selectedClient.id,
      accountNumbers: selectedAccount
        ? [selectedAccount]
        : selectedClient.accounts?.map(account => account.accountNumber),
      fromDate: filters.date.fromDate,
      toDate: moment(filters.date.toDate).add(3, 'day').format('YYYY-MM-DD'),
      type: filters.type ? matchClientAndSearchTypes[filters.type] : undefined,
      debit: filters.rule !== 'Incoming',
      credit: filters.rule !== 'Outgoing',
      minAmount: filters.amount?.min,
      maxAmount: filters.amount?.max,
      paymentDetails: filters.paymentDetails,
    }),
    [selectedClient.id, selectedAccount, selectedClient.accounts, filters],
  )

  const {
    data: transactionsData,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    refetch: loadTransactions,
  } = useInfiniteQuery(['transactions', requestFilters], getTransactions, {
    refetchOnMount: false,
    enabled: Boolean(
      requestFilters.accountNumbers &&
        requestFilters.clientId &&
        requestFilters.fromDate &&
        requestFilters.toDate,
    ),
    getNextPageParam: lastPage =>
      lastPage?.currentPage !== Number(lastPage?.totalPages) - 1
        ? Number(lastPage?.currentPage) + 1
        : undefined,
  })

  const transactions = useMemo(() => {
    const allTransactions =
      transactionsData?.pages.reduce((acc, transactionData) => {
        if (transactionData?.data) {
          acc.push(...transactionData?.data)
          return acc
        }
        return []
      }, []) || []

    const filteredTypes =
      filters.type === CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT
        ? [
            CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT,
            CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE,
          ]
        : [filters.type]

    return allTransactions
      ? mapTransactionsData(
          allTransactions,
          clients.map(cl => cl.id),
          filters.type ? filteredTypes : undefined,
        )
      : []
  }, [clients, transactionsData?.pages, filters.type])

  const changeTransactionFilters = useCallback(
    ({
      rule,
      type,
      date,
      amount,
      paymentDetails,
      reset,
    }: Partial<TransactionFilters> & { reset?: boolean }) => {
      if (reset) {
        setFilters({ rule: 'All', date: DEFAULT_FILTER_DATE, isDefault: true })
        return
      }

      const newFilters = { ...filters }
      if (rule) {
        newFilters.rule = rule
      }
      if (type || type === undefined) {
        newFilters.type = type
      }
      if (date?.fromDate && date.toDate) {
        newFilters.date = date
      }
      if (amount?.max && (amount.min || amount.min === 0)) {
        newFilters.amount = amount
      }
      if (paymentDetails) {
        newFilters.paymentDetails = paymentDetails
      }
      newFilters.isDefault = isDefaultTransactionFilters(newFilters)

      setFilters(newFilters)
    },
    [filters, setFilters],
  )

  return {
    transactions,
    transactionFilters: filters,
    changeTransactionFilters,
    loadTransactions,
    loadMoreTransactions: fetchNextPage,
    isLoading: isFetchingNextPage || isFetching,
  }
}

export default useTransactions
