import { BottomSheetModal } from '@gorhom/bottom-sheet'
import icons from 'assets/icons'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { ScrollableItemSectionsList } from 'components/list/ScrollableItemSectionsList'
import { Body } from 'components/typography/Body'
import { Caption } from 'components/typography/Caption'
import { FC, memo, useCallback, useMemo, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { Item } from 'types/pickers'
import { renderIcon } from 'utils/ui'

interface ScrollableItemPickerProps {
  title: string
  listTitle?: string
  data: Array<Item>
  value: Item['value']
  onSelect: (value: Item['value']) => void
  CustomPickerButton?: FC<{ title: string; value: string; onOpen: () => void }>
}

export const ScrollableItemPicker = memo((props: ScrollableItemPickerProps) => {
  const { title, data, value, onSelect, CustomPickerButton } = props

  const selectedLabel = useMemo(
    () => data?.find(item => item.value === value)?.label || '',
    [data, value],
  )

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss()
  }, [])

  const handleSelect = useCallback(
    ({ value }: Item) => {
      onSelect(value)
      handleClose()
    },
    [handleClose, onSelect],
  )
  
  return (
    <Column>
      {CustomPickerButton ? (
        <CustomPickerButton title={title} value={selectedLabel} onOpen={handleOpen} />
      ) : (
        <Picker onPress={handleOpen}>
          <Column>
            <Caption color="darkGray">{title}</Caption>
            <Body mt="xs">{selectedLabel}</Body>
          </Column>
          {renderIcon(icons.chevronDown, iconStyle)}
        </Picker>
      )}

      <CustomBottomModalSheet innerRef={bottomSheetModalRef}>
        <ScrollableItemSectionsList data={data} value={value} onSelect={handleSelect} />
      </CustomBottomModalSheet>
    </Column>
  )
})

const Picker = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacings.l}px;
  border-color: ${({ theme }) => theme.colors.gray85};
  border-radius: 12px;
  height: 60px;
  border-width: 1px;
  padding: 0 20px;
`

const iconStyle = { color: 'black', width: 20, height: 20 }
