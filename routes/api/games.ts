import express from 'express'
const router = express.Router()
import * as gameCtrl from '../../controllers/games'

router.get('/', gameCtrl.index)
router.get('/:id', gameCtrl.show)
router.post('/', gameCtrl.create)

export default router