import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { AccountOperationsList } from 'components/list/AccountOperationsList'
import { OperationsList } from 'components/list/OperationsList'
import useClients from 'hooks/useClients'
import useOperations from 'hooks/useOperations'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { LayoutItemProps } from 'types/ui'
import { getClientsSummaryStatements } from 'utils/apiQueries/client'
import { I18N_NAMESPACES } from 'utils/i18n'

interface ActionOperationListProps {
  onProceed: (route: string) => void
  accounts: any
  accountBalance?: number
  showErrorModal?: (error: string) => void
}

export const OperationPicker = memo<LayoutItemProps & ActionOperationListProps>(props => {
  const { onProceed, accounts, accountBalance, showErrorModal } = props
  const { navigate } = useNavigation<NavigationProp<DashboardStackParamList>>()
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const operations = useOperations()
  const { selectedClient: client } = useClients()
  const [selectedOperation, setSelectedOperation] = useState('')

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const showModal = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetModalChanges = useCallback((index: number) => {
    if (index === 0) {
      bottomSheetModalRef.current?.dismiss()
    }
  }, [])

  const onCloseModal = useCallback(() => bottomSheetModalRef.current?.dismiss(), [])

  const onOpen = useCallback(
    title => {
      if (title === ROUTES.Exchange) {
        if (Number(accountBalance) <= 0) {
          showErrorModal?.(
            'Account balance is below 0. Please select different account for transaction',
          )
        } else {
          onProceed(ROUTES.Exchange)
        }
      } else {
        showModal()
      }
      setSelectedOperation(title)
    },
    [onProceed, showModal],
  )

  const handleGetClientStatement = useCallback(async () => {
    const clientStatement = await getClientsSummaryStatements(client.id)

    const fileName = `${t('CLIENTS_SUMMARY_STATEMENT_FILE_NAME')}_${client.title}`

    navigate(ROUTES.DocumentPreview, { fileName, file: clientStatement })
  }, [client.id, client.title, navigate, t])

  const onNext = useCallback(
    (route: string) => {
      if (route === ROUTES.ClientSummaryStatement) {
        handleGetClientStatement()
      } else {
        if (selectedOperation === t('SEND_MONEY')) {
          if (Number(accountBalance) <= 0) {
            showErrorModal?.(
              'Account balance is below 0. Please select different account for transaction',
            )
            return onCloseModal()
          }
        }
        onProceed(route)
      }
      onCloseModal()
    },
    [onCloseModal, handleGetClientStatement, onProceed, selectedOperation, accountBalance],
  )

  const renderSnapPoints = useMemo(() => {
    switch (selectedOperation) {
      case t('SEND_MONEY'): {
        return ['1%', 550]
      }
      default:
        return ['1%', 400]
    }
  }, [selectedOperation, t])

  return (
    <Column>
      <OperationsList data={operations} onOpen={onOpen} accounts={accounts} />
      <CustomBottomModalSheet
        snapPoints={renderSnapPoints}
        innerRef={bottomSheetModalRef}
        onChange={handleSheetModalChanges}
      >
        <AccountOperationsList
          operation={selectedOperation}
          onClose={onCloseModal}
          onAction={onNext}
        />
      </CustomBottomModalSheet>
    </Column>
  )
})
