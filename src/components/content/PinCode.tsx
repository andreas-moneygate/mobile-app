import icons from 'assets/icons'
import { ActionButtonPinCode } from 'components/elements/ActionButtonPinCode'
import { Column } from 'components/layout/Column'
import { memo, useCallback } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'

const values = [
  { value: 1, type: 'button' },
  { value: 2, type: 'button' },
  { value: 3, type: 'button' },
  { value: 4, type: 'button' },
  { value: 5, type: 'button' },
  { value: 6, type: 'button' },
  { value: 7, type: 'button' },
  { value: 8, type: 'button' },
  { value: 9, type: 'button' },
  { icon: icons.faceID, type: 'faceID' },
  { value: 0, type: 'button' },
  { icon: icons.iconDelete, type: 'delete' },
]

interface PinCodeProps {
  code: string
  setCode: any
  onHandleFaceID?: any
}

export const PinCode = memo(({ code, setCode, onHandleFaceID }: PinCodeProps) => {
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Column key={index} m="s">
        <ActionButtonPinCode
          item={item}
          code={code}
          setCode={setCode}
          onHandleFaceID={onHandleFaceID}
        />
      </Column>
    ),
    [code, setCode, onHandleFaceID],
  )

  return <List data={values} renderItem={renderItem} numColumns={3} scrollEnabled={false} />
})

const List = styled(FlatList).attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))``
