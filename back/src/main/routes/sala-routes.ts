import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddSalaController } from '../factories/sala/add/add-sala-controller-factory'
import { makeListSalaController } from '../factories/sala/list/list-sala-controller-factory';
import { makeGetSalaController } from '../factories/sala/get/get-sala-controllet-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/salas', adaptRoute(makeAddSalaController()));
  router.get('/grades/:id_grade/salas', adaptRoute(makeListSalaController()));
  router.get('/grades/:id_grade/salas/:id_sala', adaptRoute(makeGetSalaController()));
}