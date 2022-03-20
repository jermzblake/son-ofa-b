import React, { FunctionComponent } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { User, Player } from 'common/types'
import { useTheme } from 'styled-components'

interface PreGameMenuProps {
  readyPlayer: Function
  players: Player[]
  backendPlayer: Player
  setShowPreGame: Function
  checkPlayersAreReady: Function
  startGame: Function
}

export const PreGameMenu: FunctionComponent<PreGameMenuProps> = ({ readyPlayer, players, backendPlayer, setShowPreGame, checkPlayersAreReady, startGame }) => {
  const theme = useTheme()

  // create a function that loops through all players and checks that they are all ready and the player.length === playerCount

  return (
    <Box display='flex' width='30em' flexDirection='column' justifyContent='center' alignItems='center'>
      <Typography>Ready up and let's go!</Typography>
      {players && (
      <Box display='flex' flexDirection='column' width='80%'>
        {players?.map((player, idx) => {
          return (
          <Box key={idx+player.id} display='flex' justifyContent='space-between'>
            <Typography>{player.gamertag}</Typography>
            <Typography><Box color={player.ready ? '#86bb71' : '#e38968'}>{player.ready ? "Ready!" : "Not Ready"}</Box></Typography>
          </Box>
          )
        })}
      </Box>
      )}
      <Box><Button onClick={() => readyPlayer()} disabled={backendPlayer?.ready}>Ready Up</Button></Box>
      <Box><Button onClick={() => {setShowPreGame(false); startGame()}} disabled={!checkPlayersAreReady()}>Start Game</Button></Box>
    </Box>
  )
}