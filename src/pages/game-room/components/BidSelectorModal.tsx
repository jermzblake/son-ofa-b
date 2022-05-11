import React, { FunctionComponent, useState } from 'react'
import { Modal } from 'components/core/modal'
import { Box, Typography, Button, MenuItem, Select, makeStyles } from '@material-ui/core'
import { useTheme } from 'styled-components'
import { Game, Player } from 'common/types'

interface BidSelectorModalProps {
  game: Game
  player: Player
  bidsIn: boolean
  submitPlayerBid: Function
}

const useStyles = makeStyles(() => ({
  select: {
    width: '4em',
    minWidth: '0px !important',
    top: '55% !important',
    left: '50% !important'
  }
}))

export const BidSelectorModal: FunctionComponent<BidSelectorModalProps> = ({
  game,
  player,
  bidsIn,
  submitPlayerBid
}) => {
  const theme = useTheme()
  const classes = useStyles()
  const [playerBid, setPlayerBid] = useState<number>()

  const possibleBids = (): number[] => {
    let bidArray = [...Array(player?.hand?.length + 1).keys()]

    if (player && player.dealer) {
      let count = 0
      game?.players?.forEach(player => (count = count + player.bid))
      const totalBidCount: number = count
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
    <Modal show={player && !bidsIn && game?.enabled} title="Select Bid" dialogWidth="lg">
      <Box>
        {player && !bidsIn && game?.enabled && (
          <Box
            bgcolor={theme.colors.primary}
            width="20em"
            borderRadius="6px"
            padding="1em"
            color={theme.colors.lightPrimary}
          >
            <Typography>Round Bids</Typography>
            {game?.players?.map((gamer, idx) => {
              return (
                <Box display="flex" justifyContent="space-between" padding="1em" key={idx}>
                  <Box>{gamer.gamertag}</Box>
                  <Box>{gamer.bid ?? '-'}</Box>
                </Box>
              )
            })}
            {player.turn && (
              <Box>
                <Box mb="1em">
                  <Select
                    value={playerBid ?? ''}
                    onChange={e => handleBidSelect(e)}
                    MenuProps={{
                      classes: { paper: classes.select }
                    }}
                  >
                    {possibleBids()?.map((bid, idx) => {
                      return (
                        <MenuItem value={bid} key={idx}>
                          {bid}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </Box>
                <Box>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      submitPlayerBid(playerBid)
                      setPlayerBid(null)
                    }}
                    disabled={!player.turn && !playerBid}
                  >
                    Submit Bid
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  )
}
