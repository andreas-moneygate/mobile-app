import { ComponentProps, FC, useContext, useEffect, useMemo, useState } from 'react'
import { UserContext } from 'state/contexts'
import { ClientContext } from 'state/contexts/ClientContext'
import { MappedClient } from 'types/mapped/client'

export const ClientProvider = ({ children }: ComponentProps<FC>) => {
  const [client, setClient] = useState<MappedClient>()

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!user) {
      setClient(undefined)
    }
  }, [user])

  const contextClient = useMemo(() => ({ client, setClient }), [client, setClient])

  return <ClientContext.Provider value={contextClient}>{children}</ClientContext.Provider>
}
