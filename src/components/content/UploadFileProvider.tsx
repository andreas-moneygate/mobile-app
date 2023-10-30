import { BottomSheetModal } from '@gorhom/bottom-sheet'
import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { DocPicker } from 'components/picker/DocPicker'
import { ImgPicker } from 'components/picker/ImgPicker'
import React, { memo, useCallback, useMemo, useRef } from 'react'
import { Keyboard } from 'react-native'

interface UploadFileProviderProps {
  onUpload: (img: any) => void
}

export const UploadFileProvider = memo((props: UploadFileProviderProps) => {
  const { onUpload } = props

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['1%', 200], [])
  const showPicker = useCallback(() => {
    Keyboard.dismiss()
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetModalChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])
  const closeModal = useCallback(() => bottomSheetModalRef.current?.dismiss(), [])

  return (
    <Column>
      <IconButton icon={icons.paperClip} onPress={showPicker} />
      <CustomBottomModalSheet
        innerRef={bottomSheetModalRef}
        onChange={handleSheetModalChanges}
        snapPoints={snapPoints}
      >
        <Column p="l">
          <DocPicker options={docOptions} onUpload={onUpload} closeModal={closeModal} />
          <ImgPicker options={imgOptions} onUpload={onUpload} closeModal={closeModal} />
        </Column>
      </CustomBottomModalSheet>
    </Column>
  )
})

const docOptions = {
  base46: true,
  type: ['application/pdf', 'image/jpeg'],
}

const imgOptions = {
  base64: true,
  mediaTypes: 'Images',
}
