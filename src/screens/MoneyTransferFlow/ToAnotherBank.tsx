import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  AccountHeader,
  BodySmall,
  Button,
  Caption,
  Column,
  Container,
  KeyboardAvoidingView,
  MedBackground,
  ScrollView,
  SearchInput,
  TransferHistoryCard,
} from 'components'
import useTransferHistory from 'hooks/useTransferHistory'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import styled from 'styled-components/native'
import { Transfer } from 'utils/currencies'
import { I18N_NAMESPACES } from 'utils/i18n'

function ToAnotherBank() {
  const { goBack, navigate } = useNavigation<NavigationProp<MoneyTransferStackParamList>>()
  const { params } = useRoute<RouteProp<MoneyTransferStackParamList, ROUTES.ToAnotherBank>>()
  const { t } = useTranslation(I18N_NAMESPACES.TRANSFER_FLOW)
  const transferHistoryData = useTransferHistory()
  const [iban, setIBAN] = useState('')

  const filteredData = useMemo(
    () =>
      transferHistoryData.filter(
        (transfer: Transfer) =>
          transfer.iban.toLowerCase().includes(iban.toLowerCase()) ||
          transfer.title.toLowerCase().includes(iban.toLowerCase()),
      ),
    [iban, transferHistoryData],
  )

  const onCreateTransfer = useCallback(
    recipientAccount => () =>
      navigate(ROUTES.CreatePayment, {
        from: params?.from,
        to: {
          ...recipientAccount,
          currency: params?.from?.currency,
        },
      }),
    [navigate, params],
  )

  const renderHeader = useMemo(() => <Title>Transfer history</Title>, [])

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <TransferHistoryCard {...item} inFavorites mt="l" onPress={onCreateTransfer(item)} />
    ),
    [onCreateTransfer],
  )

  const handleSearch = useCallback((text: any) => setIBAN(text), [])

  const onReset = useCallback(() => setIBAN(''), [])

  const onCreate = useCallback(() => {
    navigate(ROUTES.CreatePayment, {
      from: params?.from,
      to: {
        iban,
        currency: params?.from?.currency,
      },
    })
  }, [params, iban, navigate])

  useEffect(() => {
    if (filteredData.length == 0) {
      goBack()
      navigate(ROUTES.CreatePayment)
    }
  }, [])

  return (
    <Container safeBottom type="secondary">
      <KeyboardAvoidingView>
        <MedBackground>
          <AccountHeader title={t('TO_BANK_ACCOUNT')} onBack={goBack} />
        </MedBackground>
        <BodySmall fontWeight="600" mh="l" mt="xl">
          {t('REPEAT_TRANSACTION')}
        </BodySmall>
        <SearchInput
          placeholder={t(`${I18N_NAMESPACES.COMMON}::SEARCH`) as string}
          value={iban}
          onChangeText={handleSearch}
          onReset={onReset}
          outline
          search
        />
        <Wrapper>
          {filteredData.length > 0 ? (
            <List
              data={filteredData}
              renderItem={renderItem}
              ListHeaderComponent={renderHeader}
              keyExtractor={(item: any) => item.id}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <ScrollWrapper>
              <Caption color="darkGray" mt="l">
                No matching results found
              </Caption>
            </ScrollWrapper>
          )}
          <Button onPress={onCreate} title={t('CREATE_NEW_PAYMENT')} mh="l" mb="l" />
        </Wrapper>
      </KeyboardAvoidingView>
    </Container>
  )
}

const Wrapper = styled(Column)`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1px;
`

const List = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    padding: 20,
  },
}))``

const Title = styled(BodySmall)`
  font-weight: 600;
`

const ScrollWrapper = styled(ScrollView).attrs(() => ({
  contentContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingHorizontal: 20,
  },
}))``

export default memo(ToAnotherBank)
