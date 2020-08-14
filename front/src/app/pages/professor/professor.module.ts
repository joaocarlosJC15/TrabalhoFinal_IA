import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ProfessorListComponent } from './list/professor-list.component';
import { ProfessorRoutingModule } from './professor.routing';
import { HorarioPorDiaModule } from '../horarioPorDia/horarioPorDia.module';
import { ProfessorEditComponent } from './edit/professor-edit.component';

@NgModule({
  declarations: [
    ProfessorListComponent,
    ProfessorEditComponent
  ],
  imports: [
    SharedModule,
    ProfessorRoutingModule,
    HorarioPorDiaModule
  ],
  exports: [
    ProfessorListComponent,
    ProfessorEditComponent
  ],
  providers: [],
})

export class ProfessorModule { }
