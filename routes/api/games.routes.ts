import express from 'express'
const router = express.Router()
import * as gameCtrl from '../../controllers/games.controller'

router.get('/', gameCtrl.index)
router.get('/:id', gameCtrl.show)
router.post('/', gameCtrl.create)
router.put('/:id', gameCtrl.update)

export default router