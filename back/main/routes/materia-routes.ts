import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddMateriaController } from '../factories/materia/add/add-materia-controller-factory'

export default (router: Router): void => {
  router.post('/grades/:id_grade/materias', adaptRoute(makeAddMateriaController()));
}