import { User } from './user.types'

export interface Game {
  id?: string
  players: User[]
  rounds: number
  currentRound: number
}