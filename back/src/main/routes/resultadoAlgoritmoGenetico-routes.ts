import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeListResultadoAlgoritmoGeneticoController } from '../factories/resultadoAlgoritmoGenetico/list/list-resultadoAlgoritmoGenetico-controller-factory';
import { makeListHorarioGeradoController } from '../factories/resultadoAlgoritmoGenetico/horarioGerado/horarioGerado-resultadoAlgoritmoGenetico-controller-factory';

export default (router: Router): void => {
  router.get('/grades/:id_grade/resultadosalgoritmogenetico', adaptRoute(makeListResultadoAlgoritmoGeneticoController()));
  router.get('/grades/:id_grade/resultadosalgoritmogenetico/:id_resultado_algoritmo_genetico/horariosgerados', adaptRoute(makeListHorarioGeradoController()));
}