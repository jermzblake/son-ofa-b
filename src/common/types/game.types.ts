import { User } from './user.types'

export interface Game {
  id?: string
  players?: Player[]
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

export interface Player {
  id: string
  gamertag: string
  hand: any[]
  bid: number
  tricks: number
  totalPoints: number
}