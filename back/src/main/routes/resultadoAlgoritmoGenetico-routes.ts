import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeListResultadoAlgoritmoGeneticoController } from '../factories/resultadoAlgoritmoGenetico/list/list-resultadoAlgoritmoGenetico-factory';

export default (router: Router): void => {
  router.get('/grades/:id_grade/resultadosalgoritmogenetico', adaptRoute(makeListResultadoAlgoritmoGeneticoController()));
}