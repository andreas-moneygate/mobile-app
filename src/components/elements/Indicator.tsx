import icons from 'assets/icons'
import { Centered } from 'components/layout/Centered'
import { memo } from 'react'
import styled from 'styled-components/native'
import { renderIcon } from 'utils/ui'

export const Indicator = memo(() => {
  return <Wrapper>{renderIcon(icons.line)}</Wrapper>
})

const Wrapper = styled(Centered)`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  height: 40px;
`
