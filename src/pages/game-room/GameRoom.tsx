import React, { FunctionComponent } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { MainContainer } from 'components/page/containers/MainContainer'
import { useGame } from './hooks/useGame'
import { PreGameModal } from './components/PreGameModal'
import { GameBoard } from './components/GameBoard'

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
    submitPlayerBid
  } = useGame()

  return (
    <MainContainer title="Game Room">
      <Box>
        <Typography variant="h1">GAME ROOM</Typography>
      </Box>

      <GameBoard game={currentGame} backendPlayer={backendPlayer} bidsIn={bidsIn} submitPlayerBid={submitPlayerBid} />

      <PreGameModal
        readyPlayer={readyUp}
        showPreGame={showPreGame}
        setShowPreGame={setShowPreGame}
        players={currentGame?.players}
        backendPlayer={backendPlayer}
        startGame={startGame}
        checkPlayersAreReady={checkPlayersAreReady}
      />
    </MainContainer>
  )
}

export default GameRoom
