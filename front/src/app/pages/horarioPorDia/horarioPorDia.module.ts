import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

import { HorarioPorDiaListComponent } from './list/horarioPorDia-list.component';
import { HorarioPorDiaRoutes } from './horarioPorDia.routing';
import { HorarioPorDiaEditComponent } from './edit/horarioPorDia-edit.component';

@NgModule({
  declarations: [
    HorarioPorDiaListComponent,
    HorarioPorDiaEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(HorarioPorDiaRoutes),
  ],
  exports: [
    HorarioPorDiaListComponent,
    HorarioPorDiaEditComponent
  ],
  providers: [],
})

export class HorarioPorDiaModule { }
