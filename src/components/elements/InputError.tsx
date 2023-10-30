import { CaptionSmall } from 'components/typography/CaptionSmall'
import styled from 'styled-components/native'

export const InputError = styled(CaptionSmall)`
  color: ${({ theme }) => theme.colors.pumpkin};
  font-weight: bold;
  margin-top: 5px;
`
