import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddPeriodoController } from '../factories/periodo/add/add-periodo-controller-factory'
import { makeListPeriodoController } from '../factories/periodo/list/list-periodo-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/periodos', adaptRoute(makeAddPeriodoController()));
  router.get('/grades/:id_grade/periodos', adaptRoute(makeListPeriodoController()));
}