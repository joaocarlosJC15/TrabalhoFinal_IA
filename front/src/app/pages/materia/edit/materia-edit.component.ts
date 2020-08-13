import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MateriaService } from 'app/shared/services/materia.service';
import { RestricaoMateriaSalaService } from 'app/shared/services/restricaoMateriaSala.service';

import { Materia } from 'app/shared/models/materia.model';
import { RestricaoMateriaSala } from 'app/shared/models/restricaoMateriaSala.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { Sala } from 'app/shared/models/sala.model';

@Component({
  selector: 'materia-edit-cmp',
  templateUrl: 'materia-edit.component.html'
})

export class MateriaEditComponent implements OnInit{

  materiaForm: FormGroup;
  materia: Materia;
  submissionForm: boolean;

  restricoesMateriaSala: RestricaoMateriaSala [];
  columnsRestricoes: ColumnDatatable[] = [
    {name: 'ID', prop: 'sala.id', maxWidth: 100},
    {name: 'Nome', prop: 'sala.nome', minWidth: 200, maxWidth: 200},
    {name: 'Descrição', prop: 'sala.descricao', minWidth: 300, maxWidth: 300}
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private materiaService: MateriaService,
    private restricaoMateriaSalaService: RestricaoMateriaSalaService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.materiaService.get(params['id_materia']).toPromise()
      .then(materia => {
        this.initializeForm(materia);
        this.materia = materia;

        return this.restricaoMateriaSalaService.get(params['id_materia']).toPromise();
      })
      .then(restricoes => {
        this.restricoesMateriaSala = restricoes;
      })
    });
  }

  initializeForm(materia: Materia) {
    this.materiaForm = new FormGroup({
      id: new FormControl({value: 0, disabled: true}),
      nome: new FormControl(materia.nome, Validators.required),
      quantidade_aulas: new FormControl(materia.quantidade_aulas, Validators.required),
      fk_professor: new FormControl(materia.fk_professor, Validators.required),
      fk_periodo: new FormControl(materia.fk_periodo, Validators.required),
      descricao: new FormControl(materia.descricao),
      nome_professor: new FormControl({value: materia.professor.nome, disabled: true}),
      nome_periodo: new FormControl({value: materia.periodo.nome, disabled: true})
    });
  }

  openModalForSelectSala(modalReference) {
    this.modalService.open(modalReference, { size: 'xl', backdrop: 'static'})
  }

  getSelectedSala(sala: Sala) {
    if (this.searchSala(this.restricoesMateriaSala, sala) === -1) {
      this.modalService.dismissAll();

      this.addRestricao(this.materia, sala);
    } else {
      alert("A matéria já possui restrição para a sala selecionada! Selecione outra sala.");
    }
  }

  addRestricao(materia: Materia, sala: Sala) {
    this.restricaoMateriaSalaService.add(materia.id, sala.id).subscribe(restricao => {
      this.restricoesMateriaSala.unshift(restricao);
      this.updateRows();

      alert("Restrição adicionada com sucesso!")
    })
  }

  searchSala(restricoesMateriaSala: RestricaoMateriaSala[], sala: Sala) {
    return restricoesMateriaSala.findIndex(restricao => {
      if (restricao.fk_sala === sala.id) {
        return true;
      }
    });
  }

  updateRows() {
    this.restricoesMateriaSala = [...this.restricoesMateriaSala];
  }
}
