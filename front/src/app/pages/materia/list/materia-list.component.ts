import { Component, OnInit } from '@angular/core';
import { MateriaService } from 'app/shared/services/materia.service';

import { Materia } from 'app/shared/models/materia.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { Router } from '@angular/router';

@Component({
    selector: 'materia-list-cmp',
    templateUrl: 'materia-list.component.html'
})

export class MateriaListComponent implements OnInit{

  rows: Materia[];
  columns: ColumnDatatable[] = [
      {name: 'ID', prop: 'id', maxWidth: 100},
      {name: 'Nome', prop: 'nome', minWidth: 200, maxWidth: 300},
      {name: 'Qtde aulas', prop: 'quantidade_aulas', minWidth: 130, maxWidth: 130},
      {name: 'Professor', prop: 'professor.nome', minWidth: 200, maxWidth: 300},
      {name: 'Periodo', prop: 'periodo.nome', minWidth: 200, maxWidth: 300}
  ];

  constructor(
    public materiaService: MateriaService,
    public router: Router
  ) {
  }

  ngOnInit(){
    this.materiaService.list().subscribe(materias => {
      this.rows = materias;
    });
  }

  doubleClick(materia: Materia) {
    this.router.navigate(['materias/'+materia.id+'/editar']);
  }
}
