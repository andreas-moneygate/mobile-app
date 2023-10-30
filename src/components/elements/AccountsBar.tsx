import { NavigationProp, useNavigation } from '@react-navigation/native'
import { OpenAccountCard } from 'components/card/OpenAccountCard'
import { BalanceBar } from 'components/elements/BalanceBar'
import { AnimationOpacityWrapper } from 'components/layout/AnimationOpacityWrapper'
import { Column } from 'components/layout/Column'
import { AccountsList } from 'components/list/AccountsList'
import { OperationPicker } from 'components/picker/OperationPicker'
import useClients from 'hooks/useClients'
import useCurrencyRates from 'hooks/useCurrencyRates'
import { memo, useCallback } from 'react'
import { SharedValue } from 'react-native-reanimated'
import { DashboardStackParamList, MoneyTransferStackParamList } from 'routes/ParamsList'
import ROUTES from 'routes/RouteNames'
import { currencySymbols } from 'utils/currencies'
import { ACCOUNT_ACTION_BUTTONS_HEIGHT } from 'utils/parallax'

interface Props {
  balance?: number
  approximateCurrency: string
  visibleAllAccounts: boolean
  scrollValue: SharedValue<number>
  scrollHeight: number
  setApproximateCurrency: (currency: string) => void
  setVisibleAllAccounts: (isVisible: boolean) => void
}

export const AccountsBar = memo((props: Props) => {
  const {
    balance,
    approximateCurrency,
    visibleAllAccounts,
    scrollValue,
    scrollHeight,
    setApproximateCurrency,
    setVisibleAllAccounts,
  } = props

  const { navigate } =
    useNavigation<NavigationProp<DashboardStackParamList & MoneyTransferStackParamList>>()
  const { selectedClient } = useClients()
  const currencies = useCurrencyRates()

  const barHeight = selectedClient.accounts?.length ? scrollHeight : scrollHeight - 40 // find calc height

  const onSelected = useCallback(
    params => {
      delete params.fields
      navigate(ROUTES.Account, params)
      setVisibleAllAccounts(false)
    },
    [navigate, setVisibleAllAccounts],
  )

  const toggleShow = useCallback(
    () => setVisibleAllAccounts(!visibleAllAccounts),
    [setVisibleAllAccounts, visibleAllAccounts],
  )

  const onProceed = useCallback(
    route => {
      navigate(route, { from: {} })
    },
    [navigate],
  )

  return (
    <Column mh="l" height={barHeight}>
      {!selectedClient.accounts?.length ? (
        <OpenAccountCard />
      ) : (
        <AnimationOpacityWrapper
          scrollValue={scrollValue}
          inputRange={[0, 330]}
          outputRange={[1, 0]}
        >
          <>
            <BalanceBar
              balance={balance}
              currencySymbol={currencySymbols[approximateCurrency]}
              currency={approximateCurrency}
              setCurrency={setApproximateCurrency}
              currenciesToChoose={currencies}
              mv="m"
            />
            <AccountsList
              accounts={selectedClient.accounts}
              onSelected={onSelected}
              visibleAllAccounts={visibleAllAccounts}
              toggleShow={toggleShow}
            />
            <Column height={ACCOUNT_ACTION_BUTTONS_HEIGHT + 20} justifyContent="center">
              <OperationPicker accounts={selectedClient.accounts} onProceed={onProceed} />
            </Column>
          </>
        </AnimationOpacityWrapper>
      )}
    </Column>
  )
})
