import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { ActionTypeSetting } from 'components/elements/ActionTypeSetting'
import { Column } from 'components/layout/Column'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import styled from 'styled-components/native'
import { currencySymbols } from 'utils/currencies'
import { SECTION_FIELD_TYPE } from 'utils/enum'

interface AccountSectionFieldProps {
  label: string
  value: string
  currency: string
  type: 'copy' | 'edit' | 'details' | undefined
  onAction?: (item?: any) => void
}

export const AccountFieldSection = memo((props: AccountSectionFieldProps) => {
  const { label, value, type, onAction, currency, ...restProps } = props
  return (
    <Section
      mt="l"
      {...restProps}
      disabled={type !== SECTION_FIELD_TYPE.DETAILS}
      onPress={onAction}
    >
      <Column>
        <Caption color="midGray">{label}</Caption>
        <BodySmall mt="xs">
          {currencySymbols[currency as string]}
          {value}
        </BodySmall>
      </Column>
      <ActionTypeSetting value={value} label={label} type={type} onAction={onAction} />
    </Section>
  )
})

const Section = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
`
