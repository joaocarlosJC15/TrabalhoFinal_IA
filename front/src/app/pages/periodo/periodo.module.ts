import { NgModule } from '@angular/core';

import { PeriodoListComponent } from './list/periodo-list.component';
import { PeriodoRoutingModule } from './periodo.routing';
import { SharedModule } from 'app/shared/shared.module';
import { PeriodoEditComponent } from './edit/periodo-edit.component';
import { HorarioPorDiaModule } from '../horarioPorDia/horarioPorDia.module';


@NgModule({
  declarations: [
    PeriodoListComponent,
    PeriodoEditComponent
  ],
  imports: [
    SharedModule,
    PeriodoRoutingModule,
    HorarioPorDiaModule
  ],
  exports: [
    PeriodoListComponent,
    PeriodoEditComponent
  ],
  providers: [],
})

export class PeriodoModule { }
