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

  const shuffle = (deck: PlayingCard[]) => {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++)
    {
      let location1 = Math.floor((Math.random() * deck.length));
      let location2 = Math.floor((Math.random() * deck.length));
      let tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
  }

  return {
    shuffle,
    deck,
    setDeck
  } as const

}

