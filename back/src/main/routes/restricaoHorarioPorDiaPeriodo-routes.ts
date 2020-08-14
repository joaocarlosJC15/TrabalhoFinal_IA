import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'

import { makeAddRestricaoHorarioPorDiaPeriodoController } from '../factories/restricaoHorarioPorDiaPeriodo/add/add-restricaoHorarioPorDiaPeriodo-controller-factory'
import { makeListRestricaoHorarioPorDiaPeriodoController } from '../factories/restricaoHorarioPorDiaPeriodo/list/list-restricaoHorarioPorDiaPeriodo-controller-factory';
import { makeGetRestricaoHorarioPorDiaPeriodoController } from '../factories/restricaoHorarioPorDiaPeriodo/get/get-restricaoHorarioPorDiaPeriodo-controller-factory';

export default (router: Router): void => {
  router.post('/grades/:id_grade/restricoeshorariopordiaperiodo', adaptRoute(makeAddRestricaoHorarioPorDiaPeriodoController()));
  router.get('/grades/:id_grade/restricoeshorariopordiaperiodo', adaptRoute(makeListRestricaoHorarioPorDiaPeriodoController()));
  router.get('/grades/:id_grade/restricoeshorariopordiaperiodo/:id_periodo', adaptRoute(makeGetRestricaoHorarioPorDiaPeriodoController()));
}