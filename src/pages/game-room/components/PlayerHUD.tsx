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

 const useStyles = makeStyles(() => ({
  select: {
    width: '4em',
    minWidth: '0px !important',
    // top: '45% !important',
    // left: '60% !important',
    // right: '0 !important'
  }
}))

export const PlayerHUD: FunctionComponent<PlayerHUDProps> = ({ player, game, bidsIn, submitPlayerBid, selectedCard, handleCardSelect }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [playerBid, setPlayerBid] = useState<number>()

  const possibleBids = (): number[] => {
    let bidArray = [...Array(player?.hand?.length + 1).keys()]

    if (player && player.dealer) {
      let count = 0
      game?.players?.forEach(player => count = count + player.bid)
      const totalBidCount: number =  count
      const cantBid = player.hand?.length - totalBidCount /// figure out the can't bid number then remove it from bidArray
      const index = bidArray.indexOf(cantBid)
      if (index > -1) bidArray.splice(index, 1)
    }
    return bidArray
  }

  const handleBidSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPlayerBid(event.target.value as number)
  }


  return (
    <>
      <Box maxWidth='100%' >
        <Box>
          {/* bid selector here */}
          {player && !bidsIn && game?.enabled &&
            <Box bgcolor={theme.colors.darkText} width='20em'>
              <Typography>Round Bids</Typography>
              {game?.players?.map((gamer, idx) => {
                return (
                  <Box display='flex' justifyContent='space-between' padding='1em' key={idx}>
                    <Box>{gamer.gamertag}</Box>
                    <Box>{gamer.bid || '-'}</Box>
                  </Box>
                )
              })}
                  {player.turn &&
                  <Box>
                    <Box>
                      <Select
                        value={playerBid ?? ""}
                        onChange={e => handleBidSelect(e)}
                        MenuProps={{
                          classes: { paper: classes.select}
                        }}
                      >
                        {possibleBids()?.map((bid, idx) => {
                          return (
                            <MenuItem value={bid} key={idx}>{bid}</MenuItem>
                          )
                        })}
                      </Select>
                    </Box>
                  <Box>
                    <Button variant="outlined" onClick={() => {submitPlayerBid(playerBid); setPlayerBid(null)}} disabled={!player.turn && !playerBid}>Submit Bid</Button>
                  </Box>
                  </Box>
                  }              
            </Box>
          }
        </Box>
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
        {player && <PlayerInfoBar player={player} />}
      </Box>
    </>
  )
}
