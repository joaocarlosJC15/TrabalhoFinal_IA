import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddRestricaoProfessorHorarioPorDiaController } from '../factories/restricaoProfessorHorarioPorDia/add/add-restricaoProfessorHorarioPorDia-controller-factory'
import { makeListRestricaoProfessorHorarioPorDiaController } from '../factories/restricaoProfessorHorarioPorDia/list/list-restricaoProfessorHorarioPorDia-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/restricoesprofessorhorariopordia', adaptRoute(makeAddRestricaoProfessorHorarioPorDiaController()));
  router.get('/grades/:id_grade/restricoesprofessorhorariopordia', adaptRoute(makeListRestricaoProfessorHorarioPorDiaController()));
}