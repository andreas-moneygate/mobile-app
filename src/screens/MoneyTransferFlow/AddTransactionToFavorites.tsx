import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  AccountNumberInput,
  BodySmall,
  Button,
  Column,
  Container,
  ErrorMessage,
  ExchangeInput,
  IconButton,
  KeyboardAvoidingView,
  PaymentDetailsInput,
  Row,
  TextInput,
  Title,
} from 'components'
import useErrorHandler from 'hooks/useErrorModal'
import { memo, useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components'
import { addTransactionToFavorites } from 'utils/apiQueries/transaction'
import { currencySymbols } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'
import { numbersWithDot } from 'utils/ui'
import validation from 'utils/validation'

interface FavoriteTransactionForm {
  name: string
  amount: string
  details: string
}

function AddTransactionToFavorites() {
  const { navigate, goBack } = useNavigation()
  const { params } =
    useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.AddTransactionToFavorites>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

  const { error, showErrorModal, hideErrorModal } = useErrorHandler()

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FavoriteTransactionForm>({
    defaultValues: {
      name: '',
      amount: params.amount?.toString(),
      details: params.paymentDetails,
    },
    mode: 'onChange',
  })

  const handleAddToFavorite = useCallback(
    async (data: FavoriteTransactionForm) => {
      try {
        const { accountNumber, reference, transactionDate } = params
        const { name, amount, details } = data
        const { id } = await addTransactionToFavorites({
          accountNumber,
          referenceNumber: reference,
          transactionDate,
          favoriteName: name,
          amount: +numbersWithDot(amount),
          paymentDetails: details,
        })
        navigate(ROUTES.TransactionAddedToFavorites)
      } catch (err) {
        showErrorModal(err)
      }
    },
    [params],
  )

  return (
    <Container safeTop safeBottom type="secondary" darkBarStyle>
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column>
            <Column width="100%" alignItems="flex-start" mt="m">
              <IconButton icon={icons.arrowLeft} onPress={goBack} />
              <Row mh={-20}>
                {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}
              </Row>
              <Title mt="m">{t('ADD_TO_FAVORITES')}</Title>
              <Row mt="s">
                <BodySmall>{t('ADD_TO_FAVORITES_DESCRIPTION')}</BodySmall>
              </Row>
            </Column>
            <Column>
              <Controller
                name="name"
                control={control}
                rules={validation.required}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    label={t('TRANSFER_NAME') as string}
                    mt="l"
                  />
                )}
              />

              <Controller
                name="amount"
                control={control}
                rules={validation.required}
                render={({ field: { onChange, value } }) => (
                  <ExchangeInput
                    label={t(`${I18N_NAMESPACES.COMMON}::AMOUNT`) as string}
                    currencySymbol={currencySymbols[params.currency as string]}
                    currency={params.currency}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
            </Column>
          </Column>

          <Column mh={-20}>
            <Controller
              name="details"
              control={control}
              rules={validation.paymentDetails}
              render={({ field: { onChange, value } }) => (
                <PaymentDetailsInput value={value} onChangeText={onChange} />
              )}
            />
            <Button
              onPress={handleSubmit(handleAddToFavorite)}
              title={t('SAVE_TO_FAVORITES')}
              disabled={!isValid}
              m="l"
            />
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

export default memo(AddTransactionToFavorites)
