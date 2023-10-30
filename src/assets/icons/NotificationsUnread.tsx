import { memo } from 'react'
import { SvgProps } from 'react-native-svg'
import styled, { useTheme } from 'styled-components/native'

import Notifications from './Notifications'

function NotificationsUnread({ color, ...props }: SvgProps) {
  const {
    colors: { white },
  } = useTheme()

  return (
    <>
      <Notifications color={color || white} {...props} />
      <RedCircle />
    </>
  )
}

const RedCircle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.red};
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0px;
  right: 0px;
`

export default memo<SvgProps>(NotificationsUnread)
