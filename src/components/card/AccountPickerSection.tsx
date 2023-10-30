import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Centered } from 'components/layout/Centered'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import usePrice from 'hooks/usePrice'
import { memo, useMemo } from 'react'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { MappedAccount } from 'types/mapped/account'
import { currencyIcons, currencySymbols } from 'utils/currencies'
import { renderIcon } from 'utils/ui'

interface AccountPickerSectionProps {
  onPress: () => void
  onRemove?: () => void
  disabled?: boolean
  error?: boolean
  index: number
}
export const AccountPickerSection = memo((props: AccountPickerSectionProps & MappedAccount) => {
  const {
    accountNumber,
    balance,
    currency,
    title,
    isConnectedToCard,
    onPress,
    index,
    disabled,
    error,
    onRemove,
    ...respProps
  } = props

  const formatNumber = useMemo(() => `*${accountNumber?.slice(-4)}`, [accountNumber])

  const currencySymbol = useMemo(() => currencySymbols[currency as string], [currency])

  const { ceilPart, fractionalPart } = usePrice(balance)

  return (
    <Section pl="m" pr="xl" onPress={onPress} disabled={disabled} error={error} {...respProps}>       
      <Row>
        <Centered>{renderIcon(currencyIcons[currency as string], dimensions)}</Centered>
        {isConnectedToCard ? (
          <Row alignItems="center" ml={-14} mr={-8}>
            {renderIcon(icons.cardSmall, { height: 24, width: 24 })}
          </Row>
        ) : null}
        <Column ml="l">
          <Title>{title}</Title>
          <Row>
            <Caption mr="l">{formatNumber}</Caption>
            <Caption color="midGray">
              {currencySymbol}
              {ceilPart}.{fractionalPart}
            </Caption>
          </Row>
        </Column>
      </Row>
      {!disabled
        ? renderIcon(index <= 0 ? icons.chevronDown : icons.chevronUp, { color: 'black' })
        : null}
      {error && onRemove ? (
        <RemoveButton
          icon={renderIcon(icons.close, { width: 22, height: 22, color: colors.gray })}
          onPress={onRemove}
        />
      ) : null}
    </Section>
  )
})

const Section = styled(TouchableOpacity)<{ error?: boolean }>`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme, error }) => (error ? theme.colors.darkRed : theme.colors.gray85)};
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

const RemoveButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 15px;
  padding: 3px;
`

const dimensions = { height: 40, width: 40 }
