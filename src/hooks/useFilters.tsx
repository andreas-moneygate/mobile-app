import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { I18N_NAMESPACES } from 'utils/i18n'
import { CLIENT_SIDE_TRANSACTION_TYPES } from 'utils/transactions'

const useFilters = () => {
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  return useMemo(
    () => [
      {
        title: t(`${I18N_NAMESPACES.COMMON}::TYPE`),
        reference: 'type',
        data: [
          {
            label: t('ALL_CATEGORIES'),
            value: undefined,
          },
          {
            label: t('BETWEEN_OWN_ACCOUNTS'),
            value: CLIENT_SIDE_TRANSACTION_TYPES.OWN_ACCOUNT_PAYMENT,
          },
          {
            label: t('TO_MNGT_CUSTOMER'),
            value: CLIENT_SIDE_TRANSACTION_TYPES.MNGT_PAYMENT,
          },
          {
            label: t('BANK_TRANSFER'),
            value: CLIENT_SIDE_TRANSACTION_TYPES.BANK_PAYMENT,
          },
        ],
        id: 1,
      },
      {
        title: t(`${I18N_NAMESPACES.COMMON}::PERIOD`),
        reference: 'period',
        data: [],
        id: 2,
      },
    ],
    [],
  )
}

export default useFilters
