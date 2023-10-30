import { BottomSheetModal } from '@gorhom/bottom-sheet'
import icons from 'assets/icons'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { ClientPickerSection } from 'components/card/ClientPickerSection'
import { CustomBottomModalSheet } from 'components/content/CustomBottomModalSheet'
import { Column } from 'components/layout/Column'
import { ClientsList } from 'components/list/ClientsList'
import { BodySmall } from 'components/typography/BodySmall'
import useClients from 'hooks/useClients'
import { memo, useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components/native'
import { MappedClient } from 'types/mapped/client'
import { SvgComponent } from 'types/ui'
import { renderIcon } from 'utils/ui'

interface DropdownProps {
  client: string | undefined
  icon: SvgComponent | undefined
  accountsLength: number | undefined
  onSelect: (client: MappedClient) => void
  outline?: boolean
}

export const ClientPicker = memo((props: DropdownProps) => {
  const { client = '', accountsLength = 0, icon, onSelect, outline = true } = props
  const { clients } = useClients()
  const [index, setIndex] = useState(0)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['1%', Math.min(100 + clients.length * 60, 700)], [clients])

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
    <Column width="100%">
      {outline ? (
        <OutlineBtn ph="l" onPress={onShow}>
          <TitleBtn numberOfLines={2}>{client}</TitleBtn>
          {renderIcon(index <= 0 ? icons.chevronDown : icons.chevronUp)}
        </OutlineBtn>
      ) : (
        <ClientPickerSection
          title={client}
          accountsLength={accountsLength}
          icon={icon}
          onPress={onShow}
          index={index}
        />
      )}
      <CustomBottomModalSheet
        index={index}
        innerRef={bottomSheetModalRef}
        onChange={handleSheetModalChanges}
        snapPoints={snapPoints}
      >
        <ClientsList onPress={onSelect} onCloseModal={onClose} />
      </CustomBottomModalSheet>
    </Column>
  )
})

const TitleBtn = styled(BodySmall)`
  margin-right: ${({ theme }) => theme.spacings.xs}px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  text-align: center;
`

const OutlineBtn = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white12};
  border-color: ${({ theme }) => theme.colors.white12};
  border-width: 1px;
  border-radius: 20px;
  width: 100%;
  min-width: 180px;
  min-height: 30px;
  align-items: center;
  justify-content: center;
`
