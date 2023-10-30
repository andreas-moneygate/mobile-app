import { IconButton } from 'components/buttons/IconButton'
import { TouchableOpacity } from 'components/buttons/TouchableOpacity'
import { Title } from 'components/typography/Title'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components/native'

interface ActionButtonPinCodeProps {
  item: any
  code: string
  setCode: (code: string) => void
  onHandleFaceID: () => void
}

export const ActionButtonPinCode = memo((props: ActionButtonPinCodeProps) => {
  const { item, code, setCode, onHandleFaceID } = props
  const { type, value } = item
  const updateCode = useMemo(() => code.toString() + value?.toString(), [code, value])
  const removeValue = useMemo(() => code.slice(0, -1), [code])

  const onUpdate = useCallback(() => setCode(updateCode), [setCode, updateCode])
  const onDelete = useCallback(() => setCode(removeValue), [setCode, removeValue])
  switch (type) {
    case 'button': {
      return (
        <NumberButton disabled={code.length === 4} onPress={onUpdate}>
          <Title>{item?.value}</Title>
        </NumberButton>
      )
    }
    case 'delete': {
      return <IconBtn disabled={code.length === 0} icon={item.icon} onPress={onDelete} />
    }
    default: {
      return <IconBtn icon={item.icon} onPress={onHandleFaceID} />
    }
  }
})

const NumberButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.lightGray};
  height: 70px;
  width: 70px;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
`

const IconBtn = styled(IconButton)`
  height: 70px;
  width: 70px;
  align-items: center;
  justify-content: center;
`
