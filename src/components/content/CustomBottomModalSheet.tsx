import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { CustomBackdropModal } from 'components/elements/CustomBackdropModal'
import React, { memo, RefObject, useMemo } from 'react'
import { SharedValue } from 'react-native-reanimated'

interface BottomModalProps {
  index?: number
  onChange?: (index: number) => void
  children?: JSX.Element
  snapPoints?: Array<string | number> | SharedValue<Array<string | number>>
  enablePanDownToClose?: boolean
  innerRef: RefObject<BottomSheetModalMethods>
  animatedIndex?: SharedValue<number>
  animatedPosition?: SharedValue<number>
  backdropComponent?: React.FC<BottomSheetBackdropProps> | null | undefined
}

export const CustomBottomModalSheet = memo((props: BottomModalProps) => {
  const { children, index, snapPoints, onChange, innerRef, ...restProps } = props
  const defaultSnapPoints = useMemo(() => ['1%', 500], [])

  return (
    <BottomSheetModal
      ref={innerRef}
      index={index || 1}
      snapPoints={snapPoints || defaultSnapPoints}
      onChange={onChange}
      backgroundStyle={BGColor}
      handleIndicatorStyle={indicatorStyle}
      backdropComponent={CustomBackdropModal}
      enablePanDownToClose
      {...restProps}
    >
      {children}
    </BottomSheetModal>
  )
})

const BGColor = { backgroundColor: 'white' }
const indicatorStyle = { backgroundColor: '#C4C4C4', width: 39, height: 3 }
