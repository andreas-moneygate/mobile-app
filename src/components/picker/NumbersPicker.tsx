import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Row } from 'components/layout/Row'
import { BodySmall } from 'components/typography/BodySmall'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { renderIcon } from 'utils/ui'

import { ItemPicker } from './ItemPicker'

interface NumbersPickerProps {
  value: number
  data: { label: string; value: number }[]
  onSelect: (value: number) => void
}

export const NumbersPicker = memo(({ value, data, onSelect }: NumbersPickerProps) => {
  const { t } = useTranslation()
  return (
    <Row height={28} alignItems="center">
      <BodySmall fontWeight="600">{t('LAST_TRANSACTIONS').split(' ')[0]}</BodySmall>
      <ItemPicker
        data={data}
        value={value}
        onSelect={onSelect}
        CustomPickerButton={({ value, onOpen }) => (
          <LastTransactionsPicker onPress={onOpen}>
            <BodySmall fontWeight="600">{value}</BodySmall>
            {renderIcon(icons.chevronDown, { height: 20, width: 20, color: colors.black })}
          </LastTransactionsPicker>
        )}
      />
      <BodySmall fontWeight="600">{t('LAST_TRANSACTIONS').split(' ')[2]}</BodySmall>
    </Row>
  )
})

const LastTransactionsPicker = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  height: 28px;
  width: 58px;
  border-radius: 8px;
  margin: 0 10px;
  padding-top: 3px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`
