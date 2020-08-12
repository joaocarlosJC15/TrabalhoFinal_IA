import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeListDiaSemanaController } from '../factories/diaSemana/list/list-diaSemana-controller-factory';


export default (router: Router): void => {
  router.get('/diassemana', adaptRoute(makeListDiaSemanaController()));
}