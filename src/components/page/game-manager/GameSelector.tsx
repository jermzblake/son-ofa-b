import React, { FunctionComponent } from 'react'
import  { Box, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Game } from 'common/types'

const GameList = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
  }
`

export interface GameSelectorProps {
  currentGames: Game[]
}

export const GameSelector: FunctionComponent<GameSelectorProps> = ({ currentGames }) => {
  
  
  return (
    <Box>
      <Typography variant="h5"><Box>Select Game</Box></Typography>
      <Typography variant='caption'><Box>Join an open game or create a new game</Box></Typography>
      {currentGames && currentGames.length > 0  && (
        <GameList>
          {currentGames.map((game, index) => {
            return (
              <Box key={game.id + index} onClick={() => ''}>
                game.id
                <Button>Join Game</Button>
              </Box>
            )
          })}
        </GameList>
      )}
      <Button>Create Game</Button>
    </Box>
  )
}