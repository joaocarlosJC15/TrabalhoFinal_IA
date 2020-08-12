import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { ResultadoAlgoritmoGeneticoListComponent } from './list/resultadoAlgoritmoGenetico-list.component';
import { ResultadoAlgoritmoGeneticoRoutes } from './resultadoAlgoritmoGenetico.routing';


@NgModule({
  declarations: [
    ResultadoAlgoritmoGeneticoListComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(ResultadoAlgoritmoGeneticoRoutes),
  ],
  exports: [
    ResultadoAlgoritmoGeneticoListComponent
  ],
  providers: [],
})

export class ResultadoAlgoritmoGeneticoModule { }
