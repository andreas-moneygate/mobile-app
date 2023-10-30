import { ActionButton } from 'components/buttons/ActionButton'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { LayoutItemProps } from 'types/ui'

interface HeaderProps {
  onBack?: any
  title: string
  cardNumber?: string | undefined
}

export const AccountHeader = memo((props: HeaderProps & LayoutItemProps) => {
  const { title, onBack, cardNumber, ...restProps } = props
  const insets = useSafeAreaInsets()
  return (
    <Container mh="l" {...restProps} mt={insets.top}>
      <Column position="absolute" left={0}>
        <ActionButton type="arrowBack" onAction={onBack} />
      </Column>
      <Column alignItems="center">
        <BodySmall color="white">{title}</BodySmall>
        {cardNumber && <Caption color="lightMagentaPink">{cardNumber}</Caption>}
      </Column>
    </Container>
  )
})

const Container = styled(Row)`
  justify-content: center;
  align-items: center;
  height: 45px;
`
