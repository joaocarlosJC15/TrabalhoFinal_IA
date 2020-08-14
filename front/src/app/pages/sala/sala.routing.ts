import { Routes, RouterModule } from '@angular/router';
import { SalaListComponent } from './list/sala-list.component';
import { NgModule } from '@angular/core';
import { SalaEditComponent } from './edit/sala-edit.component';

export const SalaRoutes: Routes = [
  { path: '', component: SalaListComponent },
  { path: ':id_sala/editar', component: SalaEditComponent },
];

@NgModule({
	imports: [RouterModule.forChild(SalaRoutes)],
	exports: [RouterModule],
})

export class SalaRoutingModule { }
