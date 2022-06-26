import React, { FunctionComponent, useState } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { Game } from 'common/types'
import styled from 'styled-components'
import MenuRoundedIcon from '@material-ui/icons/MenuRounded'
import { useTheme } from 'styled-components'
import { LeaderBoardModal } from './LeaderBoardModal'
import { InstructionModal } from 'components/page/instructions/InstructionModal'

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
}

export const GameMenu: FunctionComponent<GameMenuProps> = ({ game }) => {
  const theme = useTheme()
  const [showLeaderBoard, setShowLeaderBoard] = useState<boolean>(false)
  const [showInstructions, setShowInstructions] = useState<boolean>(false)

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
      />
      <InstructionModal show={showInstructions} setShow={setShowInstructions} />
    </>
  )
}
