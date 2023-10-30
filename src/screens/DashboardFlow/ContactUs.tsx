import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  BodySmall,
  Button,
  Caption,
  Column,
  ErrorMessage,
  KeyboardAvoidingView,
  MultilineInput,
  SmallBackground,
  TextInput,
  Title,
} from 'components'
import { ItemPicker } from 'components/picker/ItemPicker'
import useErrorHandler from 'hooks/useErrorModal'
import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useQuery } from 'react-query'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { UserContext } from 'state/contexts'
import styled from 'styled-components/native'
import { getContactUsCategories, sendContactUsMessage } from 'utils/apiQueries/contactUs'
import { I18N_NAMESPACES } from 'utils/i18n'

const MESSAGE_LIMIT = 2000

function ContactUs() {
  const { goBack, navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.ContactUs>>()
  const { user } = useContext(UserContext)
  const insets = useSafeAreaInsets()
  const { showErrorModal, error, hideErrorModal } = useErrorHandler()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const ref = useRef()

  const { message: defaultMessage, category: defaultCategory } = params
  const [category, setCategory] = useState(defaultCategory)
  const [message, setMessage] = useState(defaultMessage)

  const { data: categories = [] } = useQuery(['contactUsCategories'], getContactUsCategories)

  const categoriesPickerData = useMemo(
    () => categories.map(category => ({ label: category, value: category })),
    [categories],
  )

  useEffect(() => {
    if (!defaultCategory && categories.length) {
      const [initCategory] = categories
      setCategory(initCategory)
    }
  }, [categories, defaultCategory])

  const handleSelectCategory = useCallback((value: string | number | undefined) => {
    if (typeof value === 'string' || typeof value === 'undefined') {
      setCategory(value)
    }
  }, [])

  const { refetch: sendMessage, isLoading } = useQuery(
    ['sendContactUsMessage', category, message],
    sendContactUsMessage,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      onSuccess: () => navigate(ROUTES.MessageSent, { email: user?.email }),
      onError: showErrorModal,
    },
  )

  const handleSendMessage = useCallback(() => {
    hideErrorModal()
    sendMessage()
  }, [])

  return (
    <Wrapper pb={insets.bottom}>
      <KeyboardAvoidingView behavior="padding">
        <SmallBackground>
          <AccountHeader title={t('CONTACT_US')} onBack={goBack} />
        </SmallBackground>
        {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps="handled"
          extraHeight={Platform.select({ ios: 350, android: 270 })}
          contentContainerStyle={containerStyle}
          showsVerticalScrollIndicator={false}
        >
          <Column justifyContent="space-between">
            <Column alignItems="flex-start" mb="m">
              <Title mt="xxl">{t('CONTACT_US_TITLE')}</Title>
              <BodySmall mt="s">{t('CONTACT_US_DESCRIPTION')}</BodySmall>
            </Column>
            <TextInput
              label={t(`${I18N_NAMESPACES.COMMON}::EMAIL`) as string}
              value={user?.email}
              editable={false}
            />
            <ItemPicker
              title={t(`${I18N_NAMESPACES.COMMON}::SUBJECT`) as string}
              data={categoriesPickerData}
              value={category}
              onSelect={handleSelectCategory}
            />
            <MultilineInput
              label={t(`${I18N_NAMESPACES.COMMON}::MESSAGE`) as string}
              value={message}
              onChangeText={setMessage}
              ref={ref}
              focusable
            />
            {message?.trim().length ? (
              <Caption color={message?.length > MESSAGE_LIMIT ? 'red' : 'midGray'} ml="l" mt={-20}>
                {message.length}/{MESSAGE_LIMIT}
              </Caption>
            ) : null}
          </Column>
        </KeyboardAwareScrollView>
        <Button
          title={t(`${I18N_NAMESPACES.COMMON}::SEND_MESSAGE`) as string}
          m="l"
          disabled={!message?.trim() || message?.length > MESSAGE_LIMIT}
          isLoading={isLoading}
          onPress={handleSendMessage}
        />
      </KeyboardAvoidingView>
    </Wrapper>
  )
}

const Wrapper = styled(Column)`
  flex: 1px;
  background-color: ${({ theme }) => theme.colors.white};
`

const containerStyle = {
  paddingHorizontal: 20,
  flexGrow: 1,
}

export default memo(ContactUs)
