import { Schema, model, connect } from 'mongoose'
import { Game } from '../src/common/types'

export const gameSchema = new Schema<Game>({
  id: String,
  players: [String],
  playerCount: Number,
  rounds: Number,
  currentRound: Number,
  creator: String,
  name: String,
})

export const GameModel = model<Game>('Game', gameSchema)