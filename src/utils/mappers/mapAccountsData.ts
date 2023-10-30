import moment from 'moment'
import { Account } from 'types/api/account'
import { MappedAccount } from 'types/mapped/account'
import i18n, { I18N_NAMESPACES } from 'utils/i18n'

export const mapAccountsData = (
  accountData: Account,
  index: number,
  clientTitle?: string,
): MappedAccount => ({
  title: accountData.accountAlias,
  currency: accountData.currency,
  balance: accountData.availableBalance,
  accountNumber: accountData.accountNumber,
  id: index,
  client: accountData.clientName || clientTitle || '',
  clientId: accountData.clientId,
  isConnectedToCard: accountData.isConnectedToCard,
  openingDate: accountData.openingDate,
  fields: [
    {
      id: 1,
      label: `${i18n.t('CLIENT')} ${i18n.t('NAME')}`,
      value: clientTitle,
      type: 'copy',
    },
    {
      label: `${i18n.t('ACCOUNT')} ${i18n.t('NAME')}`,
      value: accountData.accountAlias,
      type: 'edit',
      reference: 'account_name',
      accountNumber: accountData.accountNumber,
      id: 2,
    },
    {
      label: i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::ACCOUNT_NUMBER`),
      value: accountData.accountNumber,
      type: 'copy',
      id: 3,
    },
    {
      label: i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::IBAN`),
      value: accountData.iban,
      type: 'copy',
      id: 4,
    },
    {
      label: i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::SWIFT`),
      value: accountData.swiftCode,
      type: 'copy',
      id: 5,
    },
    {
      label: i18n.t('CURRENCY'),
      value: accountData.currency,
      type: null,
      id: 6,
    },
    {
      label: i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::OPENED`),
      value: moment(accountData.openingDate).format('DD-MM-YYYY'),
      type: null,
      id: 7,
    },
  ],
})

export const filterPositiveAccounts = (accounts: MappedAccount[]) =>
  accounts.filter(account => account.balance > 0)
