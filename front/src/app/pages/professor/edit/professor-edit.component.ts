import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProfessorService } from 'app/shared/services/professor.service';
import { RestricaoProfessorHorarioPorDiaService } from 'app/shared/services/restricaoProfessorHorarioPorDia.service';
import { DiaSemanaService } from 'app/shared/services/diaSemana.service';

import { Professor } from 'app/shared/models/professor.model';
import { ColumnDatatable } from 'app/shared/models/columnDatatable.model';
import { HorarioPorDia } from 'app/shared/models/horarioPorDia.model';
import { HorarioPorDiaDiaSemana } from 'app/shared/models/horarioPorDiaDiaSemana';
import { DiaSemana } from 'app/shared/models/diaSemana.model';
import { RestricaoProfessorHorarioPorDia } from 'app/shared/models/restricaoprofessorHorarioPorDia.model';

@Component({
  selector: 'professor-edit-cmp',
  templateUrl: 'professor-edit.component.html'
})

export class ProfessorEditComponent implements OnInit{

  professorForm: FormGroup;
  professor: Professor;
  submissionForm: boolean;
  action: string;

  restricoes: HorarioPorDiaDiaSemana[] = [];
  columnsRestricoes: ColumnDatatable[] = [
    { name: 'ID', prop: 'id', maxWidth: 100 },
    { name: 'Nome', prop: 'horario_inicio', minWidth: 200, maxWidth: 200 },
    { name: 'Descrição', prop: 'horario_termino', minWidth: 300, maxWidth: 300 }
  ];

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private restricaoprofessorHorarioPorDiaService: RestricaoProfessorHorarioPorDiaService,
    private diaSemanaService: DiaSemanaService,
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
      let diasSemana: DiaSemana[];

      this.professorService.get(params['id_professor']).toPromise()
      .then(professor => {
        this.initializeForm(professor);
        this.professor = professor;

        return this.diaSemanaService.list().toPromise();
      })
      .then(diasSemanaResponse => {
        diasSemana = diasSemanaResponse;
        return this.restricaoprofessorHorarioPorDiaService.get(params['id_professor']).toPromise();
      })
      .then(restricoes => {
        this.restricoes = this.generateRestricoesHorarios(diasSemana, restricoes);
        console.log(this.restricoes)
      })
    });
  }

  initializeForm(professor: Professor = null) {
    this.professorForm = new FormGroup({
      id: new FormControl({value: professor ? professor.id : null, disabled: true}),
      nome: new FormControl(professor ? professor.nome : null, Validators.required),
      descricao: new FormControl(professor ? professor.descricao : null),
      data_nascimento: new FormControl(professor ? professor.data_nascimento : null),
      email: new FormControl(professor ? professor.email : null)
    });
  }

  sendForm() {
    this.professorForm.markAllAsTouched();

    if (this.professorForm.valid) {
      this.submissionForm = true;

      const { id, nome, descricao, data_nascimento, email } = this.professorForm.getRawValue();
      const periodo = new Professor(id, nome, descricao, data_nascimento, email);

      this.professorService.add(periodo).subscribe(professor => {
        alert("Professor criado com sucesso!");

        this.router.navigate(['professores']);
      })
    }
  }

  generateRestricoesHorarios(diasSemana: DiaSemana[], restricoes: RestricaoProfessorHorarioPorDia[]): HorarioPorDiaDiaSemana[] {
    const horarios: HorarioPorDiaDiaSemana[] = [];
    const horariosRestricoes: HorarioPorDia[] = [];

    for (let restricao of restricoes) {
      horariosRestricoes.push(restricao.horario);
    }
    for (const dia of diasSemana){
      const horariosPorDiaDiaSemana = new HorarioPorDiaDiaSemana(dia);
      horariosPorDiaDiaSemana.setHorarios(horariosRestricoes);
      horarios.push(horariosPorDiaDiaSemana);
    }

    return horarios;
  }

  openModalForSelectHorario(modalReference) {
    this.modalService.open(modalReference, { size: 'xl', backdrop: 'static'})
  }

  getSelectedHorario(horario: HorarioPorDia) {
    if (this.searchExistisHorario(this.restricoes, horario) === -1) {
      this.modalService.dismissAll();

      this.addRestricao(this.professor, horario);
    } else {
      alert("O professor já possui restrição para o horário selecionado! Selecione outro horário.");
    }
  }

  addRestricao(professor: Professor, horario: HorarioPorDia) {
    console.log(horario)
    console.log(professor)
    this.restricaoprofessorHorarioPorDiaService.add(professor.id, horario.id).subscribe(restricao => {
      const index =  this.searchExistisHorario(this.restricoes, horario, true);
      console.log(index)
      this.restricoes[index].horariosGeradosDiaSemana.unshift(horario);
  
      this.updateRows();

      alert("Restrição adicionada com sucesso!")
    })
  }

  searchExistisHorario(restricoes: HorarioPorDiaDiaSemana[], horario: HorarioPorDia, searchByDiaSemana?: boolean): number {
    let index = -1;
    if (searchByDiaSemana) {
      index = restricoes.findIndex(element => {
        if (element.diaSemana.id === horario.fk_dia_semana) {
          return true;
        }
      })
    } else {
      for (let i = 0; i < restricoes.length; i = i + 1) {
        index = restricoes[i].horariosGeradosDiaSemana.findIndex(horarioDia => {
          if (horarioDia.id === horario.id) {
            return true;
          }
        });
  
        if (index !== -1) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  updateRows() {
    for (const restricao of this.restricoes) {
      restricao.horariosGeradosDiaSemana = [...restricao.horariosGeradosDiaSemana];
    }
  }
}
