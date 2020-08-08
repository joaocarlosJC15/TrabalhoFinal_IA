import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddProfessorController } from '../factories/professor/add/add-professor-controller-factory'

export default (router: Router): void => {
  router.post('/grades/:id_grade/professores', adaptRoute(makeAddProfessorController()));
}