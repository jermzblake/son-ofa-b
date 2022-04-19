import React, { FunctionComponent } from 'react'
import { Box } from '@material-ui/core'
import styled, { css } from 'styled-components'
import { PlayingCard } from 'common/types'
import { useTheme } from 'styled-components'

// should I do a styled card box for animation purposes?

const StyledCardBox = styled(Box)`
  && {
    :hover {
      transform: scale3d(1.25, 1.25, 1);
      z-index: 1000;
      box-shadow: 0 1px 32px rgba(0, 0, 0, 0.1);
      transition: all 125ms ease-in;
    }
  }
`

interface PlayingCardProps {
  playingCard: PlayingCard
  handleSelect?: Function
  selectable?: boolean
  trump?: boolean
  selectedCard?: boolean
}

export const GameCard: FunctionComponent<PlayingCardProps> = ({
  playingCard,
  handleSelect,
  selectable,
  trump,
  selectedCard
}) => {
  const theme = useTheme()
  return (
    <StyledCardBox
      onClick={() => {
        selectable ? handleSelect(playingCard) : ''
      }}
      style={{ cursor: selectable ? 'grab' : 'auto' }}
    >
      <img
        src={`/assets/cards-4colour/${playingCard?.value}${playingCard?.suit}.svg`}
        alt="playing card"
        style={{
          width: trump ? '5em' : '8em',
          boxShadow: '2px 2px 2px 2px #00000077',
          borderRadius: '6px',
          border: selectedCard ? `2px solid ${theme.colors.third}` : 'unset'
        }}
      />
    </StyledCardBox>
  )
}
