import { NgModule } from '@angular/core';

import { PeriodoListComponent } from './list/periodo-list.component';
import { RouterModule } from '@angular/router';
import { PeriodoRoutes } from './periodo.routing';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  declarations: [
    PeriodoListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(PeriodoRoutes),
  ],
  exports: [
    PeriodoListComponent
  ],
  providers: [],
})

export class PeriodoModule { }
