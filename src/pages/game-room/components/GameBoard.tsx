import React, { FunctionComponent } from 'react'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { Game, Player, PlayingCard } from 'common/types'
import { GameCard } from './GameCard'
import { PlayerHand } from './PlayerHand'
import { PlayerInfoBar } from './PlayerInfoBar'
import { BidSelectorModal } from './BidSelectorModal'
import { useTheme } from 'styled-components'

interface GameBoardProps {
  game: Game
  backendPlayer: Player
  bidsIn: boolean
  submitPlayerBid: Function
  handleCardSelect: Function
  selectedCard: PlayingCard
}

const StyledGameBoardWrapper = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1em;
  grid-template-rows: 3em 12em 12em 12em 12em;
  @media only screen and (max-width: ${props => props.theme.breakpoints.large}) {
    grid-template-rows: 3em 9em 9em 9em 9em;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.medium}) {
    grid-template-rows: 3em 5em 5em 5em 5em;
  }
  grid-template-areas:
    'a a a b b b c c c'
    'd d d e e e f f f'
    'd d d e e e f f f '
    'd d d e e e f f f'
    'g g g g g g g g g';
`

const StyledTrumpCardWrapper = styled(Box)`
  width: 5.2em;
  border: 1px solid ${props => props.theme.colors.third};
  background-color: ${props => props.theme.colors.third};
  border-radius: 6px;
  @media only screen and (max-width: ${props => props.theme.breakpoints.large}) {
    width: 4em;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.medium}) {
    width: 3em;
  }
`

const StyledPileWrapper = styled(Box)`
  grid-area: e;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  grid-auto-rows: 12em;
  @media only screen and (max-width: ${props => props.theme.breakpoints.large}) {
    grid-template-rows: 9em;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.medium}) {
    grid-template-rows: 5em;
  }
  grid-template-areas:
    'h i j'
    'k . l'
    '. m .';
`

const gameBoardGridMap = {
  0: 'd',
  1: 'f',
  2: 'b',
  3: 'c',
  4: 'a'
}

export const GameBoard: FunctionComponent<GameBoardProps> = ({
  game,
  backendPlayer,
  bidsIn,
  submitPlayerBid,
  handleCardSelect,
  selectedCard
}) => {
  const theme = useTheme()

  const filteredPlayers = game?.players?.filter(player => player.id !== backendPlayer?.id)
  let pileObject: Object = {}
  filteredPlayers?.forEach((player, idx) => {
    pileObject[player.id] = idx
  })
  pileObject[backendPlayer?.id] = -1

  const assignCardSpot = (indexNo: number) => {
    if (filteredPlayers.length === 4) {
      switch (indexNo) {
        case 0:
          return 'k'
        case 1:
          return 'l'
        case 2:
          return 'j'
        case 3:
          return 'h'
        default:
          return 'm'
      }
    } else {
      switch (indexNo) {
        case 0:
          return 'k'
        case 1:
          return 'l'
        case 2:
          return 'i'
        default:
          return 'm'
      }
    }
  }

  return (
    <StyledGameBoardWrapper>
      {game?.enabled &&
        backendPlayer &&
        filteredPlayers?.map((player, idx) => {
          if (player.id !== backendPlayer.id) {
            // TODO depending on players length render the items differently.
            if (filteredPlayers.length === 4) {
              switch (idx) {
                case 2:
                  return (
                    <Box
                      gridArea={gameBoardGridMap[idx + 1]}
                      alignSelf="center"
                      justifySelf="center"
                      key={idx + player.id}
                    >
                      <PlayerInfoBar player={player} />
                    </Box>
                  )
                case 3:
                  return (
                    <Box
                      gridArea={gameBoardGridMap[idx + 1]}
                      alignSelf="center"
                      justifySelf="center"
                      key={idx + player.id}
                    >
                      <PlayerInfoBar player={player} />
                    </Box>
                  )
                default:
                  return (
                    <Box gridArea={gameBoardGridMap[idx]} alignSelf="center" justifySelf="center" key={idx + player.id}>
                      <PlayerInfoBar player={player} />
                    </Box>
                  )
              }
            }
            return (
              <Box gridArea={gameBoardGridMap[idx]} alignSelf="center" justifySelf="center" key={idx + player.id}>
                <PlayerInfoBar player={player} />
              </Box>
            )
          }
        })}
      <StyledPileWrapper>
        {bidsIn &&
          game?.pile?.map((p, idx) => {
            return (
              <Box gridArea={assignCardSpot(pileObject[p.player])} key={idx}>
                <GameCard playingCard={p.card} />
              </Box>
            )
          })}
      </StyledPileWrapper>
      <Box gridArea="g" justifySelf="start">
        {game?.trumpSuit && (
          <StyledTrumpCardWrapper>
            <GameCard playingCard={game?.trumpSuit} trump />
            <Typography variant="h5">
              <Box color={theme.colors.secondary}>TRUMP</Box>
            </Typography>
          </StyledTrumpCardWrapper>
        )}
      </Box>
      <Box gridArea="g" justifySelf="center">
        <PlayerHand
          player={backendPlayer}
          game={game}
          selectedCard={selectedCard}
          handleCardSelect={handleCardSelect}
        />
      </Box>
      <BidSelectorModal game={game} player={backendPlayer} bidsIn={bidsIn} submitPlayerBid={submitPlayerBid} />
    </StyledGameBoardWrapper>
  )
}
