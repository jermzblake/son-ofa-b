import React, { FunctionComponent } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Game, Player } from 'common/types'
import { GameCard } from './GameCard'
import { PlayerHUD } from './PlayerHUD'
import { Opponent } from './Opponent'

interface GameBoardProps {
  game: Game
  backendPlayer: Player
  bidsIn: boolean
  submitPlayerBid: Function
}

const StyledGameCardWrapper = styled(Box)`
  width: 5.2em;
  border: 1px solid yellow;
  background-color: yellow;
`

export const GameBoard: FunctionComponent<GameBoardProps> = ({ game, backendPlayer, bidsIn, submitPlayerBid }) => {

  return (
    <Box  width="100%">
      <Box width="100%" display="flex">
        {game?.enabled && backendPlayer && (
          game?.players?.map((player, idx) => {
            if (player.id !== backendPlayer.id) {
              // TODO depending on players length render the items differently.
              // idx 2 and 3 can both be middle
              // Use grid
              return (
                <Opponent player={player} key={idx + player.id} />
              )
            }
          })
        )}
      </Box>
      {/* give trumpSuit a border or some sort of highlight */}
      <Box>
      {game?.trumpSuit && (
        <StyledGameCardWrapper>
          <GameCard playingCard={game?.trumpSuit} trump />
        </StyledGameCardWrapper>
      )}
      </Box>
      <Box>
      <PlayerHUD player={backendPlayer} game={game} bidsIn={bidsIn} submitPlayerBid={submitPlayerBid} />
      </Box>

    </Box>
  )
}