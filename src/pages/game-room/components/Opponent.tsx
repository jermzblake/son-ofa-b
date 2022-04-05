import React, { FunctionComponent } from 'react'
import { Box, Typography } from '@material-ui/core'
import { Player } from 'common/types'
import { useTheme } from 'styled-components'
import StarsIcon from '@material-ui/icons/Stars';

interface OpponentProps {
  player: Player
  leader?: boolean
}

export const Opponent: FunctionComponent<OpponentProps> = ({ player, leader }) => {
  const theme = useTheme()

  return (
    <Box
      display="flex"
      border={player.turn ? `2px solid ${theme.colors.secondary}` : 'unset'}
      justifyContent="space-between"
      bgcolor={theme.colors.backgroundComplementII}
      padding="0 0.5em"
      width='15em'
    >
      <Box>
        <Typography variant="body1">{player.gamertag}</Typography>
      </Box>
      <Box>
        <Box>
          <Typography variant="body2">{player.bid}</Typography>
        </Box>
        {player.dealer && (
          <Box fontWeight="bold" color={theme.colors.third}>
            <Typography>D</Typography>
          </Box>
        )}
        {leader && <StarsIcon />}
      </Box>
    </Box>
  )
}
