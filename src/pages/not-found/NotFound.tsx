import React, { FunctionComponent } from 'react'
import { Box, Typography, IconButton } from '@material-ui/core'
import { MainContainer } from 'components/page/containers/MainContainer'
import { useNavigate } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import styled from 'styled-components'

const StyledExitIcon = styled(ExitToAppIcon)`
  transform: scale(4);
`

export const NotFound: FunctionComponent = () => {
  const navigate = useNavigate()
  return (
    <MainContainer title="whoops...">
      <Box margin='0 auto'>
        <Typography variant='h1'>
          <Box>
            404
          </Box>
        </Typography>
        <Typography variant='h3'>
          <Box>
            Page Not Found
          </Box>
        </Typography>
        <Typography variant='h4'>
          <Box>
            Whoops! Looks like we've wandered a little too far.
          </Box>
        </Typography>
        <IconButton onClick={() => navigate(-1)}>
          <StyledExitIcon />
        </IconButton>
      </Box>
    </MainContainer>
  )
}