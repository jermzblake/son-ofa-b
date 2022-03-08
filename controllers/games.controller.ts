import { GameModel } from '../models/game.model'
import mongoose from 'mongoose'

export const create = async (req, res) => {
  const game = await new GameModel(req.body)
  game.save(err => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    game.id = game._id
    delete game._id
    return res.json(game)
  })
}

export const show = async (req, res) => {
  try {
    // Parameter is checked for valid ObjectId before
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })

    const game = await GameModel.findById(req.params.id).exec() // find one with matching gameId, otherwise 'null'
    if (!game) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    game.id = game._id
    delete game._id
    return res.json(game)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export const index = async (req, res) => {
  const games = await GameModel.find()
  // I need to map through games and change _id to id
  return res.json(games)
}

export const update = async (req, res) => {
  try {
   // Parameter is checked for valid ObjectId before
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })
   
  const game = await GameModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
  if (!game) {
    return res.status(400).json({ msg: 'Game not found' })
  }
  return res.json(game)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export const addPlayerToGame = async (req, res) => {
  try {
    // Parameter is checked for valid ObjectId before
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })

    const game = await GameModel.findById(req.params.id).exec() // find one with matching gameId, otherwise 'null'
    if (!game) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    if (game.players?.length >= game.playerCount) {
      throw new Error(`Game is full`)
    }
    game.players.push(req.params.userId)
    const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
    updatedGame.id = updatedGame._id
    delete updatedGame._id
    return res.json(updatedGame)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}