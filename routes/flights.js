import { Router } from 'express'
const router = Router()
import * as flightsCtrl from '../controllers/flights.js'

/* GET users listing. */
router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.get('/', flightsCtrl.index)
router.get('/:id', flightsCtrl.show)

export {
  router
}
