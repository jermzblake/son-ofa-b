import React, { FunctionComponent } from 'react'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { MainContainer } from 'components/page/containers/MainContainer'
import { useGame } from './hooks/useGame'


const GameRoom: FunctionComponent = () => {
  const { currentGame, setCurrentGame, users, messages } = useGame()

  return (
    <MainContainer title='Game Room'>
      <Box><Typography variant='h1'>GAME ROOM {currentGame?.id}</Typography></Box>
    </MainContainer>
  )
}

export default GameRoom