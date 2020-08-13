import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddMateriaController } from '../factories/materia/add/add-materia-controller-factory'
import { makeListMateriaController } from '../factories/materia/list/list-materia-controller-factory';
import { makeGetMateriaController } from '../factories/materia/get/get-materia-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/materias', adaptRoute(makeAddMateriaController()));
  router.get('/grades/:id_grade/materias', adaptRoute(makeListMateriaController()));
  router.get('/grades/:id_grade/materias/:id_materia', adaptRoute(makeGetMateriaController()));
}