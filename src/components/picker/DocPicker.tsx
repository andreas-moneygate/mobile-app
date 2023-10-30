import { Button } from 'components/buttons/Button'
import * as DocumentPicker from 'expo-document-picker'
import React, { memo, useCallback } from 'react'

interface DocPickerProps {
  options?: DocumentPicker.DocumentPickerOptions
  onUpload: (img: any) => void
  closeModal: () => void
}

export const DocPicker = memo(({ options = {}, onUpload, closeModal }: DocPickerProps) => {
  const onSelect = useCallback(
    (file: any) => {
      closeModal && closeModal()
      onUpload(file)
    },
    [closeModal, onUpload],
  )

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync(options)
    if (result.type === 'success') {
      onSelect({ ...result })
    } else {
      console.log('Error document')
    }
  }
  return <Button onPress={openPicker} title="Choose from library" type="light" />
})
