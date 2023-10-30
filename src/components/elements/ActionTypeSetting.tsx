import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { CustomSwitch } from 'components/content/CustomSwitch'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { SimpleToast } from 'components/layout/SimpleToast'
import { BodySmall } from 'components/typography/BodySmall'
import { useState } from 'react'
import { memo, useCallback } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { SECTION_FIELD_TYPE } from 'utils/enum'
import { renderIcon } from 'utils/ui'

interface ActionSettingSectionProps {
  value?: any
  label?: string
  type?: SECTION_FIELD_TYPE
  onAction?: (item?: any) => void
}

export const ActionTypeSetting = memo((props: ActionSettingSectionProps) => {
  const { value, label, type, onAction } = props
  const {
    colors: { darkGray },
  } = useTheme()
  const [show, setShow] = useState(false)

  const handleCopy = useCallback(item => {
    onAction(item)
    setShow(true)

    setTimeout(() => setShow(false), 2000)
  }, [])

  const renderContent = useCallback(() => {
    switch (type) {
      case SECTION_FIELD_TYPE.SELECT: {
        return (
          <Btn onPress={onAction}>
            <BodySmall mr="l" color="darkGray">
              {value}
            </BodySmall>
            {renderIcon(icons.chevronRight, { color: darkGray })}
          </Btn>
        )
      }
      case SECTION_FIELD_TYPE.SWITCH: {
        return <CustomSwitch isEnabled={value} onToggle={onAction} />
      }
      case SECTION_FIELD_TYPE.TEXT: {
        return <BodySmall color="darkGray">{value}</BodySmall>
      }
      case SECTION_FIELD_TYPE.COPY: {
        return (
          <Row>
            <SimpleToast show={show} text={`${label} Copied!`} />
            <IconButton icon={icons.copy} onPress={handleCopy} />
          </Row>
        )
      }
      case SECTION_FIELD_TYPE.EDIT: {
        return <IconButton icon={icons.edit} onPress={onAction} />
      }
      case SECTION_FIELD_TYPE.LINK:
      case SECTION_FIELD_TYPE.DETAILS: {
        return <Column>{renderIcon(icons.chevronRight, { color: darkGray })}</Column>
      }
      default:
        return null
    }
  }, [darkGray, type, value, label, show, onAction])

  return <Column>{renderContent()}</Column>
})

const Btn = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`
