import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography } from '@material-ui/core'

const Home: FunctionComponent = () => {

  return (
    <MainContainer title='Welcome'>
      <Box>
        <Typography variant='h1' component='div'>Son Ofa B</Typography>
      </Box>
    </MainContainer>
  )
}

export default Home