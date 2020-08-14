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
import { Professor } from 'app/shared/models/professor.model';
import { Periodo } from 'app/shared/models/periodo.model';

@Component({
  selector: 'materia-edit-cmp',
  templateUrl: 'materia-edit.component.html'
})

export class MateriaEditComponent implements OnInit{

  materiaForm: FormGroup;
  materia: Materia;
  submissionForm: boolean;
  action: string;

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
    if (this.route.snapshot.url[0].path === 'novo') {
      this.action = 'novo';
      this.initializeForm();
    } else if (this.route.snapshot.url[1].path === 'editar') {
      this.action = 'editar';
      this.actionEdit();
    }
  }
  
  actionEdit(): void {
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

  initializeForm(materia: Materia = null) {
    this.materiaForm = new FormGroup({
      id: new FormControl({value: materia ? materia.id : null, disabled: true}),
      nome: new FormControl(materia ? materia.nome : null, Validators.required),
      quantidade_aulas: new FormControl(materia ? materia.quantidade_aulas: null, Validators.required),
      fk_professor: new FormControl(materia ? materia.fk_professor: null, Validators.required),
      fk_periodo: new FormControl(materia ? materia.fk_periodo: null, Validators.required),
      descricao: new FormControl(materia ? materia.descricao : null),
      nome_professor: new FormControl({value: materia ? materia.professor.nome : null, disabled: true}),
      nome_periodo: new FormControl({value: materia ? materia.periodo.nome : null, disabled: true})
    });
  }

  sendForm() {
    this.materiaForm.markAllAsTouched();

    if (this.materiaForm.valid) {
      this.submissionForm = true;

      const { id, nome, quantidade_aulas, fk_professor, fk_periodo } = this.materiaForm.getRawValue();
      const periodo = new Materia(id, nome, quantidade_aulas, fk_professor, fk_periodo);

      this.materiaService.add(periodo).subscribe(professor => {
        alert("Matéria criada com sucesso!");

        this.router.navigate(['materias']);
      })
    }
  }

  openModal(modalReference) {
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

  getSelectedProfessor(professor: Professor) {
    this.materiaForm.get('fk_professor').setValue(professor.id);
    this.materiaForm.get('nome_professor').setValue(professor.nome);

    this.modalService.dismissAll();
  }

  getSelectedPeriodo(periodo: Periodo) {
    this.materiaForm.get('fk_periodo').setValue(periodo.id);
    this.materiaForm.get('nome_periodo').setValue(periodo.nome);

    this.modalService.dismissAll();
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
