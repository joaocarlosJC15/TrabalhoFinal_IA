import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddRestricaoSalaHorarioPorDiaController } from '../factories/restricaoSalaHorarioPorDia/add/add-restricaoSalaHorarioPorDia-controller-factory'
import { makeListRestricaoSalaHorarioPorDiaController } from '../factories/restricaoSalaHorarioPorDia/list/list-restricaoSalaHorarioPorDia-controller-factory';
import { makeGetRestricaoSalaHorarioPorDiaController } from '../factories/restricaoSalaHorarioPorDia/get/get-restricaoSalaHorarioPorDia-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/restricoessalahorariopordia', adaptRoute(makeAddRestricaoSalaHorarioPorDiaController()));
  router.get('/grades/:id_grade/restricoessalahorariopordia', adaptRoute(makeListRestricaoSalaHorarioPorDiaController()));
  router.get('/grades/:id_grade/restricoessalahorariopordia/:id_sala', adaptRoute(makeGetRestricaoSalaHorarioPorDiaController()));
}