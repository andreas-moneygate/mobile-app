import { BottomSheetModal } from '@gorhom/bottom-sheet'
import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { FilterPeriodList } from 'components/list/FilterPeriodList'
import usePeriod from 'hooks/usePeriod'
import { FC, memo, useCallback, useMemo, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { screenHeight } from 'utils/ui'

interface DropdownProps {
  title?: string
  value?: string
  initValue?: {
    start: string
    end: string
  }
  hidePeriodButtons?: boolean
  onSelect: (start: string, end: string) => void
  CustomPickerButton?: FC<{ title: string; value: string; onOpen: () => void }>
}

const CONTENT_HEIGHT = 370

export const DatePicker = memo((props: DropdownProps) => {
  const {
    title = '',
    value = '',
    initValue,
    initPeriod,
    onSelect,
    hidePeriodButtons,
    CustomPickerButton,
  } = props

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['20%', screenHeight * 0.9], [])
  const period = usePeriod()
  const insets = useSafeAreaInsets()

  const CALENDAR_HEIGHT =
    screenHeight - CONTENT_HEIGHT - insets.bottom + (hidePeriodButtons ? 100 : 0)

  const handleShow = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])

  const handleSelect = useCallback(
    (value: { start: string; end: string }) => {
      onSelect(value.start, value.end)

      bottomSheetModalRef.current?.dismiss()
    },
    [onSelect],
  )

  return (
    <Column>
      {CustomPickerButton ? (
        <CustomPickerButton title={title} value={value} onOpen={handleShow} />
      ) : (
        <IconButton icon={icons.calendar} onPress={handleShow} />
      )}

      <CustomBottomModalSheet innerRef={bottomSheetModalRef} snapPoints={snapPoints}>
        <FilterPeriodList
          onSelect={handleSelect}
          periodData={period.filter}
          initialPeriod={initValue}
          calendarContainerHeight={CALENDAR_HEIGHT}
          hidePeriodButtons={hidePeriodButtons}
        />
      </CustomBottomModalSheet>
    </Column>
  )
})
