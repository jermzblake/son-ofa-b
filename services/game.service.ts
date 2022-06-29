import { GameModel } from '../models/game.model'

export const deleteOldGUnplayedGames = async () => {
  const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
  const games = await GameModel.deleteMany({ enabled: false, dateCreated: {$lt: oneDayAgo.toString()}})
}