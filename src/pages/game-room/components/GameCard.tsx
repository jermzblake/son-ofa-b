import React, { FunctionComponent } from 'react'
import { Box } from '@material-ui/core'
import styled, { css } from 'styled-components'
import { PlayingCard } from 'common/types'

// should I do a styled card box for animation purposes?

interface PlayingCardProps {
  playingCard: PlayingCard
  handleSelect?: Function
  selectable? : boolean
  trump?: boolean
}

export const GameCard: FunctionComponent<PlayingCardProps> = ({ playingCard, handleSelect, selectable, trump }) => {

  return (
    <Box onClick={() => {selectable ? handleSelect() : ""}} style={{ cursor: `{selectable ? 'grab' : "auto"}`}}>
      <img src={`/assets/cards-4colour/${playingCard?.value}${playingCard?.suit}.svg`} alt="playing card" style={{ width: trump ? '5em' :'8em'}}/>
    </Box>
  )
}