import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import { useTheme } from 'styled-components/native'
import styled from 'styled-components/native'
import colors from 'theme/colors'

interface ActionButtonProps {
  type: string | undefined
  onAction: () => void
  isFavorite?: boolean
  iconStyle?: object
  iconColor?: string
  disabled?: boolean
}

export const ActionButton = memo((props: ActionButtonProps) => {
  const { type, onAction, isFavorite, iconStyle, iconColor, disabled } = props

  const {
    colors: { white, lightMagentaPink, purple85 },
  } = useTheme()

  switch (type) {
    case 'back': {
      return <IconButton icon={icons.chevronLeft} onPress={onAction} />
    }
    case 'arrowBack': {
      return <IconButton icon={icons.arrowLeft} iconColor="white" onPress={onAction} />
    }
    case 'settings': {
      return <IconButton icon={icons.settings} onPress={onAction} />
    }
    case 'exclamation': {
      return <IconButton icon={icons.exclamation} iconColor="white" onPress={onAction} />
    }
    case 'notification': {
      return <IconButton icon={icons.notifications} onPress={onAction} />
    }
    case 'notificationUnread': {
      return <IconButton icon={icons.notificationsUnread} onPress={onAction} />
    }
    case 'favorite': {
      return (
        <IconButton
          icon={isFavorite ? icons.favorite : icons.favoriteBorder}
          iconColor={white || iconColor}
          onPress={onAction}
          iconStyle={favoriteStyle || iconStyle}
        />
      )
    }
    case 'filter': {
      return <IconButton icon={icons.filter} onPress={onAction} />
    }
    case 'search': {
      return <IconButton icon={icons.search} onPress={onAction} />
    }
    case 'close': {
      return <IconButton icon={icons.close} iconColor={lightMagentaPink} onPress={onAction} />
    }
    case 'clear': {
      return (
        <TouchableOpacity onPress={onAction}>
          <BodySmall color="lightMagentaPink">Clear</BodySmall>
        </TouchableOpacity>
      )
    }
    case 'exchange': {
      return (
        <Exchange
          icon={icons.exchange}
          iconColor={purple85 || iconColor}
          iconStyle={exchangeStyle || iconStyle}
          onPress={onAction}
          style={shadowStyle}
          disabled={disabled}
          opacity={disabled ? 0.2 : 1}
        />
      )
    }
    case 'exchangeVertical': {
      return (
        <Exchange
          icon={icons.exchangeVertical}
          iconColor={purple85 || iconColor}
          onPress={onAction}
          disabled={disabled}
          style={shadowStyle}
          opacity={disabled ? 0.2 : 1}
        />
      )
    }
    default:
      return null
  }
})

const favoriteStyle = { width: 21, height: 21 }
const exchangeStyle = { width: 22, height: 22 }

const Exchange = styled(IconButton)`
  height: 28px;
  width: 28px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.mintCream};
`

const shadowStyle = {
  backgroundColor: colors.white,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 2,
}
