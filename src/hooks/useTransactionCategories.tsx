import icons from 'assets/icons'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ROUTES from 'routes/RouteNames'
import { I18N_NAMESPACES } from 'utils/i18n'

const useTransactionCategories = () => {
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  return useMemo(
    () => [
      { title: t('TO_OWN_ACCOUNT'), icon: icons.largeUpload, route: ROUTES.ToOwnAccount, id: 1 },
      {
        title: t('TO_MNGT_CUSTOMER'),
        icon: icons.largeLogo,
        route: ROUTES.ToMoneyGateFirstStep,
        id: 2,
      },
      { title: t('TO_ANOTHER_BANK'), icon: icons.largeBank, route: ROUTES.ToAnotherBank, id: 3 },
      {
        title: t('BULK_FILE_UPLOAD'),
        icon: icons.largeBulkFile,
        route: ROUTES.BulkFileUpload,
        id: 4,
      },
    ],
    [t],
  )
}

export default useTransactionCategories
