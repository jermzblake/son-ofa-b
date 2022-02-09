import React, { FunctionComponent } from 'react'
import { Box, Button, Select, Typography, MenuItem, FormHelperText, InputLabel, makeStyles } from '@material-ui/core'
import { useTheme } from 'styled-components'
import { Game } from 'common/types'

interface CreateGameProps {
  onSubmit: Function
  newGame: Game
  setNewGame: Function
  handleSelect: Function
}

const useStyles = makeStyles(() => ({
  select: {
    "width": "300px",
    "minWidth": "0px !important"
  }
}))

export const CreateGame: FunctionComponent<CreateGameProps> = ({ onSubmit, newGame, setNewGame, handleSelect }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column">
      <Box paddingTop="1.5em" paddingLeft="2em" marginBottom="1.5em">
        <Typography variant="h6">Players & Rounds</Typography>
      </Box>
      <Box>
        <Box mb="1em">
          <Box mb="1em">
            <InputLabel id="player-count-select-label">Players</InputLabel>
            <Select
              labelId="player-count-select-label"
              id="player-count-select"
              onChange={e => handleSelect(e, 'player-count-select')}
              value={newGame.playerCount}
              fullWidth
              MenuProps={{ 
                classes: { paper: classes.select },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
            >
              <MenuItem value={3}>Three</MenuItem>
              <MenuItem value={4}>Four</MenuItem>
              <MenuItem value={5}>Five</MenuItem>
            </Select>
            <FormHelperText>Select number of players</FormHelperText>
          </Box>
          <Box mb="1em">
            <InputLabel id="round-select-label">Rounds</InputLabel>
            <Select
              id="round-select"
              labelId="round-select-label"
              onChange={e => handleSelect(e, 'round-select')}
              value={newGame.rounds}
              fullWidth
              MenuProps={{ 
                classes: { paper: classes.select },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={17}>17</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={19}>19</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <FormHelperText>Select number of rounds</FormHelperText>
          </Box>
        </Box>
        <Box>
          <Button variant="contained" color="secondary" onClick={() => onSubmit()}>
            Create Game
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
