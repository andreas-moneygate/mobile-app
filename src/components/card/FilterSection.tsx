import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { renderIcon } from 'utils/ui'

export interface FilterSectionProps {
  title: string
  value: string
  onOpen: () => void
}

export const FilterSection = memo((props: FilterSectionProps) => {
  const { value, title, onOpen, ...restProps } = props

  const {
    colors: { white },
  } = useTheme()

  return (
    <Section {...restProps}>
      <BodySmall color="lightMagentaPink">{title}</BodySmall>
      <Btn onPress={onOpen}>
        <BodySmall color="white" mr="xs">
          {value}
        </BodySmall>
        {renderIcon(icons.chevronRight, { color: white })}
      </Btn>
    </Section>
  )
})

const Section = styled(Row)`
  border-color: ${({ theme }) => theme.colors.white20};
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  height: 65px;
  width: 100%;
`

const Btn = styled(TouchableOpacity)`
  flex-direction: row;
`
