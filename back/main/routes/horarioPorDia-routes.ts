import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddHorarioPorDiaController } from '../factories/horarioPorDia/add/add-horarioPorDia-controller-factory'

export default (router: Router): void => {
  router.post('/grades/:id_grade/horariospordia', adaptRoute(makeAddHorarioPorDiaController()));
}