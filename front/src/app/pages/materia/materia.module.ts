import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { MateriaListComponent } from './list/materia-list.component';
import { RouterModule } from '@angular/router';
import { MateriaRoutes } from './materia.routing';

@NgModule({
  declarations: [
    MateriaListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(MateriaRoutes),
  ],
  exports: [
    MateriaListComponent
  ],
  providers: [],
})

export class MateriaModule { }
