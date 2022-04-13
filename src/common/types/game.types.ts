import { User, PlayingCard } from '../types'

export interface Game {
  id?: string
  players?: Player[]
  playerCount: number
  rounds: number
  currentRound?: number
  creator?: string
  name?: string
  dateCreated?: Date
  trumpSuit?: PlayingCard
  deck?: PlayingCard[]
  leader?: Leader
  pile?: PlayingCard[]
  winner?: string
  enabled?: boolean
}

export interface MessageBoard {
  content: string
  sender: string
}

export interface Player {
  id: string
  gamertag: string
  hand: PlayingCard[]
  bid: number | null
  tricks: number
  totalPoints: number
  ready: boolean
  dealer: boolean
  turn: boolean
  playedCard?: PlayingCard | undefined
}

export interface StarterPack {
  players: Player[]
  deck: PlayingCard[]
  trumpSuit: PlayingCard
}

export interface Leader {
  player: string
  card: PlayingCard
}