import React, { FunctionComponent } from 'react'
import { Box, Fab } from '@material-ui/core'
import { MainContainer } from 'components/page/containers/MainContainer'
import { useGame } from './hooks/useGame'
import { PreGameModal } from './components/PreGameModal'
import { GameBoard } from './components/GameBoard'
import { GameMenu } from './components/GameMenu'
import { ChatBox } from 'components/page/messages/ChatBox'
import ChatIcon from '@material-ui/icons/Chat'
import styled from 'styled-components/macro'

const StyledChatIcon = styled(ChatIcon)`
  margin-right: 0.25em;
`

const StyledFab = styled(Fab)`
  && {
    position: fixed;
    right: 1em;
    bottom: 0.25em;
  }
`

const GameRoom: FunctionComponent = () => {
  const {
    currentGame,
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
    handleCardSelect,
    sendMessage,
    showChat,
    setShowChat
  } = useGame()

  return (
    <MainContainer title="Game Room">
      <Box position="relative" width="100%">
        <GameMenu game={currentGame} />
        <GameBoard
          game={currentGame}
          backendPlayer={backendPlayer}
          bidsIn={bidsIn}
          submitPlayerBid={submitPlayerBid}
          handleCardSelect={handleCardSelect}
          selectedCard={selectedCard}
        />
        <StyledFab
          color="secondary"
          variant="extended"
          aria-label="chat"
          onClick={() => setShowChat(true)}
          style={{ display: showChat ? 'none' : 'flex' }}
        >
          <StyledChatIcon />
          Chat
        </StyledFab>
        <ChatBox
          sendMessage={sendMessage}
          messages={messages}
          backendUser={backendPlayer?.gamertag}
          showChat={showChat}
          setShowChat={setShowChat}
        />
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
