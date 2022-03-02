import React, { FunctionComponent } from 'react'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { MainContainer } from 'components/page/containers/MainContainer'


const GameRoom: FunctionComponent = () => {

  return (
    <MainContainer title='Game Room'>
      <Box><Typography variant='h1'>GAME ROOM</Typography></Box>
    </MainContainer>
  )
}

export default GameRoom