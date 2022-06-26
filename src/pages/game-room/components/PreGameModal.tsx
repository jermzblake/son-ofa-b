import React, { FunctionComponent } from 'react'
import { Modal } from 'components/core/modal'
import { Player } from 'common/types'
import { PreGameMenu } from './PreGameMenu'

interface PreGameModalProps {
  showPreGame: boolean
  setShowPreGame: Function
  backendPlayer: Player
  readyPlayer: Function
  startGame: Function
  players: Player[]
  checkPlayersAreReady: Function
}

export const PreGameModal: FunctionComponent<PreGameModalProps> = ({
  showPreGame,
  setShowPreGame,
  backendPlayer,
  readyPlayer,
  startGame,
  players,
  checkPlayersAreReady
}) => {

  return (
    <Modal show={showPreGame} title="Game Menu" dialogWidth="lg">
      <PreGameMenu
        readyPlayer={readyPlayer}
        players={players}
        backendPlayer={backendPlayer}
        setShowPreGame={setShowPreGame}
        checkPlayersAreReady={checkPlayersAreReady}
        startGame={startGame}
      />
    </Modal>
  )
}
