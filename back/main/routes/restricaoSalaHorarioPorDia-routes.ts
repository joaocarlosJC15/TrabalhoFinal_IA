import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddRestricaoSalaHorarioPorDiaController } from '../factories/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia-controller-factory'

export default (router: Router): void => {
  router.post('/grades/:id_grade/restricoessalahorariopordia', adaptRoute(makeAddRestricaoSalaHorarioPorDiaController()));
}