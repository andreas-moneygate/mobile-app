import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  BodySmall,
  Button,
  Column,
  Container,
  IconButton,
  KeyboardAvoidingView,
  TextInput,
  Title,
  ValidPassBar,
} from 'components'
import { memo, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DashboardStackParamList, LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { changePasswordInit } from 'utils/apiQueries/user'
import { ROUTE_REFERENCE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'
import validationSchema from 'utils/validation'

interface ChangePasswordForm {
  currentPassword: string
  password: string
  confirmPassword: string
}

function ChangePassword() {
  const { goBack, navigate } =
    useNavigation<NavigationProp<DashboardStackParamList & LogInStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.Password>>()

  const isForgot = Boolean(params?.username)

  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

  const handleChangePassword = useCallback(
    async (values: ChangePasswordForm) => {
      let data = { ...values }
      if (!isForgot) {
        await changePasswordInit()
      } else {
        data = {
          username: params.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
      }
      navigate(ROUTES.OneTimePassword, {
        reference: ROUTE_REFERENCE.CHANGE_PASSWORD,
        passwordData: data,
      })
    },
    [isForgot, navigate, params.username],
  )

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm<ChangePasswordForm>({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const passwordValue = watch('password')

  return (
    <Container type="secondary" safe darkBarStyle>
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column>
            <Column alignItems="flex-start" mb="m">
              <IconButton icon={icons.arrowLeft} onPress={goBack} />
              <Title mt="m">{t('CHANGE_PASSWORD_TITLE')}</Title>
              <BodySmall mt="s">{t('CHANGE_PASSWORD_DESCRIPTION')}</BodySmall>
            </Column>

            {!isForgot ? (
              <Controller
                name="currentPassword"
                control={control}
                rules={validationSchema.requiredField(t('CURRENT_PASSWORD'))}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={t('CURRENT_PASSWORD') as string}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors?.currentPassword?.message}
                    securedEntry
                  />
                )}
              />
            ) : null}

            <Column>
              <Controller
                name="password"
                control={control}
                rules={validationSchema.password}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Column>
                    <TextInput
                      label={t('NEW_PASSWORD') as string}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      securedEntry
                    />
                    <ValidPassBar value={value} />
                  </Column>
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={validationSchema.confirmPassword(passwordValue)}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={t('CONFIRM_PASSWORD') as string}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors?.confirmPassword?.message}
                    securedEntry
                  />
                )}
              />
            </Column>
          </Column>
          <Button
            onPress={handleSubmit(handleChangePassword)}
            title="Change password"
            disabled={!isValid}
          />
        </ScrollWrapper>
      </KeyboardAvoidingView>
    </Container>
  )
}

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    padding: 20,
  },
}))``

export default memo(ChangePassword)
