import React, { FunctionComponent } from 'react'
import { Box, Button } from '@material-ui/core'
import { MessagePane } from 'components/page/messages/MessagePane'
import { User, MessageBoard } from 'common/types'
import styled from 'styled-components/macro'
import { useTheme } from 'styled-components'

const StyledChatBox = styled(Box)`
  && {
    position: fixed;
    bottom: 0.25em;
    right: 1em;
    border: 3px solid ${props => props.theme.colors.border};
    border-radius: 5px;
    z-index: 9;
    width: 18.75em;
    background-color: white;
  }
`

interface ChatBoxProps {
  user?: User
  sendMessage
  messages?: MessageBoard[]
  backendUser?: string
  showChat: boolean
  setShowChat: Function
  setNewMessage?: Function
}

export const ChatBox: FunctionComponent<ChatBoxProps> = ({
  user,
  sendMessage,
  messages,
  backendUser,
  showChat,
  setShowChat,
  setNewMessage
}) => {
  const theme = useTheme()

  return (
    <StyledChatBox display={showChat ? 'block' : 'none'}>
      <MessagePane inGame={true} sendMessage={sendMessage} messages={messages} backendUser={backendUser} />
      <Box style={{ margin: '0.5em' }}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            setShowChat(false)
            setNewMessage(false)
          }}
        >
          Close
        </Button>
      </Box>
    </StyledChatBox>
  )
}
