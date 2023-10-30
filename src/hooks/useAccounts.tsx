import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { ClientContext } from 'state/contexts'
import { Account, Accounts } from 'types/api/account'
import { getAccounts, updateAccountAlias } from 'utils/apiQueries/account'

const useAccounts = () => {
  const queryClient = useQueryClient()
  const { client } = useContext(ClientContext)

  const { data: accounts, isFetchedAfterMount } = useQuery(['accounts', client?.id], getAccounts, {
    enabled: Boolean(client?.id),
  })

  const updateAccountsData = (updatedAccount: Account) => {
    queryClient.setQueryData(
      ['accounts', client?.id],
      (accountsData: Accounts | undefined): Accounts => ({
        ...(accountsData as Accounts),
        data:
          accountsData?.data.map(account =>
            account.accountNumber === updatedAccount.accountNumber ? updatedAccount : account,
          ) || [],
      }),
    )
  }

  const { mutate: updateAccount } = useMutation(updateAccountAlias, {
    onSuccess: updateAccountsData,
  })

  return { accounts, updateAccount, isLoaded: isFetchedAfterMount }
}

export default useAccounts
