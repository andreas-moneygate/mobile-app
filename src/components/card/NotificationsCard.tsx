import InViewPort from '@coffeebeanslabs/react-native-inviewport'
import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { CaptionSmall } from 'components/typography/CaptionSmall'
import useNotifications from 'hooks/useNotifications'
import { memo, useCallback, useState } from 'react'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { renderIcon } from 'utils/ui'
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import {  StyleSheet } from 'react-native';


interface NotificationsCardProps {
  title: string
  content: string
  time: string
  notificationId: string
  isRead: boolean
}

export const NotificationsCard = memo((props: NotificationsCardProps) => {
  const [isLarge, setIsLarge] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { readNotification } = useNotifications()

  const toggleOpen = () => setIsOpen(!isOpen)

  const handleReadNotification = useCallback(
    (isVisible: boolean) => {
      if (!props.isRead && isVisible) {
        readNotification(props.notificationId)
      }
    },
    [props.isRead, props.notificationId, readNotification],
  )

  const { width } = useWindowDimensions();

  return (
    <Card style={shadowStyle}>
      <InViewPort onChange={handleReadNotification}>
        <Header>
          <Row alignItems="center">
            {renderIcon(icons.smallLogo, { width: 18, height: 18 })}
            <CaptionSmall ml="s">MoneyGate</CaptionSmall>
          </Row>
          <CaptionSmall color="darkGray">{props.time}</CaptionSmall>
        </Header>

        <BodySmall fontWeight="600" mt="m">
          {props.title}
        </BodySmall>

        <RenderHtml
          source={{ html: props.content }}
          contentWidth={width}
          baseStyle={isOpen ? renderHtmlStyles.fullHeight : renderHtmlStyles.partialHeight}
          onHTMLLoaded={() => setIsLarge(props.content.length > 100)}
        />

        {isLarge ? (
          <OpenButton onPress={toggleOpen}>
            <Row justifyContent="center" alignItems="center" p="s">
              <BodySmall color="midGray">Read {isOpen ? 'less' : 'more'}</BodySmall>
              {renderIcon(isOpen ? icons.chevronUp : icons.chevronDown, {
                width: 18,
                height: 18,
                color: colors.midGray,
              })}
            </Row>
          </OpenButton>
        ) : null}
      </InViewPort>
    </Card>
  )
})

const renderHtmlStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullHeight: {
    marginBottom: 10
  },
  partialHeight: {
    height: 50,
    overflow: 'hidden',
    marginBottom: 10
  }
});

const Card = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ theme }) => theme.spacings.m}px;
  padding: ${({ theme }) => theme.spacings.l}px;
  padding-bottom: 0;
  min-height: 125px;
  width: 100%;
  border-radius: 10px;
`

const Header = styled(Row)`
  align-items: center;
  justify-content: space-between;
`

const OpenButton = styled(TouchableOpacity)`
  border-top-width: 1px;
  border-top-color: #e6e6e6;
  margin: 0 -${({ theme }) => theme.spacings.l}px;
`

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 1,
}