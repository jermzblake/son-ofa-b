import React, { FunctionComponent } from 'react'
import {
  Box,
  Button,
  Typography,
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableHead,
  TableBody
} from '@material-ui/core'
import styled from 'styled-components'
import { Game } from 'common/types'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'

const StyledGameListBox = styled(Box)`
  && {
    display: flex;
    flex-direction: column;
  }
`

const StyledTableContainer = styled(TableContainer)`
  && {
    max-height: 28em;
    overflow-y: auto;
    scrollbar-width: none;
    overflow-x: hidden;
  }
`

export interface GameSelectorProps {
  currentGames: Game[]
  setShowCreateGame: Function
}

export const GameSelector: FunctionComponent<GameSelectorProps> = ({ currentGames, setShowCreateGame }) => {
  const navigate = useNavigate()
  const theme = useTheme()

  return (
    <Box>
      <Typography variant="h5">
        <Box>Select Game</Box>
      </Typography>
      <Typography variant="caption">
        <Box>Join an open game or create a new game</Box>
      </Typography>
      {currentGames && currentGames.length > 0 && (
        <StyledTableContainer>
          <Table stickyHeader aria-label="game list" style={{ backgroundColor: theme.colors.backgroundComplementII }}>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="body1">
                    <Box fontWeight="bold">Creator</Box>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    <Box fontWeight="bold">Players</Box>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    <Box fontWeight="bold">Rounds</Box>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body1">
                    <Box fontWeight="bold"> </Box>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentGames.map((game, index) => {
                return (
                  <TableRow key={game.id + index}>
                    <TableCell>
                      <Typography variant="body1">
                        <Box fontWeight="bold" color={theme.colors.baseText}>
                          {game.name}
                        </Box>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        <Box fontWeight="bold" color={theme.colors.baseText}>
                          {game.playerCount}
                        </Box>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        <Box fontWeight="bold" color={theme.colors.baseText}>
                          {game.rounds}
                        </Box>
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button color="secondary" onClick={() => navigate(`/game/${game.id}`)}>
                        Join Game
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </StyledTableContainer>
      )}
      <Box display="flex" justifyContent="flex-end" width="100%" mt="1em">
        <Button variant="contained" onClick={() => setShowCreateGame(true)}>
          Create Game
        </Button>
      </Box>
    </Box>
  )
}
