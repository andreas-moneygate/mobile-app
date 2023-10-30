import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  Body,
  BodySmall,
  Button,
  Column,
  Container,
  CustomBottomModalSheet,
  ErrorMessage,
  KeyboardAvoidingView,
  TextInput,
  Title,
} from 'components'
import useErrorHandler from 'hooks/useErrorModal'
import useGlobalSpinner from 'hooks/useGlobalSpinner'
import { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Platform } from 'react-native'
import { LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { UserContext } from 'state/contexts'
import styled from 'styled-components/native'
import { login } from 'utils/apiQueries/user'
import { ROUTE_REFERENCE } from 'utils/enum'
import validationSchema from 'utils/validation'

function Login() {
  const { navigate } = useNavigation<NavigationProp<LogInStackParamList>>()
  const { isRefreshing } = useContext(UserContext)
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const { showGlobalSpinner, hideGlobalSpinner } = useGlobalSpinner()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['1%', 250], [])

  const handleSheetModalChanges = useCallback((i: number) => {
    if (i === 0) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])

  const onClose = useCallback(() => bottomSheetModalRef?.current?.dismiss(), [])

  useEffect(() => {
    if (isRefreshing !== undefined) {
      if (isRefreshing) {
        // setTimeout is using to fix crashing after FaceID on ios
        setTimeout(
          () => showGlobalSpinner({ type: 'withLogo' }),
          Platform.select({ ios: 500, android: 0 }),
        )
      } else {
        hideGlobalSpinner()
        bottomSheetModalRef?.current?.present()
      }
    }
  }, [isRefreshing])

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = useCallback(
    async data => {
      try {
        hideErrorModal()
        await login(data)
      } catch (err: any) {
        if (err.payload.error_description === 'Requires 2FA') {
          navigate(ROUTES.OneTimePassword, {
            reference: ROUTE_REFERENCE.LOG_IN,
            loginData: data,
          })
          reset()
        } else {
          showErrorModal(err)
        }
      }
    },
    [navigate, reset],
  )

  const goToForgotPassword = useCallback(() => {
    navigate(ROUTES.ForgottenPass)
    reset()
  }, [navigate, reset])

  return (
    <Container safeTop safeBottom darkBarStyle>
      {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column flex={1}>
            <Title mt={35} mb="xxl">
              Log in
            </Title>
            <Controller
              name="username"
              control={control}
              rules={validationSchema.requiredField('Username')}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Username"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors?.username?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={validationSchema.requiredField('Password')}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  mt="s"
                  error={errors?.password?.message}
                  securedEntry
                />
              )}
            />
            <TxtLink onPress={goToForgotPassword}>Forgot password?</TxtLink>
          </Column>
          <Button
            onPress={handleSubmit(onSubmit)}
            title="Log in"
            mb="l"
            disabled={!isValid}
            isLoading={isSubmitting}
          />
        </ScrollWrapper>
      </KeyboardAvoidingView>
      <CustomBottomModalSheet
        innerRef={bottomSheetModalRef}
        onChange={handleSheetModalChanges}
        snapPoints={snapPoints}
      >
        <Column justifyContent="space-between" m="l">
          <Body fontWeight="600" textAlign="center" m="l">
            Sorry, your session has expired already, please provide username and password again
          </Body>
          <Button title="Submit" onPress={onClose}></Button>
        </Column>
      </CustomBottomModalSheet>
    </Container>
  )
}

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingHorizontal: 20,
  },
}))``
const TxtLink = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.pumpkin85};
  align-self: flex-end;
`

export default memo(Login)
