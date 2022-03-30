import React, { FunctionComponent } from 'react'
import { Box, Button, MenuItem, Select, makeStyles } from '@material-ui/core'
import { Game, Player } from 'common/types'
import { GameCard } from './GameCard'
import { useTheme } from 'styled-components'

interface PlayerHUDProps {
  player: Player
  game: Game
  bidsIn: boolean
}

/**
 * * create  bid selector as part of the PlayerHUD. give it absolute position on the condition of player doesn't have a bid value and turn is true
 * will need a handle bid method that makes check on bid (ex. dealer restrictions)
 * bid array is not the same for everyone. Dealer has restrictions
 * * I need to make the bid selector dependent on state. so create new state in useGame that checks if all users have made a bid
 */

 const useStyles = makeStyles(() => ({
  select: {
    width: '4em',
    minWidth: '0px !important',
    // top: '45% !important',
    // left: '60% !important',
    // right: '0 !important'
  }
}))

export const PlayerHUD: FunctionComponent<PlayerHUDProps> = ({ player, game, bidsIn }) => {
  const theme = useTheme()
  const classes = useStyles()

  const possibleBids = (): number[] => {
    let bidArray = [...Array(player?.hand?.length).keys()]

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

  return (
    <>
      <Box >
        <Box>
          {/* bid selector here */}
          {player && !bidsIn && game?.enabled &&
            <Box bgcolor={theme.colors.darkText} width='20em'>
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
                  <Box><Button>Submit</Button></Box>
                  </Box>
                  }              
            </Box>
          }
        </Box>
        <Box display='flex'>
          {player &&
            player.hand?.map((card, idx) => {
              return (
                <Box key={idx}>
                  <GameCard playingCard={card} />
                </Box>
              )
            })}
        </Box>
      </Box>
    </>
  )
}
