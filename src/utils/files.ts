import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from 'expo-device'
import * as FS from 'expo-file-system'
import * as Share from 'expo-sharing'
import { Platform, ToastAndroid } from 'react-native'

export const PDF_SHARING_OPTIONS = { UTI: 'com.adobe.pdf', mimeType: 'application/pdf' }
const ANDROID_SAVING_FOLDER = Number(Device.osVersion) >= 11 ? 'Documents' : 'Download'

export const LARGE_PAYMENTS_FILE_TYPES = ['application/pdf', 'image/jpeg']

export const getFileInBase64 = async (fileUri: string) => {
  const base64 = await FS.readAsStringAsync(fileUri, {
    encoding: FS.EncodingType.Base64,
  })

  return base64
}
interface FileOptions {
  fileName?: string
  fileFormat?: string
  encoding?: FS.EncodingType | 'utf8' | 'base64'
}
export const getEncodedFilePath = async (encodedData: string, options: FileOptions = {}) => {
  const { fileName = 'NewFile', fileFormat = '.pdf', encoding = 'base64' } = options

  const fullFileName = fileName.replace(/ /g, '%20') + fileFormat
  const filePath = `${FS.documentDirectory}/${fullFileName}`

  await FS.writeAsStringAsync(filePath, encodedData, { encoding })

  return filePath
}

export interface FileData {
  fileUriOrBase64: string
  fileName: string
  isBase64: boolean
}

interface SaveFileOptions extends Partial<FileData> {
  mimeType?: string
}
export const saveFileAndroid = async (
  fileUriOrBase64: string,
  { isBase64 = false, fileName = 'mngtFile', mimeType = 'application/pdf' }: SaveFileOptions,
) => {
  const savingFolderUri = FS.StorageAccessFramework.getUriForDirectoryInRoot(ANDROID_SAVING_FOLDER)

  const hasStoragePermission = await AsyncStorage.getItem('@hasStoragePermission')
  if (!hasStoragePermission) {
    const permissions = await FS.StorageAccessFramework.requestDirectoryPermissionsAsync(
      savingFolderUri,
    )

    if (!permissions.granted) {
      ToastAndroid.show(`Permission denied`, ToastAndroid.SHORT)
      return
    }
    AsyncStorage.setItem('@hasStoragePermission', 'true')
  }

  try {
    const createdFileUri = await FS.StorageAccessFramework.createFileAsync(
      savingFolderUri,
      fileName,
      mimeType,
    )

    let base64Data = fileUriOrBase64
    if (!isBase64) {
      base64Data = await getFileInBase64(fileUriOrBase64)
    }

    await FS.StorageAccessFramework.writeAsStringAsync(createdFileUri, base64Data, {
      encoding: FS.EncodingType.Base64,
    })

    ToastAndroid.show(`File saved to ${ANDROID_SAVING_FOLDER}`, ToastAndroid.SHORT)
  } catch (err) {
    ToastAndroid.show(`Error while saving file`, ToastAndroid.SHORT)
    console.log(err)
  }
}

interface ShareFileOptions extends Partial<FileData> {
  shareOptions?: object
}
export const shareFile = async (
  fileUriOrBase64: string,
  { isBase64, fileName = 'mngtFile', shareOptions }: ShareFileOptions,
) => {
  try {
    let fileUri = fileUriOrBase64
    if (isBase64) {
      fileUri = await getEncodedFilePath(fileUriOrBase64, {
        fileName,
      })
    }

    await Share.shareAsync(fileUri, shareOptions || PDF_SHARING_OPTIONS)
  } catch (err) {
    console.log(err)
  }
}

export const checkFileSize = async (fileUri: string, limitInBytes?: number) => {
  const fileInfo = await FS.getInfoAsync(fileUri, { size: true })

  const limit = limitInBytes || 2000000 // in bytes

  return Number(fileInfo?.size) < limit
}

export const checkFileType = (fileName: string, permittedTypes?: Array<string>) => {
  const types = permittedTypes || ['pdf', 'jpg', 'jpeg']
  const fileType = fileName.split('.').pop() || ''

  return types.includes(fileType)
}
