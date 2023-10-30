import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  BodySmall,
  Caption,
  Column,
  Container,
  PinCode,
  ProgressBar,
  Title,
  TouchableOpacity,
} from 'components'
import { memo, useCallback, useEffect, useState } from 'react'
import { DashboardStackParamList, LogInStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'

function EnterPin() {
  const { navigate } =
    useNavigation<NavigationProp<LogInStackParamList & DashboardStackParamList>>()
  const [code, setCode] = useState('')
  const onNext = useCallback(() => {
    navigate(ROUTES.Login)
  }, [navigate])

  useEffect(() => {
    if (code === '0000') {
      navigate(ROUTES.Home)
    }
  }, [navigate, code])

  return (
    <Container type="secondary">
      <Wrapper ph="l">
        <Title mt={45}>Enter PIN</Title>
        <Column alignItems="center" height={60}>
          <ProgressBar step={code.length} numberOfSteps={4} />
          {code.length === 4 && code !== '0000' && (
            <Caption color="pumpkin" mt="s">
              Invalid pin code
            </Caption>
          )}
        </Column>
        <Column>
          <PinCode code={code} setCode={setCode} onHandleFaceID={() => console.log('faceID')} />
          <TouchableOpacity onPress={onNext} alignSelf="center" mb="s" mt="l">
            <BodySmall color="pumpkin85">Enter via Login</BodySmall>
          </TouchableOpacity>
        </Column>
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled(Column)`
  flex: 1;
  justify-content: space-between;
`

export default memo(EnterPin)
