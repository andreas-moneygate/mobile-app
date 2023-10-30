import { Column } from 'components/layout/Column'
import { FavouriteTransactionList } from 'components/list/FavouriteTransactionList'
import { MoreActionsList } from 'components/list/MoreActionsList'
import { TransactionCategoriesList } from 'components/list/TransactionCategoriesList'
import { memo, useCallback } from 'react'

interface renderItemProps {
  operation: string
  onAction?: any
  onClose?: any
}

export const AccountOperationsList = memo((props: renderItemProps) => {
  const { operation, onAction, onClose } = props

  const renderItem = useCallback(
    type => {
      switch (type) {
        case 'Send money': {
          return (
            <Column>
              <FavouriteTransactionList onCloseModal={onClose} />
              <TransactionCategoriesList onNext={onAction} />
            </Column>
          )
        }
        case 'More': {
          return <MoreActionsList onNext={onAction} onCloseModal={onClose} />
        }
        default:
          return undefined
      }
    },
    [onAction, onClose],
  )

  return <Column>{renderItem(operation)}</Column>
})
