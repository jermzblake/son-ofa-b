import { Schema, model, connect } from 'mongoose'
import { Game } from '../src/common/types'

export const gameSchema = new Schema<Game>({
  id: String,
  players: [Object],
  playerCount: Number,
  rounds: Number,
  currentRound: Number,
  creator: String,
  name: String,
  trumpSuit: Object,
  deck: [Object],
  leader: Object,
  pile: [Object],
  winner: String,
  enabled: Boolean,
  leadSuit: Object,
  dateCreated: { type: Date, default: Date.now },
})

export const GameModel = model<Game>('Game', gameSchema)