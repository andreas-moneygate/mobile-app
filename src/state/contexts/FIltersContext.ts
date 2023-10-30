import { createContext } from 'react'
import { Filters } from 'types/filters'
import { DEFAULT_FILTER_DATE } from 'utils/filters'

export const FiltersContext = createContext<Filters>({
  transactions: {
    filters: {
      rule: 'All',
      date: DEFAULT_FILTER_DATE,
      isDefault: true,
    },
    setFilters: () => ({}),
  },
})
