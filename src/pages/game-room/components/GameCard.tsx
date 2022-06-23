import React, { FunctionComponent } from 'react'
import { Box } from '@material-ui/core'
import styled, { css } from 'styled-components'
import { PlayingCard } from 'common/types'
import { useTheme } from 'styled-components'

const StyledCardBox = styled(Box)`
  && {
    transition: all 250ms ease-out;
    will-change: scale3d;
    transform: translateZ(0);
    :hover {
      transform: scale3d(1.25, 1.25, 1);
      z-index: 1000;
      box-shadow: 0 1px 32px rgba(0, 0, 0, 0.1);
      transition: all 125ms ease-in;
    }
  }
`

const StyledImage = styled.img<{ trump?: boolean, selectedCard?: boolean}>`
  width: ${props => props.trump ? '5em' : '8em'};
  box-shadow: 2px 2px 2px 2px #00000077;
  border-radius: 6px;
  border: ${props => props.selectedCard ? `2px solid ${props.theme.colors.third}` : 'unset'};
  @media only screen and (max-width: ${props => props.theme.breakpoints.large}) {
    width: ${props => props.trump ? '3.5em' : '6em'};
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.medium}) {
    width: ${props => props.trump ? '2.5em' : '4em'};
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
      {/* <img
        src={`/assets/cards-4colour/${playingCard?.value}${playingCard?.suit}.svg`}
        alt="playing card"
        style={{
          width: trump ? '5em' : '8em',
          boxShadow: '2px 2px 2px 2px #00000077',
          borderRadius: '6px',
          border: selectedCard ? `2px solid ${theme.colors.third}` : 'unset'
        }}
      /> */}
      <StyledImage trump={trump} selectedCard={selectedCard} src={`/assets/cards-4colour/${playingCard?.value}${playingCard?.suit}.svg`} alt="playing card" />
    </StyledCardBox>
  )
}
