import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { useLobby } from './hooks/useLobby'
import { PlayerList } from 'components/page/containers/players/PlayerList'
import { User } from 'common/types'

const LeftPanel = styled(Box)`
  && {
    position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 260px;
  overflow-x: hidden;
  background-color: #3f0e40;
  }
`


const Lobby: FunctionComponent = () => {
  const { users, selectUser, sendMessage, selectedUser } = useLobby()

   return (
    <MainContainer title='Lobby'>
      <Typography>Lobby</Typography>
      <LeftPanel>
      {users && (
        users?.map((user, index) => {
          return (
            <PlayerList user={user} selected={selectedUser} key={index + user.userID} />
          )
        })
      )}
      </LeftPanel>
    </MainContainer>
  )
}

export default Lobby