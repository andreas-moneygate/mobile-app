import { NavigationProp, useNavigation } from '@react-navigation/native'
import {
  AccountHeader,
  Column,
  Container,
  KeyboardAvoidingView,
  MedBackground,
  ScrollView,
  SearchInput,
  TransactionsList,
} from 'components'
import useTransactions from 'hooks/useTransactions'
import moment from 'moment'
import { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { MappedTransaction } from 'types/mapped/transactions'

const SEARCH_DELAY = 2 * 1000

function SearchTransaction() {
  const { t } = useTranslation()
  const { navigate, goBack } =
    useNavigation<NavigationProp<DashboardStackParamList & MoneyTransferStackParamList>>()
  const { changeTransactionFilters } = useTransactions()

  const [search, setSearch] = useState('')

  useEffect(() => {
    return resetSearch
  }, [])

  useEffect(() => {
    if (search) {
      const timer = setTimeout(() => {
        changeTransactionFilters({
          paymentDetails: search,
          date: {
            fromDate: moment().add(-1, 'year').format('YYYY-MM-DD'),
            toDate: moment().format('YYYY-MM-DD'),
          },
        })
      }, SEARCH_DELAY)
      return () => {
        clearTimeout(timer)
      }
    } else {
      changeTransactionFilters({ reset: true })
    }
  }, [search])

  const resetSearch = useCallback(() => {
    setSearch('')
  }, [])

  const handleSelectedTransaction = useCallback(
    (params: MappedTransaction) => {
      navigate(ROUTES.TransactionDetails, {
        accountNumber: params.transfer.accountNumber,
        transactionReference: params.transfer.reference,
        type: params.transfer.type,
        isFee: params.transfer.isFee,
        feeData: params.transfer.feeData,
      })
    },
    [navigate],
  )

  const handleGoBack = useCallback(() => {
    resetSearch()
    goBack()
  }, [])

  return (
    <Wrapper>
      <KeyboardAvoidingView>
        <MedBackground>
          <AccountHeader title={t('SEARCH')} onBack={handleGoBack} />
          <SearchInput
            value={search}
            onChangeText={setSearch}
            onReset={resetSearch}
            placeholder={t('SEARCH') as string}
            search
          />
        </MedBackground>

        <ScrollView ph="l" pt="l" bg="white">
          <Column pb={50}>
            <TransactionsList onSelected={handleSelectedTransaction} inSearch />
          </Column>
        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
  )
}

const Wrapper: any = Platform.select({
  ios: Fragment,
  android: Container,
})

export default memo(SearchTransaction)
