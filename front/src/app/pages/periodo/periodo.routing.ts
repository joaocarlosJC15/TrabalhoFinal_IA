import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { PeriodoListComponent } from './list/periodo-list.component';
import { PeriodoEditComponent } from './edit/periodo-edit.component';

export const PeriodoRoutes: Routes = [
  { path: '', component: PeriodoListComponent },
  { path: ':id_periodo/editar', component: PeriodoEditComponent },
];

@NgModule({
	imports: [RouterModule.forChild(PeriodoRoutes)],
	exports: [RouterModule],
})

export class PeriodoRoutingModule { }
