import React, { FunctionComponent, useState } from 'react'
import { Box, Typography, Divider, TextField, Button } from '@material-ui/core'
import styled from 'styled-components'
import { User } from 'common/types'
import { useTheme } from 'styled-components'
import { StatusIcon } from 'components/core/status-icon'

const MessagesWrapper = styled(Box)`
  && {
    /* position: fixed;
    bottom: 0; */
    color: ${props => props.theme.colors.primary};
    background-color: white;
    /* width: 60%; */
    border-radius: 5px;
    margin-top: 1em;
  }
`

interface MessagePanelProps {
  user?: User
  sendMessage
}

export const MessagePane: FunctionComponent<MessagePanelProps> = ({ user, sendMessage }) => {
  const theme = useTheme()
  const [message, setMessage] = useState<string>()

  const handleChange = async (e) => {
    e.preventDefault()
    setMessage(e.target.value)
  }

  const isValid = () => {
    return message?.length > 0
  }

  return (
    <MessagesWrapper>
      <Box padding='0 2em 0'>
        <Typography variant='h4'><StatusIcon connected={user.connected} />{user.username} Messages</Typography>
      </Box>
      <Divider />
      <Box display='flex' flexDirection='column'>
        <Box color={theme.colors.lightText} ><Typography variant='caption'>Sender's name will go here</Typography></Box>
        <Box>messages will go here with sender's name above</Box>
      </Box>
      <Divider />
      <Box>
        <form autoComplete='off' onSubmit={sendMessage}>
          <TextField label='Send message' onChange={e => handleChange(e)} placeholder='Type message...' />
          <Button onClick={(e) => {sendMessage(e, message); setMessage('')}} type='submit' variant='contained' color="primary" disabled={!isValid()}>Send</Button>
        </form>
      </Box>
    </MessagesWrapper>
  )
}