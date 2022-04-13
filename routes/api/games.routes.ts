import express from 'express'
const router = express.Router()
import * as gameCtrl from '../../controllers/games.controller'

router.get('/', gameCtrl.index)
router.get('/:id', gameCtrl.show)
router.post('/', gameCtrl.create)
router.put('/:id', gameCtrl.update)
router.put('/:id/user/:userId', gameCtrl.addPlayerToGame)
router.put('/:id/start', gameCtrl.startGame)
router.put('/:id/player/ready', gameCtrl.readyPlayer)
router.put('/:id/player/bid', gameCtrl.submitPlayerBid)
router.put('/:id/player/turn', gameCtrl.takePlayerTurn)

export default router