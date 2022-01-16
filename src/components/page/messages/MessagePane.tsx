import React, { FunctionComponent } from 'react'
import { MainContainer } from 'components/page/containers/MainContainer'
import { Box, Typography, Divider } from '@material-ui/core'
import styled from 'styled-components'
import { User } from 'common/types'
import { useTheme } from 'styled-components'

const MessagesWrapper = styled(Box)`
  && {
    position: fixed;
    bottom: 0;
    color: ${props => props.theme.colors.primary};
    background-color: white;
    width: 60%;
    border-radius: 5px;
    margin-top: 1em;
  }
`

interface MessagePanelProps {
  user?: User

}

export const MessagePane: FunctionComponent<MessagePanelProps> = ({ user }) => {
  const theme = useTheme()

  return (
    <MessagesWrapper>
      <Box>
        <Typography variant='h4'>Messages</Typography>
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column'>
        <Box color={theme.colors.lightText} ><Typography variant='caption'>Sender's name will go here</Typography></Box>
        <Box>messages will go here with sender's name above</Box>
      </Box>
    </MessagesWrapper>
  )
}