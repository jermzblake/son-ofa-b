import React, { FunctionComponent } from 'react'
import { Modal } from 'components/core/modal'
import { Game } from 'common/types'
import styled from 'styled-components'
import { Box, Typography, Table, TableContainer, TableCell, TableRow, TableHead, TableBody } from '@material-ui/core'
import { useTheme } from 'styled-components'

const LeaderBoardContainer = styled(Box)`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.primary};
  border-radius: 6px;
`

interface LeaderBoardModalProps {
  showLeaderBoard: boolean
  setShowLeaderBoard: Function
  game: Game
}

export const LeaderBoardModal: FunctionComponent<LeaderBoardModalProps> = ({
  showLeaderBoard,
  setShowLeaderBoard,
  game
}) => {
  const theme = useTheme()
  const roundArray = Array.from(Array(game.rounds).keys())

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
                <TableCell>
                  <Typography variant="body1">
                    <Box fontWeight="bold" textAlign="left">
                      Players
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
                <TableCell>
                  <Typography variant="body1">
                    <Box fontWeight="bold" textAlign="left">
                      Total
                    </Box>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {game &&
                game.players?.length > 0 &&
                game.players.map((player, idx) => {
                  return (
                    <TableRow>
                      <TableCell key={idx + player.id}>
                        <Typography variant="body1">
                          <Box fontWeight="bold" textAlign="left">
                            {player.gamertag}
                          </Box>
                        </Typography>
                      </TableCell>
                      {player.roundHistory?.map((round, idx) => {
                        return (
                          <TableCell key={idx}>
                            <Typography variant="body1">
                              <Box textAlign="center">{round.score}</Box>
                            </Typography>
                          </TableCell>
                        )
                      })}
                      <TableCell>
                        <Typography variant="body1">
                          <Box textAlign="center">{player.totalPoints}</Box>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </LeaderBoardContainer>
    </Modal>
  )
}
