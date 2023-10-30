import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { Caption } from 'components/typography/Caption'
import { memo } from 'react'
import styled from 'styled-components'
import { Item } from 'types/pickers'

interface RadioPickerProps {
  label: string
  data: Array<Item>
  value: Item['value']
  onSelect: (value: Item['value']) => void
  radioSize?: number
  withDivider?: boolean
}

export const RadioPicker = memo(
  ({ label, value, data, onSelect, radioSize, withDivider }: RadioPickerProps) => {
    return (
        <Column>
          <BodySmall fontWeight="600" mb="m">
            {label}
          </BodySmall>
          {data.map(item => (
            <TouchableOpacity key={item.label} onPress={() => onSelect(item.value)}>
              <ItemWrapper withDivider={withDivider}>
                <Column mr="m">
                  <Wrapper>
                    <OuterCircle size={radioSize}>
                      {JSON.stringify(value) === JSON.stringify(item.value) && (
                        <InnerCircle size={radioSize} />
                      )}
                    </OuterCircle>
                  </Wrapper>
                </Column>

                <Column justifyContent="center">
                  <BodySmall fontWeight="600">{item.label}</BodySmall>
                  {item.subLabel ? <Caption color="darkGray">{item.subLabel}</Caption> : null}
                </Column>
              </ItemWrapper>
            </TouchableOpacity>
          ))}
        </Column>
    )
  },
)

const Wrapper = styled(Column)`
  // margin-bottom: 35px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

const ItemWrapper = styled(Row) <{ withDivider?: boolean }>`
  border-top-width: ${({ withDivider }) => (withDivider ? '1px' : 0)};
  align-items: center;
  min-height: 65px;
  border-top-color: ${({ theme }) => theme.colors.lightGray};
`

const OuterCircle = styled(Column) <{ size?: number }>`
  height: ${({ size }) => size || 30}px;
  width: ${({ size }) => size || 30}px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.pumpkin};
  align-items: center;
  justify-content: center;
`

const InnerCircle = styled(Column) <{ size?: number }>`
  width: ${({ size }) => size - 10 || 20}px;
  height: ${({ size }) => size - 10 || 20}px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.pumpkin};
`
