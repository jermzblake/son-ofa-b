import React, { FunctionComponent } from 'react'
import { Modal } from 'components/core/modal'
import { Instructions } from './Instructions'

interface InstructionModalProps {
  show: boolean
  setShow: Function
}

export const InstructionModal: FunctionComponent<InstructionModalProps> = ({ show, setShow }) => {
  return (
    <Modal show={show} title="Instructions" dialogWidth="xl" onClose={() => setShow(false)} showCancel>
      <Instructions />
    </Modal>
  )
}
