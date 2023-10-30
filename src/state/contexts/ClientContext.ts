import { createContext, Dispatch, SetStateAction } from 'react'
import { MappedClient } from 'types/mapped/client'

export const ClientContext = createContext<{
  client: Pick<MappedClient, 'title' | 'id' | 'icon'> | undefined
  setClient: Dispatch<SetStateAction<MappedClient | undefined>>
}>({ client: undefined, setClient: () => ({}) })
