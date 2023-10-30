import icons from 'assets/icons'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { I18N_NAMESPACES } from 'utils/i18n'

const useOperations = () => {
  const { t } = useTranslation()
  return useMemo(
    () => [
      { title: t('EXCHANGE'), icon: icons.boldExchange, id: 1 },
      {
        title: t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::SEND_MONEY`),
        type: 'send',
        icon: icons.sendMoney,
        id: 2,
      },
      { title: t('MORE'), icon: icons.more, id: 3 },
    ],
    [t],
  )
}

export default useOperations
