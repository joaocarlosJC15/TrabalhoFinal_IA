import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddSalaController } from '../factories/sala/add/add-sala-controller-factory'
import { makeListSalaController } from '../factories/sala/list/list-sala-controller-factory';

export default (router: Router): void => {
  router.post('/salas', adaptRoute(makeAddSalaController()));
  router.get('/salas', adaptRoute(makeListSalaController()));
}