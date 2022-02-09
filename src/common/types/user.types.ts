export interface User {
  userId: string
  username: string
  connected: boolean
  messages: Message[]
  hasNewMessages: boolean
  currentGame: CurrentGame
}

export interface Message {
  content: any
  fromSelf: boolean
}

export interface CurrentGame {
  gameId: string
  roundScore: number
  totalScore: number
  hand: any  // update this once you'v created hand object Cards[]
  bid: number
  tricks: number
  dealer: boolean
}