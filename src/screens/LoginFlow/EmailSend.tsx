import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  BodySmall,
  Button,
  Column,
  Container,
  IconButton,
  KeyboardAvoidingView,
  TimeTracker,
  Title,
} from 'components'
import { memo, useCallback } from 'react'
import { LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { renderIcon } from 'utils/ui'

function EmailSend() {
  const { goBack, navigate } = useNavigation<NavigationProp<LogInStackParamList>>()
  const { params } = useRoute<RouteProp<LogInStackParamList, ROUTES.EmailSend>>()

  const onSubmit = useCallback(() => {
    navigate(ROUTES.ResetPassword)
  }, [navigate])

  return (
    <Container type="secondary">
      <KeyboardAvoidingView>
        <ScrollWrapper keyboardShouldPersistTaps="handled">
          <Column alignItems="flex-start" mt="m">
            <IconButton icon={icons.arrowLeft} onPress={goBack} />
            <Title mt="m">Check your email</Title>
            <Description>
              We have sent a password recover instructions to&nbsp;
              <Description fontWeight="600">{params?.email}</Description>
            </Description>
          </Column>
          {renderIcon(icons.sendEmail)}
          <Column mb="l">
            <TimeTracker type="email" />
            <Button onPress={onSubmit} title="Open Email" />
          </Column>
        </ScrollWrapper>
      </KeyboardAvoidingView>
    </Container>
  )
}

const ScrollWrapper = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingHorizontal: 20,
  },
}))``

const Description = styled(BodySmall)`
  margin-top: ${({ theme }) => theme.spacings.s}px;
  line-height: 24px;
`

export default memo(EmailSend)
