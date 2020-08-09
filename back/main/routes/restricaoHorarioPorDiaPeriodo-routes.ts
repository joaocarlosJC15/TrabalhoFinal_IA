import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddRestricaoHorarioPorDiaPeriodoController } from '../factories/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo-controller-factory'
import { makeListRestricaoHorarioPorDiaPeriodoController } from '../factories/restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/periodos/:id_periodo/restricoeshorariopordia', adaptRoute(makeAddRestricaoHorarioPorDiaPeriodoController()));
  router.get('/grades/:id_grade/restricoeshorariopordia', adaptRoute(makeListRestricaoHorarioPorDiaPeriodoController()));
}