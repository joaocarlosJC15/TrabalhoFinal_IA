import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddGradeController } from '../factories/grade/add-grade/add-grade-controller-factory'

export default (router: Router): void => {
  router.post('/grades', adaptRoute(makeAddGradeController()));
}