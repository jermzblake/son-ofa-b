import { GameModel } from '../models/game'
import mongoose from 'mongoose'

export const create = async (req, res) => {
  const game = await new GameModel(req.body)
  game.save(err => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(game)
  })
}

export const show = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })

    const game = await GameModel.findById(req.params.id).exec() // find one with matching gameId, otherwise 'null'
    if (!game) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    return res.json(game)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export const index = async (req, res) => {
  const games = await GameModel.find()
  return res.json(games)
}
