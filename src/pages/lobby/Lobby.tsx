import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useLobby } from './hooks/useLobby'
import { PlayerList } from 'components/page/players/PlayerList'
import { MessagePane } from 'components/page/messages/MessagePane'
import { GameSelector } from 'components/page/game-manager/GameSelector'
import { CreateGameModal } from 'components/page/game-manager/CreateGameModal'
import { useCreateGame } from 'components/page/game-manager/hooks/useCreateGame'
import { InstructionModal } from 'components/page/instructions/InstructionModal'

const LeftPanel = styled(Box)`
  && {
    height: 100%;
    width: 20%;
    max-width: 16.5em;
    align-self: flex-start;
    overflow-x: hidden;
    background-color: ${props => props.theme.colors.third};
    padding: 1em;
    text-overflow: ellipsis;
  }
`

const Lobby: FunctionComponent = () => {
  const {
    users,
    selectUser,
    sendMessage,
    selectedUser,
    currentGames,
    backendUser,
    showInstructions,
    setShowInstructions
  } = useLobby()
  const { showCreateGame, setShowCreateGame } = useCreateGame()

  return (
    <MainContainer title="Lobby">
      <LeftPanel>
        {users &&
          users?.map((user, index) => {
            return (
              <Box onClick={() => selectUser(user)} style={{ cursor: 'pointer' }} key={index + user.userId}>
                <PlayerList user={user} selected={selectedUser} />
              </Box>
            )
          })}
      </LeftPanel>
      <Box width="100%">
        <Typography variant="h3">
          <Box ml="0.5em">Lobby</Box>
        </Typography>
        <Box pt="5em" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <GameSelector
            currentGames={currentGames}
            setShowCreateGame={setShowCreateGame}
            setShowInstructions={setShowInstructions}
          />
          {selectedUser && (
            <Box maxWidth="30em" mt="2em">
              <MessagePane user={selectedUser} sendMessage={sendMessage} />
            </Box>
          )}
        </Box>
      </Box>
      <CreateGameModal
        showCreateGame={showCreateGame}
        setShowCreateGame={setShowCreateGame}
        backendUser={backendUser}
      />
      <InstructionModal show={showInstructions} setShow={setShowInstructions} />
    </MainContainer>
  )
}

export default Lobby
