import { Column } from 'components/layout/Column'
import { BodySmall } from 'components/typography/BodySmall'
import { MappedAccount } from 'types/mapped/account'
import { MappedClient } from 'types/mapped/client'

import { AccountPicker } from './AccountPicker'
import { ClientPicker } from './ClientPicker'

interface ClientAndAccountPickersProps {
  title: string
  selectedClient: MappedClient | undefined
  accounts: Array<MappedAccount> | undefined
  selectedAccount: MappedAccount | undefined
  onSelectClient: (client: MappedClient) => void
  onSelectAccount: (account: MappedAccount) => void
}

export const ClientAndAccountPickers = ({
  title,
  selectedClient,
  accounts,
  selectedAccount,
  onSelectClient,
  onSelectAccount,
}: ClientAndAccountPickersProps) => (
  <Column ph="l" pt="l">
    <BodySmall fontWeight="600">{title}</BodySmall>
    <Column mv="s">
      <ClientPicker
        client={selectedClient?.title}
        icon={selectedClient?.icon}
        accountsLength={accounts?.length}
        onSelect={onSelectClient}
        outline={false}
      />
    </Column>

    <AccountPicker
      accounts={accounts}
      initialAccount={selectedAccount}
      onSelect={onSelectAccount}
    />
  </Column>
)
