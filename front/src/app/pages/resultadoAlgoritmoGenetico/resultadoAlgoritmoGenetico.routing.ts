import { Routes } from '@angular/router';
import { ResultadoAlgoritmoGeneticoListComponent } from './list/resultadoAlgoritmoGenetico-list.component';
import { HorarioComponent } from './horario/horario.component';

export const ResultadoAlgoritmoGeneticoRoutes: Routes = [
  { path: '', component: ResultadoAlgoritmoGeneticoListComponent },
  { path: ':id_resultado/horarios', component: HorarioComponent },
];
