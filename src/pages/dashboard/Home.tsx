import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography } from '@material-ui/core'
import { SelectUsername } from './components/SelectUsername'
import { useLandingPage } from './hooks/useLandingPage'


const Home: FunctionComponent = () => {
  const { usernameSelected, setUsernameSelected, submitUsername, username, setUsername, isValid } = useLandingPage()
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
            usernameSelected={usernameSelected}
            setUsernameSelected={setUsernameSelected}
            submitUsername={submitUsername}
            username={username}
            setUsername={setUsername}
            isValid={isValid}
          />
        </Box>
      </Box>
    </MainContainer>
  )
}

export default Home