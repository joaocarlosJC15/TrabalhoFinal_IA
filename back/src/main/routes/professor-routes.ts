import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddProfessorController } from '../factories/professor/add/add-professor-controller-factory'
import { makeListProfessorController } from '../factories/professor/list/list-professor-controller-factory';
import { makeGetProfessorController } from '../factories/professor/get/get-professor-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/professores', adaptRoute(makeAddProfessorController()));
  router.get('/grades/:id_grade/professores', adaptRoute(makeListProfessorController()));
  router.get('/grades/:id_grade/professores/:id_professor', adaptRoute(makeGetProfessorController()));
}