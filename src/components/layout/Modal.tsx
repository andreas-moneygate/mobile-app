import { memo } from 'react'
import { Modal as RNModal } from 'react-native'

import { Column } from './Column'

interface ModalProps {
  show: boolean
  children: React.ReactNode
  onClose: () => void
}

export const Modal = memo(({ show, onClose, children }: ModalProps) => {
  return (
    <RNModal animationType="fade" transparent={true} visible={show} onRequestClose={onClose}>
      <Column
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        bg="darkTransparent"
      >
        {children}
      </Column>
    </RNModal>
  )
})
