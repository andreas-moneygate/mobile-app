import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  AccountHeader,
  BodyLarge,
  BodySmall,
  Column,
  SettingsList,
  SmallBackground,
  WebViewModal,
} from 'components'
import useSettings from 'hooks/useSettings'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DashboardStackParamList } from 'routes/ParamsList'
import styled from 'styled-components/native'
import { SECTION_FIELD_TYPE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'

function Settings() {
  const { goBack, navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const insets = useSafeAreaInsets()
  const settings = useSettings()
  const { user, data } = settings
  const goTo = useCallback((route, params) => navigate(route, params), [navigate])
  const [webViewUri, setWebViewUri] = useState('')
  const [showWebView, setShowWebView] = useState(false)

  const onNext = useCallback(
    item => {
      const { route, type, value, handler } = item
      if (handler) {
        return handler(item)
      }
      if (type === SECTION_FIELD_TYPE.LINK) {
        setWebViewUri(value)
        setShowWebView(true)
      }
      if (route) {
        delete item.icon
        return goTo(route, { details: item })
      }
    },
    [goTo],
  )

  const handleCloseWebView = useCallback(() => {
    setShowWebView(false)
  }, [])

  return (
    <Wrapper pb={insets.bottom}>
      <SmallBackground>
        <AccountHeader title={t('SETTINGS')} onBack={goBack} />
      </SmallBackground>
      <ScrollWrapper>
        <Column m="l">
          <BodyLarge mt="xs">{user.name}</BodyLarge>
          <BodySmall color="midGray" mt="xs">{user.email}</BodySmall>
        </Column>
        <SettingsList data={data} onChange={onNext} />
      </ScrollWrapper>
      <WebViewModal show={showWebView} uri={webViewUri} onClose={handleCloseWebView} />
    </Wrapper>
  )
}

const Wrapper = styled(Column)`
  flex: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))``

export default memo(Settings)
