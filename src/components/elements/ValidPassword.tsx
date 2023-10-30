import icons from 'assets/icons'
import { Centered } from 'components/layout/Centered'
import { Row } from 'components/layout/Row'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface ValidPasswordProps {
  title: string
  complete: boolean
}

export const ValidPassword = memo((props: ValidPasswordProps & LayoutItemProps) => {
  const { title, complete, ...restProps } = props
  return (
    <Row {...restProps}>
      {complete ? <Check>{renderIcon(icons.check)}</Check> : <Circle />}
      <Caption color="darkGray" ml="s">
        {title}
      </Caption>
    </Row>
  )
})

const Check = styled(Centered)`
  background-color: ${({ theme }) => theme.colors.green};
  height: 18px;
  width: 18px;
  border-radius: 9px;
`

const Circle = styled(Centered)`
  border-color: ${({ theme }) => theme.colors.gray85}
  border-width: 1px;
  height: 18px;
  width: 18px;
  border-radius: 9px;
`
