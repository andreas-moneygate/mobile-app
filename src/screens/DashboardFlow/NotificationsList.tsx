import { useNavigation } from '@react-navigation/native'
import icons from 'assets/icons'
import images from 'assets/images'
import {
  Background,
  BodySmall,
  Caption,
  Column,
  Container,
  IconButton,
  Label,
  NotificationsCard,
  Row,
  ScrollView,
  TouchableOpacity,
} from 'components'
import useNotifications from 'hooks/useNotifications'
import { memo, useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView as ScrollViewType } from 'react-native'
import styled from 'styled-components/native'
import { I18N_NAMESPACES } from 'utils/i18n'
import { renderIcon } from 'utils/ui'

function NotificationsList() {
  const { goBack } = useNavigation()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const scrollRef = useRef<ScrollViewType>(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const { notifications } = useNotifications()

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setShowScrollToTop(event.nativeEvent.contentOffset.y >= 70)
  }, [])

  const handleScrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    })
  }, [])

  return (
    <Background image={images.homeBG}>
      <Container type="transparent" safeTop>
        <Header justifyContent="space-between">
          <IconButton icon={renderIcon(icons.arrowLeft, { color: 'white' })} onPress={goBack} />
          <BodySmall color="white" width="100%">
            {t('INBOX')}
          </BodySmall>
          <Row width={22} />
        </Header>
        {notifications.length ? (
          <>
            <ScrollView
              innerRef={scrollRef}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              mh="m"
            >
              {notifications.map(notificationGroup => (
                <Column alignItems="center" key={notificationGroup.date}>
                  <Group>
                    <Label color="lightMagentaPink" textAlign="center">
                      {notificationGroup.date}
                    </Label>
                  </Group>
                  {notificationGroup.notifications.map(notification => (
                    <NotificationsCard
                      key={notification.id}
                      notificationId={notification.id}
                      title={notification.title}
                      content={notification.content}
                      time={notification.time}
                      isRead={notification.isMessageRead}
                    />
                  ))}
                </Column>
              ))}
              <Row mb="xxl" />
            </ScrollView>
            {showScrollToTop ? (
              <ScrollToTopButton onPress={handleScrollToTop}>
                {renderIcon(icons.chevronUp)}
              </ScrollToTopButton>
            ) : null}
          </>
        ) : (
          <Column height="80%" justifyContent="center" alignItems="center">
            {renderIcon(icons.noNotifications)}
            <BodySmall color="white" fontWeight="600" textAlign="center" mt="m" mb="xs">
              {t('NO_NOTIFICATIONS_TITLE')}
            </BodySmall>
          </Column>
        )}
      </Container>
    </Background>
  )
}

const Header = styled(Row)`
  padding: 11px 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.3);
`

const Group = styled(Column)`
  color: ${({ theme }) => theme.colors.lightMagentaPink};
  font-size: 12px;
  background: rgba(255, 255, 255, 0.12);
  width: 150px;
  text-align: center;
  padding: ${({ theme }) => theme.spacings.xs}px;
  border-radius: 20px;
  margin-top: ${({ theme }) => theme.spacings.l}px;
  margin-bottom: ${({ theme }) => theme.spacings.xs}px;
`

const ScrollToTopButton = styled(TouchableOpacity)`
  height: 32px;
  width: 32px;
  background-color: ${({ theme }) => theme.colors.darkTransparent};
  position: absolute;
  bottom: 45px;
  right: 25px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`

export default memo(NotificationsList)
