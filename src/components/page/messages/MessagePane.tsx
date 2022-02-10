import React, { FunctionComponent, useState } from 'react'
import { Box, Typography, Divider, TextField, Button } from '@material-ui/core'
import styled from 'styled-components'
import { User } from 'common/types'
import { useTheme } from 'styled-components'
import { StatusIcon } from 'components/core/status-icon'

const MessagesWrapper = styled(Box)`
  && {
    position: fixed;
    bottom: 0;
    right: 1.5em;
    color: ${props => props.theme.colors.primary};
    background-color: white;
    width: 24em;
    border-radius: 5px;
    margin-top: 1em;
  }
`

interface MessagePanelProps {
  user: User
  sendMessage
}

export const MessagePane: FunctionComponent<MessagePanelProps> = ({ user, sendMessage }) => {
  const theme = useTheme()
  const [directMessage, setDirectMessage] = useState<string>()

  const handleChange = async (e) => {
    e.preventDefault()
    setDirectMessage(e.target.value)
  }

  const isValid = () => {
    return directMessage?.length > 0
  }

  return (
    <MessagesWrapper>
      <Box padding="0 2em 0">
        <Typography variant="h4">
          <StatusIcon connected={user.connected} />
          {user.username} Messages
        </Typography>
      </Box>
      <Divider />
      <Box display="flex" flexDirection="column">
        {user?.messages &&
          user?.messages.map((message, i) => {
            return (
              <>
                <Box color={theme.colors.lightText} key={i}>
                  <Typography variant="caption">{message.fromSelf ? 'yourself' : user.username}</Typography>
                </Box>
                <Box>
                  <Typography>{message.content}</Typography>
                </Box>
              </>
            )
          })}
      </Box>
      <Divider />
      <Box>
        <form autoComplete="off" onSubmit={sendMessage}>
          <Box display="flex" flexDirection="column">
            <textarea value={directMessage} onChange={e => handleChange(e)} placeholder="Type message..." />
            <Button
              onClick={e => {
                sendMessage(e, directMessage)
                setDirectMessage('')
              }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isValid()}
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </MessagesWrapper>
  )
}