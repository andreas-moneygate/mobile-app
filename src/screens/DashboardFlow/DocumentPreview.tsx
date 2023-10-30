import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import { BodySmall, Button, Column, Container, IconButton, Row } from 'components'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PDFReader from 'rn-pdf-reader-js'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import colors from 'theme/colors'
import { getEncodedFilePath, saveFileAndroid, shareFile } from 'utils/files'
import { I18N_NAMESPACES } from 'utils/i18n'
import styled from 'styled-components/native'
import { renderIcon } from 'utils/ui'

function DocumentPreview() {
  const { goBack } =
    useNavigation<NavigationProp<MoneyTransferStackParamList & DashboardStackParamList>>()
  const { params } = useRoute<RouteProp<DashboardStackParamList, ROUTES.DocumentPreview>>()
  const insets = useSafeAreaInsets()
  const { t } = useTranslation()
  const { file, fileName } = params

  const [fileUri, setFileUri] = useState('')

  const getFileUri = useCallback(async () => {
    const fileUri = await getEncodedFilePath(file, { fileName })
    setFileUri(fileUri)
  }, [file, fileName])

  useEffect(() => {
    getFileUri()
  }, [getFileUri])

  const handleShare = useCallback(async () => {
    await shareFile(file, {
      fileName,
      isBase64: true,
    })
  }, [file, fileName])

  const handleDownload = useCallback(async () => {
    await saveFileAndroid(file, {
      fileName,
      isBase64: true,
    })
  }, [file, fileName])

  const pdfSource = useMemo(
    () => ({
      uri: fileUri,
    }),
    [fileUri],
  )

  return (
    <Container type="transparent" safeTop>
      <Header justifyContent="space-between">
        <IconButton icon={renderIcon(icons.arrowLeft, { color: 'white' })} onPress={goBack} />
        <BodySmall color="white" width="100%">
          {t('STATEMENT')}
        </BodySmall>
        <IconButton icon={renderIcon(icons.share, { color: 'white' })} onPress={handleShare} />
      </Header>
      <Column flex={1} justifyContent="space-between" alignItems="center">
        <Column flex={1} width="100%" bg="lightGray">
          {fileUri ? (
            <PDFReader
              source={pdfSource}
              webviewProps={webViewProps}
              customStyle={androidPdfReaderStyle}
              withScroll
              withPinchZoom
            />
          ) : null}
        </Column>
      </Column>
    </Container>
  )
}

const webViewProps = {
  style: {
    backgroundColor: colors.lightGray,
  },

  containerStyle: Platform.select({
    ios: {
      paddingHorizontal: 30,
    },
    android: undefined,
  }),

  contentInset: { top: 20 },
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  bounces: false,

  renderLoading: () => (
    <Column height="100%" justifyContent="flex-start" pt="l">
      <ActivityIndicator size="large" color={colors.pumpkin} />
    </Column>
  ),
}

const androidPdfReaderStyle = {
  readerContainer: {
    backgroundColor: colors.lightGray,
    padding: 20,
  },
  readerContainerDocument: {
    margin: 0,
    padding: 0,
  },
  readerContainerZoomContainerButton: { display: 'none' },
}

const Header = styled(Row)`
  padding: 11px 15px;
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.3);
`

export default memo(DocumentPreview)