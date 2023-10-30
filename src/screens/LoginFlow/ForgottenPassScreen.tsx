import { NavigationProp, useNavigation } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  BodySmall,
  Button,
  Column,
  Container,
  ErrorMessage,
  IconButton,
  KeyboardAvoidingView,
  Row,
  TextInput,
  Title,
} from 'components'
import useErrorHandler from 'hooks/useErrorModal'
import { memo, useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { forgotPasswordInit } from 'utils/apiQueries/user'
import validationSchema from 'utils/validation'

function ForgottenPassScreen() {
  const { goBack, navigate } = useNavigation<NavigationProp<LogInStackParamList>>()
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: '',
    },
    mode: 'onChange',
  })

  const onSubmit = useCallback(
    async (data: { username: string }) => {
      setIsLoading(true)
      hideErrorModal()
      try {
        const res = await forgotPasswordInit(data.username)

        if (res.requiresSca) {
          navigate(ROUTES.Password, { username: data.username })
          reset()
        }
      } catch (err) {
        showErrorModal(err)
      }
      setIsLoading(false)
    },
    [navigate, reset],
  )

  const onBack = useCallback(() => {
    goBack()
    reset()
  }, [goBack, reset])

  return (
    <Container safe type="secondary" darkBarStyle>
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column>
            {error ? (
              <Row mh={-20}>
                <ErrorMessage errorMessage={error} onClose={hideErrorModal} />
              </Row>
            ) : null}
            <Column alignItems="flex-start" mt="m" mb="xxl">
              <IconButton icon={icons.arrowLeft} onPress={onBack} />
              <Title mt="m">Please enter the username</Title>
              <Description>Enter the username associated with your account</Description>
            </Column>
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
          </Column>
          <Button
            onPress={handleSubmit(onSubmit)}
            title="Send"
            mb="l"
            disabled={!isValid}
            isLoading={isLoading}
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
    paddingHorizontal: 20,
  },
}))``

const Description = styled(BodySmall)`
  margin-top: ${({ theme }) => theme.spacings.s}px;
  line-height: 24px;
`

export default memo(ForgottenPassScreen)
