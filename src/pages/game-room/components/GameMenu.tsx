import React, { FunctionComponent, useState } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { Game } from 'common/types'
import styled from 'styled-components'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import { useTheme } from 'styled-components'
import { LeaderBoardModal } from './LeaderBoardModal'
import { InstructionModal } from 'components/page/instructions/InstructionModal'
import { ConfirmModal } from 'components/core/modal/ConfirmModal'
import { useNavigate } from 'react-router-dom'
import WarningIcon from '@material-ui/icons/Warning'

const YellowWarning = styled(WarningIcon)`
  color: orange;
  transform: scale(2);
`

const StyledMenuIcon = styled(MenuRoundedIcon)`
  && {
    color: ${props => props.theme.colors.primary};
    transform: scale(2);
  }
`

const StyledMenuContainerBox = styled(Box)`
  && {
    position: absolute;
    right: 0;
    top: 0;
  }
`

interface GameMenuProps {
  game: Game
  leaveGame: Function
}

export const GameMenu: FunctionComponent<GameMenuProps> = ({ game, leaveGame }) => {
  const theme = useTheme()
  const [showLeaderBoard, setShowLeaderBoard] = useState<boolean>(false)
  const [showInstructions, setShowInstructions] = useState<boolean>(false)
  const [confirmLeave, setConfirmLeave] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <>
      <StyledMenuContainerBox>
        <IconButton onClick={() => setShowLeaderBoard(true)}>
          <StyledMenuIcon />
        </IconButton>
      </StyledMenuContainerBox>
      <LeaderBoardModal
        showLeaderBoard={showLeaderBoard}
        setShowLeaderBoard={setShowLeaderBoard}
        game={game}
        setShowInstructions={setShowInstructions}
        leaveGame={leaveGame}
        setConfirmLeave={setConfirmLeave}
      />
      <InstructionModal show={showInstructions} setShow={setShowInstructions} />
      <ConfirmModal  
        title="Leave Game"
        open={confirmLeave}
        onClose={() => setConfirmLeave(false)}
        onConfirm={() => {
          navigate('/lobby') 
          leaveGame()
        }}
        message="Are you sure you want to leave this game?"
        icon={<YellowWarning />}
      />
    </>
  )
}
