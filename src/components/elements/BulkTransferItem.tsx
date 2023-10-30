import { Column } from 'components/layout/Column'
import { AccountPicker } from 'components/picker/AccountPicker'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback, useMemo } from 'react'
import { BulkFileTransfer } from 'types/api/transaction'
import { MappedAccount } from 'types/mapped/account'

import { BulkFileData } from './BulkFileData'

interface BulkTransferEntityProps {
  item: BulkFileTransfer['bulkTransfersDetails'][number]
  index: number
  fromAccount: MappedAccount
  onRemoveTransfer: (index: number) => void
}

const BulkTransferItem = ({
  item,
  fromAccount,
  index,
  onRemoveTransfer,
}: BulkTransferEntityProps) => {
  const errorsMessage = useMemo(
    () => (item.errors ? Object.values(item.errors).join(',\n') : ''),
    [item.errors],
  )

  const handleRemoveTransfer = useCallback(() => onRemoveTransfer(index), [index, onRemoveTransfer])

  return (
    <Column>
      <AccountPicker
        initialAccount={fromAccount}
        error={Boolean(item.errors)}
        onRemove={handleRemoveTransfer}
        disabled
      />

      {item.errors ? (
        <BodySmall color="darkRed" mt="s">
          {errorsMessage}
        </BodySmall>
      ) : null}

      <BulkFileData {...item} currency={fromAccount.currency} />
    </Column>
  )
}

export default memo(BulkTransferItem)
