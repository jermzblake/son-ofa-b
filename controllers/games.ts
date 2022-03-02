import { GameModel } from '../models/game'

export const create = async (req, res) => {
  let game = await new GameModel(req.body)
  game.save((err) => {
    if (err) {
      console.log(err)
      return res.json(err)
    }
    return res.json(game)
  })
}

export const show = async (req, res) => {

}

export const index = async (req, res) => {
  let games = await GameModel.find()
  return res.json(games)
}