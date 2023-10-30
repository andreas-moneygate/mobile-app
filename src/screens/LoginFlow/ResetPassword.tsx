import { NavigationProp, useNavigation } from '@react-navigation/native'
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
} from 'components'
import { memo, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import validationSchema from 'utils/validation'

function ResetPassword() {
  const { goBack, navigate } = useNavigation<NavigationProp<LogInStackParamList>>()

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: '',
      text: '',
    },
    mode: 'onChange',
  })

  const onSubmit = useCallback(() => {
    navigate(ROUTES.SuccessPassword, { reference: null })
    reset()
  }, [navigate])

  return (
    <Container type="secondary">
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column>
            <Column alignItems="flex-start" mt="m">
              <IconButton icon={icons.arrowLeft} onPress={goBack} />
            </Column>
            <Title mt="m">Create new password</Title>
            <Description>
              Your new password must be different from the previous used passwords.
            </Description>
            <Column mt="xxl">
              <Controller
                name="password"
                control={control}
                rules={validationSchema.password}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Password"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors?.password?.message}
                    securedEntry
                  />
                )}
              />
              <Controller
                name="text"
                control={control}
                rules={validationSchema.text}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Text"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    mt="s"
                    error={errors?.text?.message}
                    securedEntry
                  />
                )}
              />
            </Column>
          </Column>
          <Column mb="l">
            <Button onPress={handleSubmit(onSubmit)} title="Change Password" disabled={!isValid} />
          </Column>
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

export default memo(ResetPassword)
