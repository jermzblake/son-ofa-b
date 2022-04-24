import React, { FunctionComponent, useState } from 'react'
import { Box, Button, MenuItem, Select, makeStyles, Typography } from '@material-ui/core'
import { Game, Player, PlayingCard } from 'common/types'
import { GameCard } from './GameCard'
import { useTheme } from 'styled-components'
import { PlayerInfoBar } from './PlayerInfoBar'

interface PlayerHUDProps {
  player: Player
  game: Game
  bidsIn: boolean
  submitPlayerBid: Function
  handleCardSelect: Function
  selectedCard: PlayingCard
}

export const PlayerHUD: FunctionComponent<PlayerHUDProps> = ({ player, game, bidsIn, submitPlayerBid, selectedCard, handleCardSelect }) => {
  const theme = useTheme()

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
