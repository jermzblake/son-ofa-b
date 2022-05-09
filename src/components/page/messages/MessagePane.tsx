import React, { FunctionComponent, useState } from 'react'
import { Box, Typography, Divider, TextField, Button } from '@material-ui/core'
import styled from 'styled-components'
import { User } from 'common/types'
import { useTheme } from 'styled-components'
import { StatusIcon } from 'components/core/status-icon'

const MessagesWrapper = styled(Box)`
  color: ${props => props.theme.colors.primary};
  background-color: white;
  border-radius: 5px;
  flex-direction: column;
  overflow-y: hidden;
  && {
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  flex: 1 0 0px;
  margin: 0.5em 1em 0 1em;
`

const StyledMessageListBox = styled(Box)`
  background-color: ${props => props.theme.colors.backgroundComplement} !important;
  color: ${props => props.theme.colors.primary};
  padding: 0.5em;
  max-height: 12em;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

interface MessagePanelProps {
  user: User
  sendMessage
}

export const MessagePane: FunctionComponent<MessagePanelProps> = ({ user, sendMessage }) => {
  const theme = useTheme()
  const [directMessage, setDirectMessage] = useState<string>()

  const handleChange = async e => {
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
      <StyledMessageListBox display="flex" flexDirection="column">
        {user?.messages &&
          user?.messages.map((message, i) => {
            return (
              <Box key={`${i}-${Math.floor(Math.random() * 10000000)}`}>
                <Box color={theme.colors.lightText}>
                  <Typography variant="caption">{message.fromSelf ? 'yourself' : user.username}</Typography>
                </Box>
                <Box>
                  <Typography>{message.content}</Typography>
                </Box>
              </Box>
            )
          })}
      </StyledMessageListBox>
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
              color="secondary"
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
