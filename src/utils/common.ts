import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'

export enum CONTACT_US_DEFAULT_CATEGORIES {
  'General Info',
  'Client Support',
  'Payment Cancellation',
  'Payment Inquiries',
  'Payment Amendments',
  'Complaints',
  'Other',
}

export const isInvalidOTP = (requestError: unknown) => requestError?.payload?.errors?.Otp

export const checkBiometricSupport = async () => {
  const result = await Promise.all([
    LocalAuthentication.hasHardwareAsync(),
    LocalAuthentication.isEnrolledAsync(),
  ])

  return result.every(check => check)
}

export const checkUseBiometric = async () => {
  const useBiometric = await AsyncStorage.getItem('@useBiometric')
  const refreshToken = await AsyncStorage.getItem('@refreshToken')

  return Boolean(useBiometric === 'true' && refreshToken)
}

export const toggleUseBiometric = async () => {
  const useBiometric = await checkUseBiometric()

  if (useBiometric) {
    await AsyncStorage.setItem('@useBiometric', 'false')
    return false
  }

  const authenticateAsync = await LocalAuthentication.authenticateAsync({
    cancelLabel: 'Cancel',
    fallbackLabel: '',
    disableDeviceFallback: true,
    requireConfirmation: false,
  })

  if (authenticateAsync.success) {
    await AsyncStorage.setItem('@useBiometric', 'true')
    return true
  }

  await AsyncStorage.setItem('@useBiometric', 'false')
  return false
}
