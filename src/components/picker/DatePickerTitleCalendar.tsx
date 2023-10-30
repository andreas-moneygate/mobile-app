import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import styled from 'styled-components/native'
import { renderIcon } from 'utils/ui'

interface DatePickerTitleCalendarProps {
  title: string
  onOpen: () => void
}

export const DatePickerTitleCalendar = memo(({ title, onOpen }: DatePickerTitleCalendarProps) => (
  <PickFromCalendar onPress={onOpen}>
    <Row>
      {renderIcon(icons.calendarWithDays, { height: 25, width: 25 })}
      <BodySmall fontWeight="600" color="pumpkin" ml="m">
        {title}
      </BodySmall>
    </Row>
  </PickFromCalendar>
))

const PickFromCalendar = styled(TouchableOpacity)`
  height: 60px;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.lightGray};
`
