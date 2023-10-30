import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components/native'

interface DotsProps {
  numberOfSteps: number
  step: number
  line?: boolean
}

export const DotProgress = memo((props: DotsProps) => {
  const { numberOfSteps = 4, step = 0, line } = props
  const arrayDots = []
  arrayDots.length = numberOfSteps

  const renderBG = useMemo(() => {
    if (step === 1) {
      return 'scarlet'
    }
    if (step === 2) {
      return 'yellow'
    } else if (step === 3) {
      return 'paleGreen'
    } else {
      return 'green'
    }
  }, [step])

  const renderIndicator = useCallback(
    i => {
      if (line) {
        return <Line key={i} bg={step > i ? renderBG : 'lightGray'} ml={i !== 0 ? 3 : 0} />
      } else {
        return <Dot key={i} bg={step > i ? 'pumpkin85' : 'gray85'} ml={i !== 0 ? 20 : 0} />
      }
    },
    [line, step, renderBG],
  )

  for (let i = 0; i < numberOfSteps; i++) {
    arrayDots.push(renderIndicator(i))
  }
  return <Row>{arrayDots}</Row>
})

const Dot = styled(Row)`
  height: 16px;
  width: 16px;
  border-radius: 8px;
`

const Line = styled(Column)`
  height: 3px;
  flex: 1px;
`
