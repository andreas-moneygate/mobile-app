import icons from 'assets/icons'
import config from 'config'
import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import ROUTES from 'routes/RouteNames'
import { UserContext } from 'state/contexts'
import { checkBiometricSupport, checkUseBiometric, toggleUseBiometric } from 'utils/common'
import { SECTION_FIELD_TYPE } from 'utils/enum'
import { I18N_NAMESPACES } from 'utils/i18n'

const LANGUAGES = {
  en: 'English',
  el: 'Greek',
}

const useSettings = () => {
  const { user } = useContext(UserContext)
  const { t, i18n } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const fullName = user?.firstName ? `${user?.firstName} ${user?.lastName}` : ''

  const [useBiometric, setUseBiometric] = useState<boolean | null>(false)

  const handleInitUseBiometric = useCallback(async () => {
    const isBiometricSupported = await checkBiometricSupport()
    const useBiometric = await checkUseBiometric()

    setUseBiometric(!isBiometricSupported ? null : useBiometric)
  }, [])

  useEffect(() => {
    handleInitUseBiometric()
  }, [handleInitUseBiometric])

  const handleUseBiometric = useCallback(async () => {
    const result = await toggleUseBiometric()
    setUseBiometric(result)
  }, [])

  const settings = useMemo(() => {
    return {
      user: { name: `${fullName}`, email: user?.email },
      data: [
        {
          fields: [
            {
              title: t('PERSONAL_INFO'),
              value: '',
              icon: icons.personalInfo,
              type: SECTION_FIELD_TYPE.DETAILS,
              route: ROUTES.PersonalInfo,
              id: 1,
              data: [
                {
                  fields: [
                    {
                      label: t('common::NAME'),
                      value: fullName,
                      reference: 'fullName',
                      id: 1,
                    },
                    {
                      label: t('common::EMAIL'),
                      value: user?.email,
                      reference: 'email',
                      id: 2,
                    },
                    {
                      label: t('common::PHONE'),
                      value: user?.phoneNumber,
                      type: SECTION_FIELD_TYPE.DETAILS,
                      reference: 'phone',
                      id: 3,
                    },
                  ]
                },
              ],
            },
            // {
            //   title: t('LANGUAGE'),
            //   icon: icons.language,
            //   type: 'select',
            //   value: LANGUAGES[i18n.language],
            //   id: 2,
            // },
            {
              title: t('PASSWORD'),
              value: '',
              icon: icons.password,
              route: ROUTES.Password,
              type: SECTION_FIELD_TYPE.DETAILS,
              id: 2,
            },
            {
              title: t('CONTACT_US'),
              route: ROUTES.ContactUs,
              value: '',
              icon: icons.contactUs,
              type: SECTION_FIELD_TYPE.DETAILS,
              data: {
                email: user?.email,
                value: 'Payment issues',
                message:
                  'Hey! I have a problem with bank transfers. Can someone help me with that?',
              },
              id: 3,
            },
          ],
          id: 1,
        },
        {
          reference: 'settings',
          fields: [
            {
              title: t('PRIVACY'),
              value: config.termsFeed.privacy,
              icon: icons.privacy,
              type: SECTION_FIELD_TYPE.LINK,
              id: 1,
            },
            {
              title: t('TERMS_AND_CONDITIONS'),
              value: config.termsFeed.termsAndConditions,
              icon: icons.termsAndConditions,
              type: SECTION_FIELD_TYPE.LINK,
              id: 2,
            },
            {
              title: 'Use biometric',
              icon: icons.faceID,
              type: useBiometric === null ? SECTION_FIELD_TYPE.HIDDEN : SECTION_FIELD_TYPE.SWITCH,
              value: useBiometric,
              handler: handleUseBiometric,
              id: 3,
            },
            // {
            //   title: 'Notifications',
            //   icon: icons.contactUs,
            //   type: SECTION_FIELD_TYPE.SWITCH,
            //   value: true,
            //   id: 4,
            // },
            // {
            //   title: 'Connected devices',
            //   value: '',
            //   icon: icons.connectedDevices,
            //   type: SECTION_FIELD_TYPE.DETAILS,
            //   id: 5,
            // },
            {
              title: t('VERSION'),
              icon: icons.version,
              value: config.appVersion,
              type: SECTION_FIELD_TYPE.TEXT,
              id: 4,
            },
          ],
          id: 2,
        },
        {
          fields: [
            {
              title: t('LOG_OUT'),
              value: '',
              icon: icons.logOut,
              type: SECTION_FIELD_TYPE.SELECT,
              id: 1,
            },
          ],
          id: 3,
        },
      ],
    }
  }, [fullName, handleUseBiometric, i18n.language, t, useBiometric, user?.email, user?.phoneNumber])

  return settings
}

export default useSettings
