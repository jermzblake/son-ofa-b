import React, { FunctionComponent, useState } from 'react'
import { Modal, ConfirmModal } from 'components/core/modal'
import { Box } from '@material-ui/core'
import styled from 'styled-components/macro'
import WarningIcon from '@material-ui/icons/Warning'
import { CreateGame } from './CreateGame'
import { useCreateGame } from './hooks/useCreateGame'
import { User } from 'common/types'

const YellowWarning = styled(WarningIcon)`
  color: orange;
  transform: scale(2);
`

interface CreateGameModalProps {
  showCreateGame: boolean
  setShowCreateGame: Function
  backendUser: User
}

export const CreateGameModal: FunctionComponent<CreateGameModalProps> = ({ showCreateGame, setShowCreateGame, backendUser }) => {
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const { newGame, setNewGame, createNewGame, handleSelect } = useCreateGame()

  return (
    <Modal
      showCancel
      show={showCreateGame}
      onClose={() => setConfirmDiscard(true)}
      title="Create Game"
      dialogWidth="lg"
    >
      <Box>
        <CreateGame
          newGame={newGame}
          setNewGame={setNewGame}
          handleSelect={handleSelect}
          onSubmit={() => {createNewGame(backendUser); setShowCreateGame(false)}}
        />
      </Box>
      <ConfirmModal
        title="DISCARD"
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
