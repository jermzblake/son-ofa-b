import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography } from '@material-ui/core'



const Lobby: FunctionComponent = () => {

  return (
    <MainContainer title='Lobby'>
      <Typography>Lobby</Typography>
    </MainContainer>
  )
}

export default Lobby