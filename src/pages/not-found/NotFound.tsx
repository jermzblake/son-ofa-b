import React, { FunctionComponent } from 'react'
import { Box, Typography, IconButton } from '@material-ui/core'
import { MainContainer } from 'components/page/containers/MainContainer'
import { useNavigate } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import styled from 'styled-components'
import { useTheme } from 'styled-components'

const StyledExitIcon = styled(ExitToAppIcon)`
  transform: scale(4);
  color: ${props => props.theme.colors.secondary};
  margin: 1em 0;
`

const StyledBox = styled(Box)`
  width: 110%;
  background-color: ${props => props.theme.colors.base};
  margin: -1em;
`

export const NotFound: FunctionComponent = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <MainContainer title="whoops...">
      <StyledBox display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Typography variant="h1" color="secondary">
          404
        </Typography>
        <Typography variant="h3">Page Not Found</Typography>
        <Typography variant="h5" gutterBottom>
          Whoops! Looks like we've wandered a little too far.
        </Typography>
        <Box display="flex">
          <IconButton onClick={() => navigate(-1)}>
            <StyledExitIcon />
          </IconButton>
        </Box>
        <Box position="fixed" bottom="0" right="3em" onClick={() => navigate('/')} color={theme.colors.third}>
          <Typography variant="body1">
            <em>Go Home</em>
          </Typography>
        </Box>
      </StyledBox>
    </MainContainer>
  )
}
