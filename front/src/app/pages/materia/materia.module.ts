import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { MateriaRoutingModule } from './materia.routing';

import { MateriaListComponent } from './list/materia-list.component';
import { MateriaEditComponent } from './edit/materia-edit.component';
import { ProfessorModule } from '../professor/professor.module';
import { PeriodoModule } from '../periodo/periodo.module';

@NgModule({
  declarations: [
    MateriaListComponent,
    MateriaEditComponent
  ],
  imports: [
    SharedModule,
    MateriaRoutingModule,
    ProfessorModule,
    PeriodoModule
  ],
  exports: [
    MateriaListComponent,
    MateriaEditComponent
  ],
  providers: [],
})

export class MateriaModule { }

