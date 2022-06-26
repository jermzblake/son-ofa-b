import React, { FunctionComponent } from 'react'
import { Modal } from 'components/core/modal'
import { Game } from 'common/types'
import styled from 'styled-components'
import { Box, Typography, Table, TableContainer, TableCell, TableRow, TableHead, TableBody, Button } from '@material-ui/core'
import { useTheme } from 'styled-components'
import { useNavigate } from 'react-router-dom'

const LeaderBoardContainer = styled(Box)`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 6px;
`

interface LeaderBoardModalProps {
  showLeaderBoard: boolean
  setShowLeaderBoard: Function
  game: Game
  showInstructions?: boolean
  setShowInstructions?: Function
}

export const LeaderBoardModal: FunctionComponent<LeaderBoardModalProps> = ({
  showLeaderBoard,
  setShowLeaderBoard,
  game,
  showInstructions, 
  setShowInstructions
}) => {
  const theme = useTheme()
  const roundArray = Array.from(Array(game?.rounds).keys())
  const navigate = useNavigate()

  return (
    <Modal
      show={showLeaderBoard}
      onClose={() => setShowLeaderBoard(false)}
      title="Game Menu"
      dialogWidth="xl"
      showCancel
    >
      <LeaderBoardContainer>
        <TableContainer style={{ maxHeight: '20em' }}>
          <Table stickyHeader aria-label="Leader Table">
            <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                {}
              </TableCell>
              <TableCell align="center" colSpan={20}>
                Rounds
              </TableCell>
            </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="body1">
                    <Box fontWeight="bold" textAlign="left">
                      Players
                    </Box>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1">
                    <Box fontWeight="bold" textAlign="left">
                      Total
                    </Box>
                  </Typography>
                </TableCell>
                {game &&
                  game.players?.length > 0 &&
                  roundArray.map((round, idx) => {
                    return (
                      <TableCell key={idx}>
                        <Typography variant="body1">
                          <Box fontWeight="bold" textAlign="left">
                            {round + 1}
                          </Box>
                        </Typography>
                      </TableCell>
                    )
                  })}
              </TableRow>
            </TableHead>
            <TableBody>
              {game &&
                game.players?.length > 0 &&
                game.players.map((player, idx) => {
                  return (
                    <TableRow key={idx + player.id}>
                      <TableCell>
                        <Typography variant="body1">
                          <Box fontWeight="bold" textAlign="left">
                            {player.gamertag}
                          </Box>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          <Box textAlign="center">{player.totalPoints}</Box>
                        </Typography>
                      </TableCell>
                      {player.roundHistory?.map((round, idx) => {
                        return (
                          <TableCell key={idx}>
                            <Typography variant="body1">
                              <Box textAlign="center">{round?.score ?? '-'}</Box>
                            </Typography>
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </LeaderBoardContainer>
      <Box display='flex' justifyContent='space-between' mt='1em'>
        <Button variant='contained' color='secondary' onClick={() => setShowInstructions(true)}>Instructions</Button>
        {game?.winner &&
          <Box mt='2em'>
            <Button variant='contained' color='secondary' onClick={() => navigate('/lobby')}>Leave Game</Button>
          </Box>
        }
      </Box>
    </Modal>
  )
}
