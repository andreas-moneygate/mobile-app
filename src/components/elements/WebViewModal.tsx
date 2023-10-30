import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { ActivityIndicator } from 'react-native'
import WebView from 'react-native-webview'
import colors from 'theme/colors'

interface WebViewModalProps {
  uri: string
  show: boolean
  snapPoints?: Array<string | number>
  onClose: () => void
}

export const WebViewModal = memo(({ show, uri, snapPoints, onClose }: WebViewModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (show) {
      bottomSheetModalRef.current?.present()
    } else {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [show])

  const webViewContent = useMemo(
    () => ({
      uri,
    }),
    [uri],
  )

  const defaultSnapPoints = useMemo(() => ['1%', '90%'], [])

  const handleChangeBottomModalSheet = useCallback(
    (index: number) => {
      if (index <= 0) {
        onClose()
      }
    },
    [onClose],
  )

  return (
    <CustomBottomModalSheet
      innerRef={bottomSheetModalRef}
      snapPoints={snapPoints || defaultSnapPoints}
      onChange={handleChangeBottomModalSheet}
    >
      <WebView
        source={webViewContent}
        nestedScrollEnabled={true}
        style={webViewStyle}
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator style={wevViewSpinnerStyle} color={colors.pumpkin} size="large" />
        )}
      />
    </CustomBottomModalSheet>
  )
})

const webViewStyle = { flex: 1 }
const wevViewSpinnerStyle = { position: 'absolute', top: '45%', left: '45%' }
