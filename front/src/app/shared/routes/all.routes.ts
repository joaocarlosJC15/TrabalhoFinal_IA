export const ALL_ROUTES = [
  {
    path: 'periodos',
    loadChildren: 'app/pages/periodo/periodo.module#PeriodoModule'
  },
  {
    path: 'resultados',
    loadChildren: 'app/pages/resultadoAlgoritmoGenetico/resultadoAlgoritmoGenetico.module#ResultadoAlgoritmoGeneticoModule'
  },
  {
    path: 'gerarhorarios',
    loadChildren: 'app/pages/gerarHorario/gerarHorario.module#GerarHorarioModule'
  },
  {
    path: 'materias',
    loadChildren: 'app/pages/materia/materia.module#MateriaModule'
  },
  {
    path: 'salas',
    loadChildren: 'app/pages/sala/sala.module#SalaModule'
  },
  {
    path: 'professores',
    loadChildren: 'app/pages/professor/professor.module#ProfessorModule'
  },
  {
    path: 'horariospordia',
    loadChildren: 'app/pages/horarioPorDia/horarioPorDia.module#HorarioPorDiaModule'
  }
]