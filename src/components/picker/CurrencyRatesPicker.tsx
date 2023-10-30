import { BottomSheetModal } from '@gorhom/bottom-sheet'
import icons from 'assets/icons'
import { IconButton } from 'components/buttons/IconButton'
import { CurrencyCard } from 'components/card/CurrencyCard'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { Row } from 'components/layout/Row'
import { CurrencyRatesList } from 'components/list/CurrencyRatesList'
import { BodySmall } from 'components/typography/BodySmall'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components/native'
import { Currency } from 'utils/currencies'

interface CurrencyPickerProps {
  data: Currency[] | undefined
  initialCurrency: Currency | undefined
  onSelect: (account: any) => void
  label?: string
  onHomeScreen?: boolean
}

export const CurrencyRatesPicker = memo((props: CurrencyPickerProps) => {
  const { data = [], initialCurrency, onSelect, label, onHomeScreen, ...restProps } = props
  const [index, setIndex] = useState(0)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const renderSnapPoints = useMemo(
    () => ['1%', Math.min(120 + data.length * 60, 700)],
    [data.length],
  )

  const onShow = useCallback(() => {
    bottomSheetModalRef.current?.present()
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

  return (
    <Column {...restProps}>
      {label ? (
        <Label mb="s" mh="l">
          {label}
        </Label>
      ) : null}
      {initialCurrency && !onHomeScreen ? (
        <CurrencyCard item={initialCurrency} onSelect={onShow} index={index} base />
      ) : null}
      {initialCurrency && onHomeScreen ? (
        <Row>
          <BodySmall color="white">Approx. balance: {initialCurrency.currency}</BodySmall>
          <IconButton icon={icons.chevronDown} onPress={onShow} />
        </Row>
      ) : null}
      <CustomBottomModalSheet
        index={index}
        innerRef={bottomSheetModalRef}
        onChange={handleSheetModalChanges}
        snapPoints={renderSnapPoints}
      >
        <CurrencyRatesList data={data} onSelect={onSelect} onCloseModal={onClose} hideRates />
      </CustomBottomModalSheet>
    </Column>
  )
})

const Label = styled(BodySmall)`
  font-weight: 600;
`
