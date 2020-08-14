import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfessorListComponent } from './list/professor-list.component';
import { ProfessorEditComponent } from './edit/professor-edit.component';

export const ProfessorRoutes: Routes = [
  { path: '', component: ProfessorListComponent },
  { path: ':id_professor/editar', component: ProfessorEditComponent },
  { path: 'novo', component: ProfessorEditComponent }
];

@NgModule({
	imports: [RouterModule.forChild(ProfessorRoutes)],
	exports: [RouterModule],
})

export class ProfessorRoutingModule { }