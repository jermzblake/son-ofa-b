import { User } from './user.types'

export interface Game {
  id?: string
  players?: User[]
  playerCount: number
  rounds: number
  currentRound?: number
  creator?: string
  name?: string
  dateCreated?: Date
}

export interface MessageBoard {
  content: string
  sender: string
}