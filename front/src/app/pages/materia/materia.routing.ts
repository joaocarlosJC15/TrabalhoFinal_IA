import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MateriaListComponent } from './list/materia-list.component';
import { MateriaEditComponent } from './edit/materia-edit.component';

export const MateriaRoutes: Routes = [
  { path: '', component: MateriaListComponent },
  { path: ':id_materia/editar', component: MateriaEditComponent },
  { path: 'novo', component: MateriaEditComponent }
];

@NgModule({
	imports: [RouterModule.forChild(MateriaRoutes)],
	exports: [RouterModule],
})

export class MateriaRoutingModule { }

