import { GameModel } from '../models/game.model'
import mongoose from 'mongoose'
import { Game, StarterPack} from  '../src/common/types'
import { useDeck } from '../src/hooks/use-deck/useDeck'
import { useTurn } from '../src/hooks/use-turn/useTurn'

export const create = async (req, res) => {
  const game = await new GameModel({...req.body, enabled: false})
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
  // TODO need to map through games and change _id to id
  return res.json(games)
}

export const getNewGames = async (req, res) => {
  const games = await GameModel.find({ enabled: false, }).sort({dateCreated: 'desc'})
  games.forEach(game => {
    game.id = game._id
    delete game._id
  })
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
      // TODO check if player is already in game and act accordingly if not throw game is full error
      throw new Error(`Game is full`)
    }
    game.players.push(req.body)
    const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
    updatedGame.id = updatedGame._id
    delete updatedGame._id
    return res.json(updatedGame)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }

}

export const readyPlayer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })

    const game: Game = await GameModel.findById(req.params.id).exec() // find one with matching gameId, otherwise 'null'
    if (!game) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    const playerIndex = game.players.findIndex(player => player.id === req.body.id)
    game.players[playerIndex] = req.body
    const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
    updatedGame.id = updatedGame._id
    delete updatedGame._id
    return res.json(updatedGame)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export const startGame =  async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })
    const starterDeckAndPlayers: StarterPack = useDeck().deal(req.body.deck, (req.body.rounds / 2), req.body.players)
    let game: Game = {...req.body, players: starterDeckAndPlayers.players, deck: starterDeckAndPlayers.deck, trumpSuit: starterDeckAndPlayers.trumpSuit, currentRound: 1, enabled: true, cardsPerHand: req.body.rounds / 2} 
    const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true }).exec()
    if (!updatedGame) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    updatedGame.id = updatedGame._id
    delete updatedGame._id
    return res.json(updatedGame)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export const submitPlayerBid = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })

    const game: Game = await GameModel.findById(req.params.id).exec() // find one with matching gameId, otherwise 'null'
    if (!game) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    const playerIndex = game.players.findIndex(player => player.id === req.body.id)
    game.players[playerIndex] = {...req.body, turn: false}
    // change turns
    if (!game.players[playerIndex + 1]) {
      game.players[0] = {...game.players[0], turn: true}
    } else {
      game.players[playerIndex + 1] = {...game.players[playerIndex + 1], turn: true}
    }
    const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
    updatedGame.id = updatedGame._id
    delete updatedGame._id
    return res.json(updatedGame)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export const takePlayerTurn = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })

    const game: Game = await GameModel.findById(req.params.id).exec() // find one with matching gameId, otherwise 'null'
    if (!game) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    if (game.pile.length !== game.playerCount) {
      game.pile.push({ card: req.body.card, player: req.body.player.id })
    }
    const playerIndex = game.players.findIndex(player => player.id === req.body.player.id)
    game.players[playerIndex] = {...req.body.player, turn: false}
    if(game.leader) {
      if (useTurn().checkNewLeader(game.leader.card, req.body.card, game.trumpSuit)) {
        game.leader = {player: game.players[playerIndex].id, card: req.body.card}
      }
    } else {
      game.leader = {player: game.players[playerIndex].id, card: req.body.card}
      game.leadSuit = req.body.card
    } 
    if (game.players[playerIndex].dealer) {
       game.players[playerIndex].dealer = false
       game.players = useTurn().tallyTrick(game.players, game.leader.player)
       game.leadSuit = null
      // handle end of round 
      if (game.players[playerIndex].hand.length < 1) {
        game.players = useTurn().tallyPoints(game.players, game.currentRound)
        if (game.currentRound === game.rounds) {
          // Game Over
          game.winner = game.players[useTurn().whoWon(game.players)].gamertag
          const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
          updatedGame.id = updatedGame._id
          delete updatedGame._id
          return res.json(updatedGame)
        }
        game.leader = null
        game.pile = []
        const lastPlace = useTurn().whoIsLast(game.players)
        game.players[lastPlace].dealer = true
        if (!game.players[lastPlace + 1]) {
          game.players[0] = {...game.players[0], turn: true}
        } else {
          game.players[lastPlace + 1] = {...game.players[lastPlace + 1], turn: true}
        }
        game.players.forEach(player => {
          player.bid = null
        })
        game.currentRound = game.currentRound + 1
        game.cardsPerHand = useDeck().getCardsPerHand(game.currentRound, game.rounds, game.cardsPerHand)
        const roundStarterDeckAndPlayers: StarterPack = useDeck().deal(useDeck().shuffle(useDeck().getDeck()), game.cardsPerHand, game.players, true)
        game.players = roundStarterDeckAndPlayers.players
        game.deck = roundStarterDeckAndPlayers.deck
        game.trumpSuit = roundStarterDeckAndPlayers.trumpSuit
        const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
        updatedGame.id = updatedGame._id
        delete updatedGame._id
        return res.json(updatedGame)
      }
      
      const leaderIndex = game.players.findIndex(player => player.id === game.leader.player)
      // change turn to leader
      game.players[leaderIndex].turn = true
      if (!game.players[leaderIndex - 1]) {
        game.players[game.players.length - 1] = {...game.players[game.players.length - 1], dealer: true}
      } else {
        game.players[leaderIndex - 1] = {...game.players[leaderIndex - 1], dealer: true}
      }
      game.leader = null
      game.pile = []
      const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
      updatedGame.id = updatedGame._id
      delete updatedGame._id
      return res.json(updatedGame)

    } else {
      // change turns
      if (!game.players[playerIndex + 1]) {
        game.players[0] = {...game.players[0], turn: true}
      } else {
        game.players[playerIndex + 1] = {...game.players[playerIndex + 1], turn: true}
      }
    }
     const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
     updatedGame.id = updatedGame._id
     delete updatedGame._id
     return res.json(updatedGame)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export const takeDealerTurn = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ msg: 'Game not found' })

    const game: Game = await GameModel.findById(req.params.id).exec() // find one with matching gameId, otherwise 'null'
    if (!game) {
      return res.status(400).json({ msg: 'Game not found' })
    }
    game.pile.push({ card: req.body.card, player: req.body.player.id })
    const playerIndex = game.players.findIndex(player => player.id === req.body.player.id)
    game.players[playerIndex] = {...req.body.player, turn: false}
    const updatedGame = await GameModel.findByIdAndUpdate(req.params.id, game, { new: true })
    updatedGame.id = updatedGame._id
    delete updatedGame._id
    return res.json(updatedGame)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}