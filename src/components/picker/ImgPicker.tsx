import { Button } from 'components/buttons/Button'
import * as FileSystem from 'expo-file-system'
import { FileInfo } from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import React, { memo, useCallback } from 'react'

interface ImgPickerProps {
  options?: ImagePicker.ImagePickerOptions
  onUpload: (img: any) => void
  closeModal: () => void
}

export const ImgPicker = memo((props: ImgPickerProps) => {
  const { options, onUpload, closeModal } = props
  const onSelect = useCallback(
    (file: any) => {
      onUpload(file)
      closeModal?.()
    },
    [closeModal, onUpload],
  )

  const onPermission = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permission.granted) {
      return openPicker()
    }
  }

  const openPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      ...options,
    })
    const { uri }: any = result
    const name = uri?.split('/').slice(-1)[0]
    const { size }: FileInfo = await FileSystem.getInfoAsync(uri)
    const file = { ...result, name, size }
    if (!result.cancelled) {
      onSelect({ ...file })
    }
  }
  return <Button onPress={onPermission} title="Choose from gallery" type="light" mt="s" />
})
