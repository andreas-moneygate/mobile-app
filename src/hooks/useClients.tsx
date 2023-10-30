import { useContext, useEffect, useMemo } from 'react'
import { useQuery } from 'react-query'
import { ClientContext } from 'state/contexts'
import { MappedClient } from 'types/mapped/client'
import { getClientAnalytics, getClients } from 'utils/apiQueries/client'
import { mapAccountsData, mapClientData } from 'utils/mappers'

import useAccounts from './useAccounts'

const useClients = () => {
  const { client: _selectedClient, setClient: setSelectedClient } = useContext(ClientContext)
  const { accounts, isLoaded: isAccountsLoaded } = useAccounts()
  const { data: clientsData, isFetchedAfterMount: isLoadedClients } = useQuery(
    ['clients'],
    getClients,
  )

  const clients = useMemo(
    () => (clientsData?.data ? clientsData.data.map(client => mapClientData(client)) : []),
    [clientsData?.data],
  )

  useEffect(() => {
    if (!_selectedClient?.id && clients.length) {
      const [initClient] = clients

      setSelectedClient(initClient)
    }
  }, [clients])

  const { data: clientAnalytics, isFetchedAfterMount: isLoadedClientAnalytics } = useQuery(
    ['clientAnalytics', _selectedClient?.id],
    getClientAnalytics,
    {
      enabled: Boolean(_selectedClient?.id),
    },
  )

  const selectedAccounts = useMemo(
    () =>
      accounts?.data.map((account, index) =>
        mapAccountsData(account, index, _selectedClient?.title),
      ) || [],
    [accounts, _selectedClient?.title],
  )

  const selectedClient = useMemo<MappedClient>(
    () => ({
      ...(_selectedClient as Pick<MappedClient, 'title' | 'id' | 'icon'>),
      accounts: selectedAccounts || [],
      analytics: clientAnalytics || [],
    }),
    [_selectedClient, selectedAccounts, clientAnalytics],
  )

  return {
    clients,
    selectedClient,
    setSelectedClient,
    isLoaded: isLoadedClients && isAccountsLoaded && isLoadedClientAnalytics,
  }
}

export default useClients
