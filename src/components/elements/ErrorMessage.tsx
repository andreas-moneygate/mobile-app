import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import styled from 'styled-components'
import { renderIcon } from 'utils/ui'

interface ErrorMessageProps {
  errorMessage: string
  onClose: () => void
}

export const ErrorMessage = memo(({ errorMessage, onClose }: ErrorMessageProps) => {
  return (
    <Wrapper>
      <Column justifyContent="center">
        <Caption color="white">{errorMessage}</Caption>
      </Column>
      <IconButton icon={renderIcon(icons.close)} onPress={onClose} />
    </Wrapper>
  )
})

const Wrapper = styled(Row)`
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.scarlet};
  width: 100%;
  height: 36px;
  padding: 0 20px;
`
