import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography } from '@material-ui/core'
import { SelectUsername } from './components/SelectUsername'
import { useLandingPage } from './hooks/useLandingPage'


const Home: FunctionComponent = () => {
  const { submitUsername, setUsername, isValid } = useLandingPage()
  return (
    <MainContainer title="Welcome">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Box>
          <Typography variant="h1" component="div">
            Son Ofa B
          </Typography>
        </Box>
        <Box>
          <SelectUsername
            submitUsername={submitUsername}
            setUsername={setUsername}
            isValid={isValid}
          />
        </Box>
      </Box>
    </MainContainer>
  )
}

export default Home