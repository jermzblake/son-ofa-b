import React, { FunctionComponent } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import { MainContainer } from 'components/page/containers/MainContainer'
import { useGame } from './hooks/useGame'
import { PreGameModal } from './components/PreGameModal'
import { GameBoard } from './components/GameBoard'
import { GameMenu } from './components/GameMenu'

const GameRoom: FunctionComponent = () => {
  const {
    currentGame,
    setCurrentGame,
    backendPlayer,
    messages,
    readyUp,
    showPreGame,
    setShowPreGame,
    startGame,
    checkPlayersAreReady,
    bidsIn,
    submitPlayerBid,
    selectedCard,
    handleCardSelect
  } = useGame()

  return (
    <MainContainer title="Game Room">
      <Box position="relative" width='100%'>
        <GameMenu game={currentGame} />
      <GameBoard game={currentGame} backendPlayer={backendPlayer} bidsIn={bidsIn} submitPlayerBid={submitPlayerBid} handleCardSelect={handleCardSelect} selectedCard={selectedCard} />

      <PreGameModal
        readyPlayer={readyUp}
        showPreGame={showPreGame}
        setShowPreGame={setShowPreGame}
        players={currentGame?.players}
        backendPlayer={backendPlayer}
        startGame={startGame}
        checkPlayersAreReady={checkPlayersAreReady}
      />
      </Box>
    </MainContainer>
  )
}

export default GameRoom
