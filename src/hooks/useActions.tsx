import icons from 'assets/icons'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ROUTES from 'routes/RouteNames'
import { I18N_NAMESPACES } from 'utils/i18n'

const useActions = () => {
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  return useMemo(
    () => [
      {
        title: t('ACCOUNT_STATEMENT'),
        icon: icons.statement,
        route: ROUTES.AccountStatement,
        id: 1,
      },
      {
        title: t('CLIENTS_SUMMARY_STATEMENT'),
        icon: icons.clientSummaryStatement,
        route: ROUTES.ClientSummaryStatement,
        id: 2,
      },
      {
        title: t('FEE_STATEMENT'),
        icon: icons.feeStatement,
        route: ROUTES.FeeStatement,
        id: 3,
      },
      {
        title: t('ACCOUNT_DETAILS'),
        icon: icons.exclamation,
        route: ROUTES.AccountDetails,
        id: 4,
      },
    ],
    [t],
  )
}

export default useActions
