import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddPeriodoController } from '../factories/periodo/add/add-periodo-controller-factory'

export default (router: Router): void => {
  router.post('/grades/:id_grade/periodos', adaptRoute(makeAddPeriodoController()));
}