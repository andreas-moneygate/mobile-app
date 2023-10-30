import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { I18N_NAMESPACES } from 'utils/i18n'
import { formatTiming } from 'utils/ui'

interface TrackerProps {
  condition?: boolean
  onPress?: () => void
  type?: 'email' | 'otp'
}

export const TimeTracker = memo(({ type = 'otp', condition, onPress }: TrackerProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const [resendBtnDisabledTime, setResendBtnDisabledTime] = useState(30)
  const resendOtpTimerInterval = useRef<number>()

  const txtRequest = useMemo(
    () => ({
      email: 'Request new email in',
      otp: t('OTP_REQUEST_NEW'),
    }),
    [],
  )

  const onResendCode = useCallback(() => {
    onPress && onPress()
    setResendBtnDisabledTime(30)
  }, [onPress])

  const startResendOtpTimer = useCallback(() => {
    resendOtpTimerInterval.current = +setInterval(() => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval.current)
      }
      if (resendBtnDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval.current)
      } else {
        setResendBtnDisabledTime(resendBtnDisabledTime - 1)
      }
    }, 1000)
  }, [resendBtnDisabledTime, resendOtpTimerInterval])

  useEffect(() => {
    startResendOtpTimer()

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval.current)
      }
    }
  }, [resendBtnDisabledTime, resendOtpTimerInterval, startResendOtpTimer])

  const timing = useMemo(() => formatTiming(resendBtnDisabledTime), [resendBtnDisabledTime])

  const renderTypeTracker = useCallback(() => {
    switch (type) {
      case 'email': {
        return (
          <Row>
            <BodySmall>Didn’t get email with link?</BodySmall>
            <TouchableOpacity onPress={onResendCode}>
              <BodySmall color="pumpkin85">&nbsp;Resend email</BodySmall>
            </TouchableOpacity>
          </Row>
        )
      }
      default:
        return (
          <TouchableOpacity onPress={onResendCode}>
            <BodySmall color="pumpkin85">{t('OTP_RESEND')}</BodySmall>
          </TouchableOpacity>
        )
    }
  }, [onResendCode, t, type])

  return (
    <Column alignItems="center" mb="l">
      {resendBtnDisabledTime < 1 || condition ? (
        renderTypeTracker()
      ) : (
        <Row>
          <BodySmall color="darkGray">{txtRequest[type]}</BodySmall>
          <BodySmall color="darkGray">&nbsp;{timing}</BodySmall>
        </Row>
      )}
    </Column>
  )
})
