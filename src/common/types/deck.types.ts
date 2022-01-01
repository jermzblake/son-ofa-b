export type suits = 'hearts' | 'spades' | 'clubs' | 'diamonds'
export type values = 'ace' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'jack' | 'queen' | 'king'

export interface playingCard {
  value: string
  suit: string
} 