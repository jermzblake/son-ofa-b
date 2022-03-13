import { useState } from 'react'
import { PlayingCard } from 'common/types/'

export const useDeck = () => {
  const suits = ["spades", "diamonds", "clubs", "hearts"]
  const values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"]
  
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

  const [deck, setDeck] = useState(getDeck())

  const shuffleDeck = (deck: PlayingCard[]) => {
    let m = deck.length, i

    while (m) {
      i = Math.floor(Math.random() * m--);

      [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return deck
  }

  const deal = (deck: PlayingCard[]) =>{
    return deck.pop()
  }

  return {
    shuffle: shuffleDeck,
    deck,
    setDeck,
    deal
  } as const

}

