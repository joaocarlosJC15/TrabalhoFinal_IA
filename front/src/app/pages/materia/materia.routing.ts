import { Routes } from '@angular/router';

import { MateriaListComponent } from './list/materia-list.component';
import { MateriaEditComponent } from './edit/materia-edit.component';
import { NgModule } from '@angular/core';

export const MateriaRoutes: Routes = [
  { path: '', component: MateriaListComponent },
  { path: ':id_materia/editar', component: MateriaEditComponent },
];

