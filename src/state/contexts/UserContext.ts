import { createContext } from 'react'
import { UserInfo } from 'types/api/user'

export const UserContext = createContext<{
  user?: UserInfo | null
  isLoading: boolean
  isRefreshing?: boolean
  logout: () => Promise<void>
  authorize: () => Promise<void>
}>({
  user: null,
  logout: async () => undefined,
  authorize: async () => undefined,
  isLoading: true,
  isRefreshing: undefined,
})
