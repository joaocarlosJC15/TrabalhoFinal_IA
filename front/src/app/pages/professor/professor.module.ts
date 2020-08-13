import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ProfessorListComponent } from './list/professor-list.component';
import { RouterModule } from '@angular/router';
import { ProfessorRoutes } from './professor.routing';

@NgModule({
  declarations: [
    ProfessorListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ProfessorRoutes),
  ],
  exports: [
    ProfessorListComponent
  ],
  providers: [],
})

export class ProfessorModule { }
