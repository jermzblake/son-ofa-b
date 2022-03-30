import React, { FunctionComponent } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Game, Player } from 'common/types'
import { GameCard } from './GameCard'
import { PlayerHUD } from './PlayerHUD'

interface GameBoardProps {
  game: Game
  backendPlayer: Player
  bidsIn: boolean
}

const StyledGameCardWrapper = styled(Box)`
  width: 8em;
  border: 1px solid yellow;
`

export const GameBoard: FunctionComponent<GameBoardProps> = ({ game, backendPlayer, bidsIn }) => {

  return (
    <Box  >
      {/* give gameCard a border or some sort of highlight */}
      <Box>
      {game?.gameCard && (
        <StyledGameCardWrapper>
          <GameCard playingCard={game?.gameCard} />
        </StyledGameCardWrapper>
      )}
      </Box>
      <Box>
      <PlayerHUD player={backendPlayer} game={game} bidsIn={bidsIn} />
      </Box>

    </Box>
  )
}