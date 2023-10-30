import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { ActionTypeSetting } from 'components/elements/ActionTypeSetting'
import { LogOut } from 'components/elements/LogOut'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { LanguageList } from 'components/list/LanguageList'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UserContext } from 'state/contexts'
import styled from 'styled-components/native'
import { IconProp } from 'types/ui'
import { SECTION_FIELD_TYPE } from 'utils/enum'
import { changeLanguage, I18N_NAMESPACES } from 'utils/i18n'
import { renderIcon } from 'utils/ui'

interface SettingSectionProps {
  icon: IconProp
  title: string
  type?: SECTION_FIELD_TYPE
  onChange: (data: any) => void
  initialValue?: any
  index: number
}

export const SettingSection = memo(
  ({ icon, title, initialValue, type, onChange, index }: SettingSectionProps) => {
    const [value, setValue] = useState(initialValue)
    const { logout } = useContext(UserContext)
    const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)

    const onSelect = useCallback(it => {
      changeLanguage(it.value)
      setValue(it.label)
    }, [])

    const onShow = useCallback(() => {
      bottomSheetModalRef.current?.present()
    }, [])

    const onHandle = useCallback(
      item => {
        if (type === 'select') {
          onShow()
        }
        onChange(item)
      },
      [type, onChange, onShow],
    )

    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ['1%', 300], [])

    const handleSheetModalChanges = useCallback((i: number) => {
      if (i === 0) {
        bottomSheetModalRef.current?.dismiss()
      }
    }, [])

    const onClose = useCallback(() => bottomSheetModalRef?.current?.dismiss(), [])

    const onLogOut = useCallback(() => {
      onClose()
      logout()
    }, [onClose, logout])

    const renderContent = useCallback(() => {
      switch (title) {
        case t('LANGUAGE'): {
          return <LanguageList onSelect={onSelect} onCloseModal={onClose} />
        }
        case t('LOG_OUT'): {
          return <LogOut onCancel={onClose} onLogOut={onLogOut} />
        }
        default: {
          return null
        }
      }
    }, [title, t, onSelect, onClose, onLogOut])

    const isDisabled =
      title !== t('LOG_OUT') &&
      type !== SECTION_FIELD_TYPE.DETAILS &&
      type !== SECTION_FIELD_TYPE.LINK

    return type !== SECTION_FIELD_TYPE.HIDDEN ? (
      <Column>
        <Section ph="l" disabled={isDisabled} onPress={onHandle}>
          <Row alignItems="center">
            {renderIcon(icon, iconStyle)}
            <Title ml="l">{title}</Title>
          </Row>
          <ActionTypeSetting value={value || initialValue} type={type} onAction={onHandle} />
        </Section>
        <CustomBottomModalSheet
          innerRef={bottomSheetModalRef}
          onChange={handleSheetModalChanges}
          snapPoints={snapPoints}
          index={index}
        >
          <Column flex={1}>{renderContent()}</Column>
        </CustomBottomModalSheet>
      </Column>
    ) : null
  },
)

const Section = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`

const iconStyle = { width: 22, height: 22 }
