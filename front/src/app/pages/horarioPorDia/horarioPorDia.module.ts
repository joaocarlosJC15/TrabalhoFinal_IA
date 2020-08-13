import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { HorarioPorDiaListComponent } from './list/horarioPorDia-list.component';
import { RouterModule } from '@angular/router';
import { HorarioPorDiaRoutes } from './horarioPorDia.routing';

@NgModule({
  declarations: [
    HorarioPorDiaListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(HorarioPorDiaRoutes),
  ],
  exports: [
    HorarioPorDiaListComponent
  ],
  providers: [],
})

export class HorarioPorDiaModule { }
