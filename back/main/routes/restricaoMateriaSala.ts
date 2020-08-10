import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddRestricaoMateriaSalaController } from '../factories/restricaoMateriaSala/add/add-restricaoMateriaSala-controller-factory'

export default (router: Router): void => {
  router.post('/grades/:id_grade/restricoesmateriasala', adaptRoute(makeAddRestricaoMateriaSalaController()));
}