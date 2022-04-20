import React, { FunctionComponent } from 'react'
import { Box, Button, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Game, Player, PlayingCard } from 'common/types'
import { GameCard } from './GameCard'
import { PlayerHUD } from './PlayerHUD'
import { PlayerInfoBar } from './PlayerInfoBar'

interface GameBoardProps {
  game: Game
  backendPlayer: Player
  bidsIn: boolean
  submitPlayerBid: Function
  handleCardSelect: Function
  selectedCard: PlayingCard
}

const StyledGameCardWrapper = styled(Box)`
  width: 5.2em;
  border: 1px solid ${props => props.theme.colors.third};
  background-color: ${props => props.theme.colors.third};
`

export const GameBoard: FunctionComponent<GameBoardProps> = ({ game, backendPlayer, bidsIn, submitPlayerBid, handleCardSelect, selectedCard }) => {

  return (
    <Box  width="100%">
      <Box width="100%" display="flex" flexDirection='column'>
        <Box display='flex'>
        {game?.enabled && backendPlayer && (
          game?.players?.map((player, idx) => {
            if (player.id !== backendPlayer.id) {
              // TODO depending on players length render the items differently.
              // idx 2 and 3 can both be middle
              // Use grid
              return (
                <PlayerInfoBar player={player} key={idx + player.id} />
              )
            }
          })
        )}
        </Box>
        <Box display='flex'>
        {bidsIn && (
          game?.pile?.map((card, idx) => {
            /** 
             * TODO: need to turn this into a grid layout 
             * columns will be based on game.players length
             * ? how can i tie this to the player that played the card?
             * */ 
            return (
              <GameCard playingCard={card} key={idx} />
            )
          })
        )}
        </Box>
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
      <PlayerHUD player={backendPlayer} game={game} bidsIn={bidsIn} submitPlayerBid={submitPlayerBid} selectedCard={selectedCard} handleCardSelect={handleCardSelect} />
      </Box>

    </Box>
  )
}