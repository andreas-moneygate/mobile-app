import icons from 'assets/icons'
import { Transaction } from 'types/api/transaction'
import { MappedTransaction, MappedTransactions } from 'types/mapped/transactions'
import { SvgComponent } from 'types/ui'
import { formatWeekDayMonth } from 'utils/date'
import i18n, { I18N_NAMESPACES } from 'utils/i18n'
import { CLIENT_SIDE_TRANSACTION_TYPES, TRANSACTION_TYPES } from 'utils/transactions'

const isExchange = (transaction: Transaction) => {
  const isSameClient =
    transaction.counterPartyAccountNumber?.slice(0, 7) === transaction.accountNumber.slice(0, 7)

  return transaction.transactionType === TRANSACTION_TYPES.INTERNAL_FX && isSameClient
}

const isOwnAccountPayment = (transaction: Transaction, ownClients: Array<string>) => {
  if (!transaction.counterPartyAccountNumber) {
    return false
  }

  const own = ownClients.find(client =>
    transaction.counterPartyAccountNumber.slice(0, 7).includes(client),
  )
  const isOwnAccount = own !== undefined

  return (
    (transaction.transactionType === TRANSACTION_TYPES.INTERNAL ||
      transaction.transactionType === TRANSACTION_TYPES.INTERNAL_FX) &&
    isOwnAccount
  )
}

const isMngtPayment = (transaction: Transaction, ownClients: Array<string>) => {
  return (
    (transaction.transactionType === TRANSACTION_TYPES.INTERNAL ||
      transaction.transactionType === TRANSACTION_TYPES.INTERNAL_FX) &&
    !isExchange(transaction) &&
    !isOwnAccountPayment(transaction, ownClients)
  )
}

const isBankPayment = (transaction: Transaction) => {
  return transaction.transactionType === TRANSACTION_TYPES.EXTERNAL
}

const isCardPayment = (transaction: Transaction) => {
  return transaction.transactionType === TRANSACTION_TYPES.CARD
}

const isFeePayment = (transaction: Transaction) => {
  return (
    transaction.transactionType === TRANSACTION_TYPES.FEE ||
    transaction.transactionType === TRANSACTION_TYPES.OTHER_FEE
  )
}

const isBulkPayment = (transaction: Transaction) => {
  return transaction.transactionType === TRANSACTION_TYPES.BULK
}

export const mapTransactionType = (
  transaction: Transaction,
  ownClients: Array<string>,
): CLIENT_SIDE_TRANSACTION_TYPES => {
  switch (true) {
    case isExchange(transaction):
      return CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE
    case isOwnAccountPayment(transaction, ownClients):
      return CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT
    case isMngtPayment(transaction, ownClients):
      return CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT
    case isBankPayment(transaction):
      return CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT
    case isCardPayment(transaction):
      return CLIENT_SIDE_TRANSACTION_TYPES.CARD_PAYMENT
    case isFeePayment(transaction):
      return CLIENT_SIDE_TRANSACTION_TYPES.FEE_PAYMENT
    case isBulkPayment(transaction):
      return CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT
    default:
      return CLIENT_SIDE_TRANSACTION_TYPES.OTHER
  }
}

type MappedByType = [SvgComponent | undefined, string, CLIENT_SIDE_TRANSACTION_TYPES, string]

const mapDataByType = (transaction: Transaction, ownClients: Array<string>): MappedByType => {
  const isDebit = transaction.accountAmount < 0
  if (isExchange(transaction)) {
    const beneficiaryLabel = `${i18n.t('EXCHANGE')} ${!isDebit ? i18n.t('TO') : i18n.t('FROM')} ${transaction.accountCurrency
      }`
    return [
      icons.exchange,
      beneficiaryLabel.toUpperCase(),
      CLIENT_SIDE_TRANSACTION_TYPES.EXCHANGE,
      i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::OWN_ACCOUNT_TRANSFER`),
    ]
  }
  if (isOwnAccountPayment(transaction, ownClients)) {
    const icon = transaction.accountAmount < 0 ? icons.upload : icons.download
    const beneficiaryLabel = `${isDebit ? i18n.t('TO') : i18n.t('FROM')} ${transaction.counterPartyAccountName
      }`
    return [
      icon,
      beneficiaryLabel.toUpperCase(),
      CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT,
      transaction.counterPartyAccountNumber, // 'Own accounts transfer',
    ]
  }
  if (isMngtPayment(transaction, ownClients)) {
    const icon = undefined // takes beneficiary name
    return [
      icon,
      (transaction?.counterPartyAccountName ?? transaction.description).toUpperCase(),
      CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT,
      i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::MNGT_CUSTOMER_TRANSFER`),
    ]
  }
  if (isBankPayment(transaction)) {
    return [
      icons.bank,
      (transaction?.counterPartyAccountName ?? transaction.description).toUpperCase(),
      CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT,
      i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::BANK_TRANSFER`),
    ]
  }
  if (isCardPayment(transaction)) {
    return [
      icons.card,
      (transaction?.counterPartyAccountName ?? transaction.description).toUpperCase(),
      CLIENT_SIDE_TRANSACTION_TYPES.CARD_PAYMENT,
      i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::CARD_TRANSFER`),
    ]
  }
  if (isFeePayment(transaction)) {
    return [
      icons.fee,
      (transaction?.description ?? 'To Moneygate').toUpperCase(),
      CLIENT_SIDE_TRANSACTION_TYPES.FEE_PAYMENT,
      i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::TRANSACTION_FEE_PAYMENT`),
    ]
  }
  if (isBulkPayment(transaction)) {
    return [
      icons.bulkFile,
      (transaction?.counterPartyAccountName ?? transaction.description).toUpperCase(),
      CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT,
      i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::BULK_TRANSFER`),
    ]
  }
  return [
    icons.bank,
    (transaction?.counterPartyAccountName ?? transaction.description).toUpperCase(),
    CLIENT_SIDE_TRANSACTION_TYPES.OTHER,
    i18n.t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::OTHER_PAYMENT`),
  ]
}

const mapTransactionData = (
  transaction: Transaction,
  ownClients: Array<string>,
): MappedTransaction => {
  const [icon, beneficiaryLabel, type, typeLabel] = mapDataByType(transaction, ownClients)
  return {
    transfer: {
      reference: transaction.referenceNumber,
      accountNumber: transaction.accountNumber,
      currency: transaction.accountCurrency,
      beneficiaryLabel,
      beneficiaryName: transaction.counterPartyAccountName,
      grosAmount: transaction.accountAmount,
      typeLabel,
      icon,
      type,
      isFee: transaction.isFee,
      feeData: transaction.isFee
        ? { ...transaction, paymentDetails: transaction.operationCodeDescription }
        : undefined,
    },
  }
}

export const mapTransactionsData = (
  transactionsData: Array<Transaction>,
  ownClients: Array<string>,
  filteredTypes?: Array<CLIENT_SIDE_TRANSACTION_TYPES>,
) => {
  const groupedByDate = transactionsData.reduce((acc: MappedTransactions, transaction) => {
    const groupIsDefined = acc.find(
      groupedByDate => groupedByDate.title === formatWeekDayMonth(transaction.transactionDate),
    )

    if (groupIsDefined) {
      return acc
    }

    const transactionsWithSameDate = transactionsData.filter(
      tr => tr.transactionDate === transaction.transactionDate,
    )

    const groupedByDate: MappedTransactions[number] = {
      title: formatWeekDayMonth(transaction.transactionDate),
      data: transactionsWithSameDate
        .map(tr => {
          const mappedData = mapTransactionData(tr, ownClients)

          return mappedData
        })
        .filter(tr => (filteredTypes ? filteredTypes.includes(tr.transfer.type) : true)),
    }

    if (groupedByDate.data.length) {
      acc.push(groupedByDate)
    }

    return acc
  }, [])

  return groupedByDate
}
