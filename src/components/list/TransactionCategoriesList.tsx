import { TransactionCategoryCard } from 'components/card/TransactionCategoryCard'
import { Column } from 'components/layout/Column'
import { BodySmall } from 'components/typography/BodySmall'
import useTransactionCategories from 'hooks/useTransactionCategories'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/native'
import { I18N_NAMESPACES } from 'utils/i18n'

interface ListProps {
  onNext: (route: string) => void
}

export const TransactionCategoriesList = memo(({ onNext }: ListProps) => {
  const { t } = useTranslation(I18N_NAMESPACES.DASHBOARD_FLOW)
  const transactionCategories = useTransactionCategories()
  return (
    <Column mh="l" mt="l">
      <Title>{t('CATEGORIES')}</Title>
      {transactionCategories.map((category, index) => (
        <TransactionCategoryCard
          {...category}
          mt={index !== 0 ? 's' : 'l'}
          key={index}
          onPress={onNext}
        />
      ))}
    </Column>
  )
})

const Title = styled(BodySmall)`
  font-weight: 600;
`
