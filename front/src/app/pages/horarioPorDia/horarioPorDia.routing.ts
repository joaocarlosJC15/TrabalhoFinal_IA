import { Routes } from '@angular/router';
import { HorarioPorDiaListComponent } from './list/horarioPorDia-list.component';
import { HorarioPorDiaEditComponent } from './edit/horarioPorDia-edit.component';

export const HorarioPorDiaRoutes: Routes = [
  { path: '', component: HorarioPorDiaListComponent },
  { path: 'novo', component: HorarioPorDiaEditComponent },
  { path: ':id_horario_por_dia/editar', component: HorarioPorDiaEditComponent }
];
