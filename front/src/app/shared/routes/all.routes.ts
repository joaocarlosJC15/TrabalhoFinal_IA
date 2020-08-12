export const ALL_ROUTES = [
  {
    path: 'periodos',
    loadChildren: 'app/pages/periodo/periodo.module#PeriodoModule'
  },
  {
    path: 'resultados',
    loadChildren: 'app/pages/resultadoAlgoritmoGenetico/resultadoAlgoritmoGenetico.module#ResultadoAlgoritmoGeneticoModule'
  },
  // {
  //   path: 'salas',
  //   loadChildren: 'app/pages/sala/sala.module#SalaModule'
  // }
]