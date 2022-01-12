import React, { FunctionComponent } from 'react'
import { User } from 'common/types'
import { StatusIcon } from 'components/core/status-icon'
import  { Box } from '@material-ui/core'
import styled from 'styled-components'
import { useTheme } from 'styled-components'

interface PlayerListProps {
  connected?: boolean
  user: User
  selected: User
}

const NewMessages = styled(Box)`
  && {
    color: white;
    background-color: red;
    width: 1.5em;
    border-radius: 5px;
    text-align: center;
    float: right;
    margin-top: 1em;
  }
`

export const PlayerList: FunctionComponent<PlayerListProps> = ({ connected, user, selected }) => {
  const theme = useTheme()

  return (
    <>
      <Box>{user.username}</Box>
      <Box display="flex">
        <Box color={theme.colors.lightText}><StatusIcon connected={user.connected} />{user.connected ? "online" : "offline"}</Box>
        {user.hasNewMessages && <NewMessages>!</NewMessages>}
      </Box>
    </>
  )
}