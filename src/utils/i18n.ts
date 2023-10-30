import AsyncStorage from '@react-native-async-storage/async-storage'
import commonEl from 'assets/languages/el/common.json'
import dashboardFlowEl from 'assets/languages/el/dashboardFlow.json'
import transferFlowEl from 'assets/languages/el/transferFlow.json'
import commonEn from 'assets/languages/en/common.json'
import dashboardFlowEn from 'assets/languages/en/dashboardFlow.json'
import transferFlowEn from 'assets/languages/en/transferFlow.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export enum I18N_NAMESPACES {
  COMMON = 'common',
  DASHBOARD_FLOW = 'dashboardFlow',
  TRANSFER_FLOW = 'transferFlow',
}

export const changeLanguage = async (ln: 'en' | 'el') => {
  i18n.changeLanguage(ln)
  await AsyncStorage.setItem('@language', ln)
}

export const getLanguage = async (): Promise<'en' | 'el'> => {
  const ln: 'en' | 'el' | null = await AsyncStorage.getItem('@language')
  return ln || 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: {
      [I18N_NAMESPACES.COMMON]: commonEn,
      [I18N_NAMESPACES.DASHBOARD_FLOW]: dashboardFlowEn,
      [I18N_NAMESPACES.TRANSFER_FLOW]: transferFlowEn,
    },
    el: {
      [I18N_NAMESPACES.COMMON]: commonEl,
      [I18N_NAMESPACES.DASHBOARD_FLOW]: dashboardFlowEl,
      [I18N_NAMESPACES.TRANSFER_FLOW]: transferFlowEl,
    },
  } as const,
  ns: [I18N_NAMESPACES.COMMON, I18N_NAMESPACES.DASHBOARD_FLOW, I18N_NAMESPACES.TRANSFER_FLOW],
  defaultNS: I18N_NAMESPACES.COMMON,
  nsSeparator: '::',
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['en', 'el'],
  compatibilityJSON: 'v3',
})

export default i18n
