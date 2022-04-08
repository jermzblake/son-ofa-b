import { useState } from 'react'
import { PlayingCard, Player, StarterPack } from 'common/types/'

export const useDeck = () => {
  const suits = ["S", "D", "C", "H"]
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  
  const getDeck = () => {
    let deck: PlayingCard[] = []

    for(let i = 0; i < suits.length; i++)
    {
      for(let x = 0; x < values.length; x++)
      {
        let card = { value: values[x], suit: suits[i] }
        deck.push(card)
      }
    }
  
    return deck;
  }

  const shuffleDeck = (deck: PlayingCard[]) => {
    let m = deck.length, i

    while (m) {
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return deck
  }

  const deal = (deck: PlayingCard[], cardsPerHand: number, players: Player[], dealer?: number): StarterPack => {
    // make dealer an optional parameter that is passed when advancing rounds of a game
    const randomDealerNumber: number = dealer ? undefined : Math.floor(Math.random() * (players.length - 1))   
    const currentDeck = deck
    const dealtPlayers = players.map((player, idx) => {
      player.hand = currentDeck.splice(0, cardsPerHand)
      if (idx === dealer || idx === randomDealerNumber) {
        player.dealer = true
      } else if (idx === (dealer + 1) || idx === (randomDealerNumber + 1)) {
        player.turn = true
      }

      return player
    })
    const trumpSuit = dealOne(currentDeck)
    return {players: dealtPlayers, deck: currentDeck, trumpSuit}
  }

  const dealOne = (deck: PlayingCard[]) =>{
    return deck.pop()
  }

  return {
    shuffle: shuffleDeck,
    deal,
    getDeck
  } as const

}

