import { AccountCard } from 'components/card/AccountCard'
import { SeeMore } from 'components/elements/SeeMore'
import { Column } from 'components/layout/Column'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'

interface AccountsListProps {
  accounts: any
  onSelected: (account: any) => void
  toggleShow: () => void
  visibleAllAccounts?: boolean
}

export const AccountsList = memo((props: AccountsListProps) => {
  const { accounts, onSelected, toggleShow, visibleAllAccounts } = props
  const data = useMemo(
    () => (visibleAllAccounts || accounts.length <= 3 ? accounts : accounts.slice(0, 3)),
    [accounts, visibleAllAccounts],
  )

  return (
    <CardContainer pt="l" pb="m">
      <Column mh="l">
        {data.map((account: any, index: number) => (
          <AccountCard
            account={account}
            mt={index !== 0 ? 'm' : 0}
            onPress={onSelected}
            key={account?.accountNumber}
          />
        ))}
      </Column>
      {accounts.length > 3 ? (
        <SeeMore status={!visibleAllAccounts ? 'more' : 'less'} onPress={toggleShow} />
      ) : null}
    </CardContainer>
  )
})

const CardContainer = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`
