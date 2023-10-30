import { useCallback, useState } from 'react'
import { FileData } from 'utils/files'

const useAndroidFileModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [file, setFile] = useState<FileData | null>(null)

  const showFileModal = useCallback((file: FileData) => {
    setFile(file)
    setIsModalVisible(true)
  }, [])

  const hideFileModal = useCallback(() => {
    setIsModalVisible(false)
  }, [])

  return { isModalVisible, file, showFileModal, hideFileModal }
}

export default useAndroidFileModal
