import { ComponentProps, FC, useMemo, useState } from 'react'
import { FiltersContext } from 'state/contexts'
import { Filters } from 'types/filters'
import { TransactionFilters } from 'types/filters'
import { DEFAULT_FILTER_DATE } from 'utils/filters'

export const FiltersProvider = ({ children }: ComponentProps<FC>) => {
  const [transactionFilters, setTransactionFilters] = useState<TransactionFilters>({
    rule: 'All',
    date: DEFAULT_FILTER_DATE,
    isDefault: true,
  })

  const contextFilters = useMemo<Filters>(
    () => ({
      transactions: {
        filters: transactionFilters,
        setFilters: setTransactionFilters,
      },
    }),
    [transactionFilters],
  )

  return <FiltersContext.Provider value={contextFilters}>{children}</FiltersContext.Provider>
}
