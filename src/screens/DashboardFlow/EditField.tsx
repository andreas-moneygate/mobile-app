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
} from 'components'
import useFieldsDescription from 'hooks/useFieldsDescription'
import { memo, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DashboardStackParamList, LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { buttonTitle, ROUTE_REFERENCE } from 'utils/enum'
import validationSchema from 'utils/validation'

function EditField() {
  const { goBack, navigate } =
    useNavigation<NavigationProp<DashboardStackParamList & LogInStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.EditField>>()
  const { value, label, reference } = params
  const field = useFieldsDescription()

  const onSave = useCallback(
    async ({ value: valueToSave }) => {
      const currentField = field?.[reference]

      if (currentField?.button === buttonTitle.SAVE && currentField.onSave) {
        const dataForSaving = Object.keys(params).reduce((acc: { [key: string]: any }, key) => {
          if (currentField?.dataForSaving?.includes(key)) {
            acc[key] = params[key]
          }

          return acc
        }, {})

        await currentField.onSave({ value: valueToSave, ...dataForSaving })

        goBack()
      } else {
        if (currentField.onPrepare) {
          await currentField.onPrepare()
        }
        navigate(ROUTES.OneTimePassword, {
          reference: currentField.reference || ROUTE_REFERENCE.EDIT_PERSONAL_DETAILS,
          [currentField.reference]: valueToSave,
        })
      }
    },
    [navigate, goBack, field, reference, params],
  )

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      value: value,
    },
    mode: 'onChange',
  })

  return (
    <Container type="secondary" darkBarStyle>
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column mt="m">
            <Column alignItems="flex-start" mb="m">
              <IconButton icon={icons.arrowLeft} onPress={goBack} />
              <Title mt="m">{field?.[reference]?.title}</Title>
              <BodySmall mt="s">{field?.[reference]?.description}</BodySmall>
            </Column>
            <Controller
              name="value"
              control={control}
              rules={validationSchema.required}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={label}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  error={errors?.value?.message}
                  autoFocus
                />
              )}
            />
          </Column>
          <Button
            onPress={handleSubmit(onSave)}
            title={field?.[reference]?.button}
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

export default memo(EditField)
