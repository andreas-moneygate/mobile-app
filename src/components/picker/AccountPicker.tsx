import { BottomSheetModal } from '@gorhom/bottom-sheet'
import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { AccountPickerSection } from 'components/card/AccountPickerSection'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { AccountPickerList } from 'components/list/AccountPickerList'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'
import styled from 'styled-components/native'
import { MappedAccount } from 'types/mapped/account'
import { LayoutItemProps } from 'types/ui'
import { Account } from 'utils/currencies'
import { renderIcon } from 'utils/ui'

interface AccountPickerProps extends LayoutItemProps {
  accounts: Account[] | undefined
  initialAccount?: Account | null
  label?: string
  disabled?: boolean
  error?: boolean
  onSelect: (account: MappedAccount) => void
  onRemove?: () => void
  includesAllFilter?: boolean
}

export const AccountPicker = memo((props: AccountPickerProps) => {
  const {
    accounts = [],
    initialAccount,
    onSelect,
    label,
    disabled,
    error,
    onRemove,
    includesAllFilter,
    ...restProps
  } = props

  const { t } = useTranslation()
  const [index, setIndex] = useState(0)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const renderSnapPoints = useMemo(() => {
    const height = Math.min(100 + accounts.length * 60 + (includesAllFilter ? 60 : 0), 700)

    return ['1%', height]
  }, [accounts])

  const onShow = useCallback(() => {
    bottomSheetModalRef.current?.present()
    Keyboard.dismiss()
    setIndex(1)
  }, [setIndex])

  const handleSheetModalChanges = useCallback(
    (i: number) => {
      if (i < 1) {
        bottomSheetModalRef.current?.dismiss()
      }
      setIndex(i)
    },
    [setIndex],
  )

  const onClose = useCallback(() => bottomSheetModalRef.current?.dismiss(), [])

  const renderChevron = useMemo(
    () => renderIcon(index <= 0 ? icons.chevronDown : icons.chevronUp, { color: 'black' }),
    [index],
  )

  const renderPickerLayout = useMemo(() => {
    if (initialAccount) {
      return (
        <AccountPickerSection
          {...initialAccount}
          onPress={onShow}
          disabled={disabled}
          error={error}
          index={index}
          onRemove={onRemove}
        />
      )
    } else {
      return (
        <OutlineBtn onPress={onShow} pl="m" pr="xl">
          <TitleBtn numberOfLines={1}>{includesAllFilter ? t('ALL_ACCOUNTS') : t('SELECT_ACCOUNT')}</TitleBtn>
          {renderChevron}
        </OutlineBtn>
      )
    }
  }, [initialAccount, onShow, disabled, error, index, onRemove, t, renderChevron])

  return (
    <Column {...restProps}>
      {label && <Label mb="s">{label}</Label>}
      {renderPickerLayout}
      <CustomBottomModalSheet
        index={index}
        innerRef={bottomSheetModalRef}
        onChange={handleSheetModalChanges}
        snapPoints={renderSnapPoints}
      >
        <AccountPickerList accounts={accounts} onSelect={onSelect} onCloseModal={onClose} includesAllFilter={includesAllFilter} />
      </CustomBottomModalSheet>
    </Column>
  )
})

const Label = styled(BodySmall)`
  font-weight: 600;
`

const TitleBtn = styled(BodySmall)`
  margin-right: ${({ theme }) => theme.spacings.xs}px;
  color: ${({ theme }) => theme.colors.darkGray};
`

const OutlineBtn = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.mintCream};
  border-radius: 10px;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
`