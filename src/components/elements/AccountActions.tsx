import { AccountBalanceItem } from 'components/carousel/AccountBalanceItem'
import { SnapCarousel } from 'components/content/SnapCarousel'
import { AnimationOpacityWrapper } from 'components/layout/AnimationOpacityWrapper'
import { Column } from 'components/layout/Column'
import { OperationPicker } from 'components/picker/OperationPicker'
import { memo, useMemo } from 'react'
import { SharedValue } from 'react-native-reanimated'
import { MappedAccount } from 'types/mapped/account'
import { screenWidth } from 'utils/ui'

interface AccountActionsProps {
  scrollHeight: number
  scrollValue: SharedValue<number>
  selectedIndexAccount: number
  accountMappedData: Array<MappedAccount> | undefined
  selectedAccountBalance: number
  onProceed: (route: string) => void
  onSnapAccount: (index: number) => void
  showErrorModal: (error: unknown) => void
}

export const AccountActions = memo((props: AccountActionsProps) => {
  const {
    scrollHeight,
    scrollValue,
    selectedIndexAccount,
    accountMappedData,
    selectedAccountBalance,
    onProceed,
    onSnapAccount,
    showErrorModal,
  } = props

  const slideStyle = useMemo(
    () => ({ paddingRight: Number(accountMappedData?.length) < 2 ? 20 : 0 }),
    [accountMappedData?.length],
  )

  const sliderItemWidth = useMemo(
    () => (Number(accountMappedData?.length) < 2 ? screenWidth : screenWidth * 0.9),
    [accountMappedData?.length],
  )
  return (
    <Column height={scrollHeight}>
      <AnimationOpacityWrapper
        scrollValue={scrollValue}
        inputRange={animationInputRange}
        outputRange={animationOutputRange}
      >
        <>
          <Column mt="l">
            <SnapCarousel
              index={selectedIndexAccount}
              data={accountMappedData}
              renderItem={({ item }: any) => <AccountBalanceItem item={item} />}
              onSnap={onSnapAccount}
              itemWidth={sliderItemWidth}
              slideStyle={slideStyle}
            />
          </Column>
          <OperationPicker
            accounts={accountMappedData}
            accountBalance={selectedAccountBalance}
            onProceed={onProceed}
            showErrorModal={showErrorModal}
          />
        </>
      </AnimationOpacityWrapper>
    </Column>
  )
})

const animationInputRange = [0, 250]
const animationOutputRange = [1, 0]
