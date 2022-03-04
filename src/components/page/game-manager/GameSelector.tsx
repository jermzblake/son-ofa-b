import React, { FunctionComponent } from 'react'
import  { Box, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Game } from 'common/types'
import { useNavigate } from 'react-router-dom'

const GameList = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
  }
`

export interface GameSelectorProps {
  currentGames: Game[]
  setShowCreateGame: Function
}

export const GameSelector: FunctionComponent<GameSelectorProps> = ({ currentGames, setShowCreateGame }) => {
  const navigate = useNavigate()
  
  return (
    <Box>
      <Typography variant="h5"><Box>Select Game</Box></Typography>
      <Typography variant='caption'><Box>Join an open game or create a new game</Box></Typography>
      {currentGames && currentGames.length > 0  && (
        <GameList>
          {currentGames.map((game, index) => {
            return (
              <Box key={game.id + index} onClick={() => ''}>
                <Typography component='span'><Box>{game.name} - {game.playerCount}</Box></Typography>
                <Button color="secondary" onClick={() => navigate(`/game/${game.id}`)}>Join Game</Button>
              </Box>
            )
          })}
        </GameList>
      )}
      <Button onClick={() => setShowCreateGame(true)}>Create Game</Button>
    </Box>
  )
}