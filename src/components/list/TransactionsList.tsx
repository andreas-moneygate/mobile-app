import InViewPort from '@coffeebeanslabs/react-native-inviewport'
import { TransactionCard } from 'components/card/TransactionCard'
import { NoTransactions } from 'components/elements/NoTransactions'
import { Column } from 'components/layout/Column'
import { Caption } from 'components/typography/Caption'
import useTransactions from 'hooks/useTransactions'
import { memo, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import colors from 'theme/colors'
import { MappedTransaction } from 'types/mapped/transactions'

interface ListProps {
  selectedAccountNumber: string
  inSearch?: boolean
  onSelected: (transaction: MappedTransaction) => void
}

export const TransactionsList = memo(
  ({ selectedAccountNumber, inSearch, onSelected }: ListProps) => {
    const {
      transactions: data,
      loadMoreTransactions,
      transactionFilters,
      changeTransactionFilters,
      isLoading,
    } = useTransactions(selectedAccountNumber)

    const checkIsLastTransaction = useCallback(
      (isVisible: boolean) => {
        if (isVisible && !isLoading) {
          loadMoreTransactions()
        }
      },
      [isLoading, loadMoreTransactions],
    )

    return (
      <Column width="100%">
        {data.length ? (
          <>
            {data.map((item, groupIndex, { length: groupLength }) => (
              <Column width="100%" key={groupIndex}>
                <Caption color="midGray" textAlign="center" mt={groupIndex !== 0 ? 'm' : 0}>
                  {item.title}
                </Caption>
                {item.data.map((transaction, index, { length }) => (
                  <InViewPort
                    key={`${transaction.transfer.reference}-${index}`}
                    disabled={groupIndex === groupLength - 1 ? index !== length - 1 : true}
                    onChange={checkIsLastTransaction}
                  >
                    <TransactionCard
                      {...transaction.transfer}
                      mt="l"
                      transaction={transaction}
                      onOpen={onSelected}
                    />
                  </InViewPort>
                ))}
              </Column>
            ))}

            <Column height={30} mt="s">
              {isLoading ? <ActivityIndicator color={colors.pumpkin} size="large" /> : null}
            </Column>
          </>
        ) : (
          <NoTransactions
            transactionFilters={transactionFilters}
            changeTransactionFilters={changeTransactionFilters}
            isLoading={isLoading}
            inSearch={inSearch}
          />
        )}
      </Column>
    )
  },
)
