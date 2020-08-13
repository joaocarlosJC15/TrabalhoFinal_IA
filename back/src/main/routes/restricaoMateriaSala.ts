import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddRestricaoMateriaSalaController } from '../factories/restricaoMateriaSala/add/add-restricaoMateriaSala-controller-factory'
import { makeListRestricaoMateriaSalaController } from '../factories/restricaoMateriaSala/list/list-restricaoMateriaSala-controller-factory';
import { makeGetRestricaoMateriaSalaController } from '../factories/restricaoMateriaSala/get/get-restricaoMateriaSala-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/restricoesmateriasala', adaptRoute(makeAddRestricaoMateriaSalaController()));
  router.get('/grades/:id_grade/restricoesmateriasala', adaptRoute(makeListRestricaoMateriaSalaController()));
  router.get('/grades/:id_grade/restricoesmateriasala/:id_materia', adaptRoute(makeGetRestricaoMateriaSalaController()));
}