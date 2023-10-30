import { ActionButton } from 'components/buttons/ActionButton'
import { ErrorMessage } from 'components/elements/ErrorMessage'
import { Row } from 'components/layout/Row'
import { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

import { Column } from './Column'

interface HeaderProps {
  leftIcon: 'back' | 'settings' | 'arrowBack' | 'clear'
  rightIcon?: 'exclamation' | 'notification' | 'favorite' | 'close' | 'notificationUnread'
  onLeftPress?: any
  onRightPress?: any
  children?: JSX.Element
  isFavorite?: boolean
  error?: string
  hideErrorModal?: () => void
}

export const Header = memo((props: HeaderProps & LayoutItemProps) => {
  const {
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress,
    children,
    isFavorite,
    error,
    hideErrorModal,
    ...restProps
  } = props
  const insets = useSafeAreaInsets()
  return (
    <Container mt={insets.top} {...restProps}>
      <Column>
        {error ? (
          <Row mh={-15} mb="m">
            <ErrorMessage errorMessage={error} onClose={hideErrorModal} />
          </Row>
        ) : null}
        <Row>
          <Row minWidth="10%">
            {leftIcon ? <ActionButton type={leftIcon} onAction={onLeftPress} /> : null}
          </Row>
          <Row width="80%" justifyContent="center">
            {children}
          </Row>

          <Row minWidth="10%" justifyContent="flex-end">
            {rightIcon ? (
              <ActionButton type={rightIcon} onAction={onRightPress} isFavorite={isFavorite} />
            ) : null}
          </Row>
        </Row>
      </Column>
    </Container>
  )
})

const Container = styled(Row)`
  justify-content: space-between;
  align-items: center;
  min-height: 45px;
  width: 100%;
  padding-right: ${({ theme }) => theme.spacings.m}px;
  padding-left: ${({ theme }) => theme.spacings.m}px;
`
