import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddGradeController } from '../factories/grade/add/add-grade-controller-factory'
import { makeListGradeController } from '../factories/grade/list/list-grade-controller-factory';
import { makeGerarHorarioGradeController } from '../factories/grade/gerarHorario/gerarHorario-grade-controller-factory'

export default (router: Router): void => {
  router.post('/grades', adaptRoute(makeAddGradeController()));
  router.get('/grades', adaptRoute(makeListGradeController()));
  router.post('/grades/:id_grade/gerarhorario', adaptRoute(makeGerarHorarioGradeController()));
}