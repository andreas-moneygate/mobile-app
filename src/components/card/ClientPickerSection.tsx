import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import styled from 'styled-components/native'
import { SvgComponent } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface ClientPickerSectionProps {
  title: string
  accountsLength: number
  icon: SvgComponent | undefined
  onPress: () => void
  disabled?: boolean
  index: number
}
export const ClientPickerSection = memo((props: ClientPickerSectionProps) => {
  const { title, accountsLength, icon, onPress, index, disabled, ...respProps } = props

  return (
    <Section
      pl="m"
      pr="xl"
      opacity={disabled ? 0.5 : 1}
      onPress={onPress}
      disabled={disabled}
      {...respProps}
    >
      <Row>
        <Centered>
          <IconContainer>{renderIcon(icon || icons.client)}</IconContainer>
        </Centered>
        <Column ml="l">
          <Title>{title}</Title>
          <BodySmall color="gray">{accountsLength} accounts</BodySmall>
        </Column>
      </Row>
      {renderIcon(icons.chevronDown, { color: 'black' })}
    </Section>
  )
})

const Section = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.gray85};
  border-width: 1px;
  border-radius: 10px;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
`

const Title = styled(BodySmall)`
  font-weight: 500;
`

const IconContainer = styled(Centered)`
  background-color: ${({ theme }) => theme.colors.lightPowder};
  height: 40px;
  width: 40px;
  border-radius: 20px;
`
