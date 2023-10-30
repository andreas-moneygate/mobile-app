import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import icons from 'assets/icons'
import {
  AccountHeader,
  AccountPicker,
  BodySmall,
  Caption,
  Column,
  Container,
  ErrorMessage,
  IconButton,
  MedBackground,
  Modal,
  Row,
  Title,
} from 'components'
import config from 'config'
import * as UploadFile from 'expo-document-picker'
import * as FileSystem from 'expo-file-system'
import useClients from 'hooks/useClients'
import useErrorHandler from 'hooks/useErrorModal'
import moment from 'moment'
import { memo, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Platform } from 'react-native'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import colors from 'theme/colors'
import { MappedAccount } from 'types/mapped/account'
import { uploadBulkFile } from 'utils/apiQueries/transaction'
import { formatCurrentDate } from 'utils/date'
import { saveFileAndroid, shareFile } from 'utils/files'
import { I18N_NAMESPACES } from 'utils/i18n'
import { filterPositiveAccounts } from 'utils/mappers'
import { renderIcon } from 'utils/ui'
import { v4 as uuid } from 'uuid'

function BulkFileUpload() {
  const { goBack, navigate } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.BulkFileUpload>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const { selectedClient } = useClients()
  const { error, showErrorModal, hideErrorModal } = useErrorHandler()
  const [isLoading, setIsLoading] = useState(false)

  const accounts = useMemo(() => filterPositiveAccounts(selectedClient?.accounts), [selectedClient])

  const [fromAccount, setFromAccount] = useState<MappedAccount>(
    params?.from?.accountNumber ? params.from : accounts[0],
  )

  const handleGetFileTemplate = useCallback(async () => {
    const fileName = 'bulkFileTemplate.csv'
    const downloadedFile = await FileSystem.downloadAsync(
      config.urls.bulkFileTemplate,
      FileSystem.documentDirectory + fileName,
    )

    if (downloadedFile.status === 200) {
      if (Platform.OS === 'android') {
        await saveFileAndroid(downloadedFile.uri, { fileName, mimeType: 'text/csv' })
      } else {
        await shareFile(downloadedFile.uri, { fileName, shareOptions: { mimeType: 'text/csv' } })
      }
    }
  }, [])

  const onCreate = useCallback(async () => {
    try {
      const result = await UploadFile.getDocumentAsync({
        type: ['text/csv', 'text/comma-separated-values'],
      })

      if (result.type === 'success') {
        setIsLoading(true)

        const base64 = await FileSystem.readAsStringAsync(result.uri, {
          encoding: FileSystem.EncodingType.Base64,
        })

        const data = await uploadBulkFile({
          fromAccountNumber: fromAccount?.accountNumber,
          currencyCode: fromAccount?.currency,
          executionDate: moment().format('YYYY-MM-DD'),
          requestIdentifier: uuid(),
          bulkTransferFile: base64,
        })

        navigate(ROUTES.BulkFilePayment, {
          transfer: { ...data, executionDate: formatCurrentDate(data.executionDate) },
          from: fromAccount,
        })
      }
    } catch (err) {
      if (err?.status === 422) {
        navigate(ROUTES.BulkFilePayment, {
          transfer: err?.payload,
          from: fromAccount,
        })
      } else {
        showErrorModal(err)
      }
    }
    setIsLoading(false)
  }, [fromAccount, navigate, showErrorModal])

  return (
    <>
      <Container safeBottom type="secondary" justifyContent="space-between">
        <Column>
          <MedBackground>
            <AccountHeader title={t('BULK_TRANSFER_FILE_UPLOAD')} onBack={goBack} />
          </MedBackground>

          {error ? <ErrorMessage errorMessage={error} onClose={hideErrorModal} /> : null}

          <Column m="l">
            <BodySmall fontWeight="600" mb="m">
              {t('FROM_ACCOUNT')}
            </BodySmall>
            <AccountPicker
              accounts={accounts}
              initialAccount={fromAccount}
              onSelect={setFromAccount}
            />
          </Column>
        </Column>

        <Column>
          <Row justifyContent="center" mb="m">
            {renderIcon(icons.shiftedFile)}
          </Row>
          <Title textAlign="center">{t('UPLOAD_BULK_FILE')}</Title>
          <BodySmall textAlign="center" m="l">
            {t('UPLOAD_BULK_FILE_DESCRIPTION')}
          </BodySmall>
          <IconButton icon={renderIcon(icons.largePlus)} onPress={onCreate} />
        </Column>

        <Column m="l">
          <Row mv="xs" alignItems="center">
            <Circle>{renderIcon(icons.check, { color: colors.gray85 })}</Circle>
            <Caption color="darkGray" ml="s">
              {t('UPLOAD_BULK_FILE_NOTE1').split('{{link}}')[0]}
            </Caption>
            <Caption color="pumpkin" onPress={handleGetFileTemplate}>
              {t(`${I18N_NAMESPACES.COMMON}::LINK`).toLocaleLowerCase()}
            </Caption>
            <Caption color="darkGray"> {t('UPLOAD_BULK_FILE_NOTE1').split('{{link}}')[1]}</Caption>
          </Row>
          <Row mv="xs" alignItems="center">
            <Circle>{renderIcon(icons.check, { color: colors.gray85 })}</Circle>
            <Caption color="darkGray" ml="s">
              {t('UPLOAD_BULK_FILE_NOTE2')}
            </Caption>
          </Row>
        </Column>
      </Container>
      <Modal show={isLoading} onClose={() => setIsLoading(false)}>
        <Column bg="white" justifyContent="center" alignItems="center" p="xxl" br={10}>
          <ActivityIndicator size="large" color={colors.pumpkin} />
          <BodySmall color="darkGray" mt="s">
            {t('FILE_UPLOADING')}
          </BodySmall>
        </Column>
      </Modal>
    </>
  )
}

const Circle = styled(Column)`
  border: ${({ theme }) => theme.colors.gray85} 1px solid;
  border-radius: 50px;
  padding: 2px;
`

export default memo(BulkFileUpload)
