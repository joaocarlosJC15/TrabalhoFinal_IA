import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { MateriaRoutes } from './materia.routing';

import { MateriaListComponent } from './list/materia-list.component';
import { MateriaEditComponent } from './edit/materia-edit.component';

@NgModule({
  declarations: [
    MateriaListComponent,
    MateriaEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MateriaRoutes),
  ],
  exports: [
    MateriaListComponent,
    MateriaEditComponent
  ],
  providers: [],
})

export class MateriaModule { }

