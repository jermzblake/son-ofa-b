import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useLobby } from './hooks/useLobby'
import { PlayerList } from 'components/page/players/PlayerList'
import { useTheme } from 'styled-components'
import { MessagePane } from 'components/page/messages/MessagePane'

const LeftPanel = styled(Box)`
  && {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
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
  const { users, selectUser, sendMessage, selectedUser } = useLobby()
  const theme = useTheme()

   return (
    <MainContainer title='Lobby'>
      <Box width='100%' display='flex' justifyContent='center' alignItems='center'>
        <Typography variant='h3'>Lobby</Typography>
      </Box>
      <LeftPanel>
      {users && (
        users?.map((user, index) => {
          return (
            <Box onClick={() => selectUser(user)} style={{ cursor: 'pointer'}} key={index + user.userID} >
            <PlayerList user={user} selected={selectedUser} />
            </Box>
          )
        })
      )}
      </LeftPanel>
      {selectedUser && (
      <MessagePane user={selectedUser} sendMessage={sendMessage} />
      )}
    </MainContainer>
  )
}

export default Lobby