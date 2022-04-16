import { PlayingCard, Player, Leader } from 'common/types/'

export const useTurn = () => {
  const numberMap = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14
  }

  const checkCardIsPlayable = (hand: PlayingCard[], selectedCard: PlayingCard, leadSuit: PlayingCard) => {
    const suitMatch = selectedCard.suit === leadSuit.suit
    if (suitMatch) {
      return true
    }

    const hasSuit = hand.some(card => card.suit === leadSuit.suit)
    if (hasSuit) {
      return false
    } else {
      return true
    }
  }

  const checkNewLeader = (leaderCard: PlayingCard, cardInQuestion: PlayingCard, trumpCard: PlayingCard): Boolean => {
    if (leaderCard.suit === trumpCard.suit) {
      if (cardInQuestion.suit === leaderCard.suit) {
        return numberMap[cardInQuestion.value] > numberMap[leaderCard.value]
      } else {
        return false
      }
    } else if (cardInQuestion.suit === trumpCard.suit) {
      return true
    } else {
      if (cardInQuestion.suit === leaderCard.suit) {
        return numberMap[cardInQuestion.value] > numberMap[leaderCard.value]
      } else {
        return false
      }
    }
  }

  const tallyTrick = (incomingPlayers: Player[], leader: string) => {
    const players = incomingPlayers
    const playerIndex = players.findIndex(player => player.id === leader)
    players[playerIndex] = { ...players[playerIndex], tricks: players[playerIndex].tricks + 1 }
    return players
  }

  const tallyPoints = (players: Player[], currentRound: number): Player[] => {
    players.forEach(player => {
      if (player.bid === player.tricks) {
        const roundScore = player.tricks * player.tricks + 10
        player.totalPoints = player.totalPoints + roundScore
        if (!player.roundHistory || player.roundHistory.length < 1) {
          player.roundHistory = [{round: currentRound, score: roundScore}]
        } else {
        player.roundHistory.push({round: currentRound, score: roundScore})
        }
      } else {
        const roundScore = Math.abs(player.bid - player.tricks) * -5
        player.totalPoints = player.totalPoints + roundScore
        if (!player.roundHistory || player.roundHistory.length < 1) {
          player.roundHistory = [{round: currentRound, score: roundScore}]
        } else {
        player.roundHistory.push({round: currentRound, score: roundScore})
        }
      }
      player.tricks = 0
    })
    return players
  }

  const whoIsLast = (players: Player[]): number => {
    let lowestScore = players[0].totalPoints
    let loserPlayer
    players.forEach((player, index) => {
      lowestScore = Math.min(player.totalPoints, lowestScore)
      if (lowestScore === player.totalPoints) {
        loserPlayer = index
      }
    })
    return loserPlayer
  }

  const whoWon = (players: Player[]): string => {
    let highestScore = players[0].totalPoints
    let winner
    players.forEach((player, index) => {
      highestScore = Math.min(player.totalPoints, highestScore)
      if (highestScore === player.totalPoints) {
        winner = index
      }
    })
    return winner
  }

  return { checkCardIsPlayable, checkNewLeader, tallyTrick, tallyPoints, whoIsLast, whoWon } as const
}
