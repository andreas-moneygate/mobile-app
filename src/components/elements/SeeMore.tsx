import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import styled from 'styled-components/native'
import { renderIcon } from 'utils/ui'

interface Props {
  status: 'more' | 'less'
  onPress: () => void
}

export const SeeMore = memo(({ status, onPress }: Props) => {
  return (
    <TouchableOpacity mt="m" onPress={onPress}>
      <Line mb="s" />
      <Box>
        <Txt color="midGray">See {status}</Txt>
        {renderIcon(status === 'less' ? icons.chevronUp : icons.chevronDown, iconStyle)}
      </Box>
    </TouchableOpacity>
  )
})

const Line = styled(Column)`
  border-color: ${({ theme }) => theme.colors.gray95};
  height: 1px;
  border-width: 1px;
`

const Box = styled(Column)`
  align-items: center;
  justify-content: center;
  align-self: center;
  flex-direction: row;
`

const Txt = styled(BodySmall)`
  color: ${({ theme }) => theme.colors.midGray};
  font-weight: 500;
`

const iconStyle = { color: '#AAAAAA', height: 20, width: 20 }
