import express from 'express'
const router = express.Router()
import * as gameCtrl from '../../controllers/games.controller'

router.get('/', gameCtrl.index)
router.get('/:id', gameCtrl.show)
router.post('/', gameCtrl.create)
router.put('/:id', gameCtrl.update)
router.put('/:id/user/:userId', gameCtrl.addPlayerToGame)
export default router