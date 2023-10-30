import { Button } from 'components/buttons/Button'
import { Column } from 'components/layout/Column'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { I18N_NAMESPACES } from 'utils/i18n'

interface LogOutProps {
  onLogOut: () => void
  onCancel: () => void
}

export const LogOut = memo((props: LogOutProps) => {
  const { onCancel, onLogOut } = props
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  return (
    <Column mh="l" mt="m">
      <Caption color="midGray" textAlign="center">
        {t('LOG_OUT_DESCRIPTION')}
      </Caption>
      <Button onPress={onLogOut} title={t('LOG_OUT')} mv="l" />
      <Button onPress={onCancel} type="light" title={t(`${I18N_NAMESPACES.COMMON}::CANCEL`)} />
    </Column>
  )
})
