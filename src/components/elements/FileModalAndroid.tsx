import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Button } from 'components/buttons/Button'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { Body } from 'components/typography/Body'
import { useEffect } from 'react'
import { memo, useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { saveFileAndroid, shareFile } from 'utils/files'
import { I18N_NAMESPACES } from 'utils/i18n'

interface FileModalAndroidProps {
  show: boolean
  file: {
    fileName: string
    fileUriOrBase64: string
    isBase64?: boolean
    options?: any
  }
  onClose: () => void
}

export const FileModalAndroid = memo(({ show, file, onClose }: FileModalAndroidProps) => {
  const { t } = useTranslation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (show) {
      bottomSheetModalRef.current?.present()
    } else {
      bottomSheetModalRef.current?.dismiss()
    }
  })

  const snapPoints = useMemo(() => ['1%', 300], [])

  const handleSheetModalChanges = useCallback((i: number) => {
    if (i === 0) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])

  const handleShare = useCallback(async () => {
    await shareFile(file.fileUriOrBase64, {
      fileName: file.fileName,
      isBase64: file.isBase64,
      shareOptions: file.options,
    })
    onClose()
  }, [onClose, file])

  const handleDownload = useCallback(async () => {
    await saveFileAndroid(file.fileUriOrBase64, {
      fileName: file.fileName,
      isBase64: file.isBase64,
      mimeType: file.options?.mimeType,
    })
    onClose()
  }, [onClose, file])

  return Platform.OS === 'android' ? (
    <CustomBottomModalSheet
      innerRef={bottomSheetModalRef}
      onChange={handleSheetModalChanges}
      snapPoints={snapPoints}
    >
      <Column m="l">
        <Body fontWeight="600" textAlign="center" mh="xl" mt="l" mb="xl">
          {t(`${I18N_NAMESPACES.DASHBOARD_FLOW}::DOWNLOAD_FILE_MODAL_ANDROID`, {
            fileName: file?.fileName || 'File',
          })}
        </Body>

        <Button title={t('DOWNLOAD')} onPress={handleDownload} mt="s" />
        <Button title={t('SHARE')} type="light" onPress={handleShare} mt="l" />
      </Column>
    </CustomBottomModalSheet>
  ) : null
})
