import React, { FunctionComponent, useState } from 'react'
import { Modal, ConfirmModal } from 'components/core/modal'
import { Box } from '@material-ui/core'
import styled from 'styled-components/macro'
import WarningIcon from '@material-ui/icons/Warning'

const YellowWarning = styled(WarningIcon)`
  color: orange;
  transform: scale(2);
`

interface CreateGameModalProps {
  showCreateGame: boolean
  setShowCreateGame: Function
}

export const CreateGameModal: FunctionComponent<CreateGameModalProps> =({ showCreateGame, setShowCreateGame}) => {
  const [confirmDiscard, setConfirmDiscard] = useState(false)

  return (
    <Modal
      showCancel
      show={showCreateGame}
      onClose={() => setConfirmDiscard(true)}
      title="Create Game"
      dialogWidth="lg"
    >
      <Box>
        Create Game Form
      </Box>
      <ConfirmModal 
        title='DISCARD'
        open={confirmDiscard}
        onClose={() => setConfirmDiscard(false)}
        onConfirm={() => {
          setShowCreateGame(false)
        }}
        message="Are you sure you want to close?"
        icon={<YellowWarning />}
      />
    </Modal>
  )
}