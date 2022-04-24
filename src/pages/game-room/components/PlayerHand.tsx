import React, { FunctionComponent } from 'react'
import { Box } from '@material-ui/core'
import { Game, Player, PlayingCard } from 'common/types'
import { GameCard } from './GameCard'
import { PlayerInfoBar } from './PlayerInfoBar'

interface PlayerHandProps {
  player: Player
  game: Game
  handleCardSelect: Function
  selectedCard: PlayingCard
}

export const PlayerHand: FunctionComponent<PlayerHandProps> = ({ player, game, selectedCard, handleCardSelect }) => {

  return (
    <>
      <Box maxWidth='100%' >
        {player && game?.enabled && <PlayerInfoBar player={player} />}
        <Box display='grid' gridTemplateColumns='repeat(10, 90px)'>
          {player &&
            player.hand?.map((card, idx) => {
              return (
                <Box key={idx}>
                  <GameCard playingCard={card} selectable={player?.turn && (player.bid != null)} handleSelect={handleCardSelect} selectedCard={card.suit == selectedCard?.suit && card.value == selectedCard?.value} />
                </Box>
              )
            })}
        </Box>
      </Box>
    </>
  )
}
