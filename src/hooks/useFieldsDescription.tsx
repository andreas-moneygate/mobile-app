import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { changePhoneInit } from 'utils/apiQueries/user'
import { ROUTE_REFERENCE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'

import useAccounts from './useAccounts'

interface Fields {
  [key: string]: {
    title: string
    description: string | null
    label?: string
    button: string
    reference: ROUTE_REFERENCE
    onPrepare?: () => Promise<void>
    onSave?: (data: { value: any; [key: string]: any }) => Promise<any>
    dataForSaving?: Array<string> // params keys names
  }
}

const useFieldsDescription = () => {
  const { updateAccount } = useAccounts()

  const { t } = useTranslation()

  const fieldDescriptions = useMemo<Fields>(() => {
    return {
      account_name: {
        title: t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::CHANGE_ACCOUNT_NAME`),
        description: t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::CHANGE_ACCOUNT_NAME_DESCRIPTION`),
        button: t('SAVE'),
        onSave: updateAccount as any,
        dataForSaving: ['accountNumber'],
      },
      email: { label: 'Email', title: 'Change email', description: null, button: 'Save' },
      phone: {
        title: t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::CHANGE_PHONE_TITLE`),
        description: t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::CHANGE_PHONE_DESCRIPTION`),
        button: t('CONTINUE'),
        reference: ROUTE_REFERENCE.CHANGE_PHONE,
        onPrepare: changePhoneInit,
      },
    }
  }, [t, updateAccount])

  return fieldDescriptions
}

export default useFieldsDescription
