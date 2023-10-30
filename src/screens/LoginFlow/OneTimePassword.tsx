import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  BodySmall,
  Caption,
  Column,
  Container,
  ErrorMessage,
  IconButton,
  KeyboardAvoidingView,
  Row,
  Text,
  TimeTracker,
  Title,
} from 'components'
import useErrorHandler from 'hooks/useErrorModal'
import useGlobalSpinner from 'hooks/useGlobalSpinner'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import {
  DashboardStackParamList,
  LogInStackParamList,
  MoneyTransferStackParamList,
} from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { UserContext } from 'state/contexts'
import styled from 'styled-components/native'
import {
  changePasswordExec,
  changePasswordInit,
  changePhoneExec,
  changePhoneInit,
  forgotPasswordExec,
  forgotPasswordInit,
  login,
} from 'utils/apiQueries/user'
import { isInvalidOTP } from 'utils/common'
import { ROUTE_REFERENCE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'
import {
  CLIENT_SIDE_TRANSACTION_TYPES,
  execTransferHandlers,
  initTransferHandlers,
  TRANSACTION_STATUSES,
} from 'utils/transactions'

function OneTimePassword() {
  const { goBack, navigate, reset } =
    useNavigation<
      NavigationProp<LogInStackParamList & MoneyTransferStackParamList & DashboardStackParamList>
    >()
  const { params } =
    useRoute<RouteProp<LogInStackParamList | MoneyTransferStackParamList, ROUTES.OneTimePassword>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const [value, setValue] = useState('')
  const [isErrorOTP, setIsErrorOTP] = useState(false)
  const { user, updateToken } = useContext(UserContext)
  const { showGlobalSpinner, hideGlobalSpinner } = useGlobalSpinner()
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const ref = useBlurOnFulfill({ value, cellCount: 6 })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const phone = useMemo(
    () =>
      user?.phoneNumber
        ? user?.phoneNumber
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, ' +$1 $2')
            .replace(/(\d{4})(\d{4})/, '$1 $2')
        : null,
    [user?.phoneNumber],
  )

  const onNext = useCallback(async () => {
    showGlobalSpinner({ type: 'transparent' })
    try {
      switch (params.reference) {
        case ROUTE_REFERENCE.CONFIRM: {
          const exec = execTransferHandlers[params.transactionData.type]
          const isBulk = params.transactionData.type === CLIENT_SIDE_TRANSACTION_TYPES.BULK_PAYMENT
          const executeResponse = await exec({
            otp: value,
            documents: params?.transactionData.files,
            transfer: !isBulk ? params?.transactionData.transfer : undefined,
            bulkTransfer: isBulk ? params?.transactionData.transfer : undefined,
          })

          return navigate(ROUTES.SuccessTransaction, {
            ...params.transactionData,
            reference: executeResponse.reference,
            status: executeResponse.status as TRANSACTION_STATUSES,
            transactionDate: executeResponse.transactionDate,
          })
        }
        case ROUTE_REFERENCE.LOG_IN: {
          const tokens = await login({
            ...params?.loginData,
            otp: value,
          })
          tokens ? updateToken(tokens) : null
          showGlobalSpinner({ type: 'withLogo' })
          return navigate(ROUTES.Login)
        }
        case ROUTE_REFERENCE.CHANGE_PASSWORD: {
          const changePasswordHandler = params?.passwordData.username
            ? forgotPasswordExec
            : changePasswordExec
          await changePasswordHandler({
            ...params?.passwordData,
            otp: value,
          })
          return navigate(ROUTES.SuccessPassword, {
            reference: params.reference,
            isForgotPassword: Boolean(params?.passwordData?.username),
          })
        }
        case ROUTE_REFERENCE.CHANGE_PHONE: {
          await changePhoneExec({
            phoneNumber: params.phoneNumber,
            otp: value,
          })
          return navigate(ROUTES.SuccessPassword, { isPhone: true })
        }
        case ROUTE_REFERENCE.EDIT_PERSONAL_DETAILS: {
          return navigate(ROUTES.Settings)
        }
        case ROUTE_REFERENCE.NOTIFICATIONS: {
          return navigate(ROUTES.Notifications)
        }
        default: {
          return null
        }
      }
    } catch (err: unknown) {
      if (isInvalidOTP(err)) {
        setIsErrorOTP(true)
        setValue('')
        ref?.current?.focus()
      } else {
        showErrorModal(err)
      }
      hideGlobalSpinner()
    } finally {
      if (params.reference !== ROUTE_REFERENCE.LOG_IN) {
        hideGlobalSpinner()
      }
    }
  }, [navigate, params, ref, showErrorModal, value])

  useEffect(() => {
    if (isErrorOTP && value) {
      setIsErrorOTP(false)
    }
    if (value.length === 6) {
      onNext()
    }
  }, [value, onNext, isErrorOTP])

  const onResendCode = useCallback(async () => {
    try {
      switch (params.reference) {
        case ROUTE_REFERENCE.CONFIRM: {
          const init = initTransferHandlers[params.transactionData.type]
          await init(params.transactionData.transfer)
          break
        }
        case ROUTE_REFERENCE.LOG_IN: {
          await login(params.loginData)
          break
        }
        case ROUTE_REFERENCE.CHANGE_PASSWORD: {
          const changePasswordHandler = params?.passwordData.username
            ? forgotPasswordInit
            : changePasswordInit
          await changePasswordHandler(params?.passwordData.username)
          break
        }
        case ROUTE_REFERENCE.CHANGE_PHONE: {
          await changePhoneInit()
          break
        }
      }
    } catch (err: unknown) {
      if (err?.payload?.error_description !== 'Requires 2FA') {
        showErrorModal(err)
      }
    }
    setValue('')
    ref?.current?.focus()
  }, [params, ref, showErrorModal])

  const renderCell = useCallback(
    ({ index, symbol, isFocused }) => (
      <Row alignItems="center" key={index}>
        <SymbolContainer
          key={index}
          bc={isFocused ? 'pumpkin85' : symbol ? 'gray85' : 'lightGray'}
          bg={isFocused || symbol ? 'white' : 'lightGray'}
          ml={index !== 0 ? 10 : 0}
        >
          <Symbol onLayout={getCellOnLayoutHandler(index)} fontWeight={symbol ? '500' : '200'}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Symbol>
        </SymbolContainer>
        {index === 2 ? <Line /> : null}
      </Row>
    ),
    [getCellOnLayoutHandler],
  )

  return (
    <Container type="secondary" safeTop safeBottom darkBarStyle>
      {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column alignItems="flex-start" mt="m">
            <IconButton icon={icons.arrowLeft} onPress={goBack} />
            <Title mt="m">{t('OTP_CODE')}</Title>
            <Row mt="s">
              <BodySmall>{t('OTP_SENT')}</BodySmall>
              <BodySmall bold={Boolean(phone)}>{phone || ' your phone number'}</BodySmall>
            </Row>
            <OTP
              autoFocus={true}
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={6}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
            {isErrorOTP ? (
              <Caption color="pumpkin" mt="l">
                {t('OTP_WRONG')}
              </Caption>
            ) : null}
          </Column>
          <TimeTracker condition={false} onPress={onResendCode} />
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
const OTP = styled(CodeField).attrs(() => ({
  rootStyle: {
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))``

const SymbolContainer = styled(Column)`
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 45px;
  border-width: 1px;
  border-radius: 8px;
`

const Symbol = styled(Text)`
  font-size: 30px;
  line-height: 37px;
`

const Line = styled(Column)`
  height: 1px;
  width: 14px;
  margin-left: ${({ theme }) => theme.spacings.s}px;
  background-color: ${({ theme }) => theme.colors.midGray};
`

export default memo(OneTimePassword)
