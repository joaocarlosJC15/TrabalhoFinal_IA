import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { SalaListComponent } from './list/sala-list.component';
import { SalaRoutingModule } from './sala.routing';
import { HorarioPorDiaModule } from '../horarioPorDia/horarioPorDia.module';
import { SalaEditComponent } from './edit/sala-edit.component';

@NgModule({
  declarations: [
    SalaListComponent,
    SalaEditComponent
  ],
  imports: [
    SharedModule,
    SalaRoutingModule,
    HorarioPorDiaModule
  ],
  exports: [
    SalaListComponent,
    SalaEditComponent
  ],
  providers: [],
})

export class SalaModule { }
