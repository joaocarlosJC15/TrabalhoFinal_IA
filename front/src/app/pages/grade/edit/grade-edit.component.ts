import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { GradeService } from 'app/shared/services/grade.service';

import { Grade } from 'app/shared/models/grade.model';

@Component({
  selector: 'grade-edit-cmp',
  templateUrl: 'grade-edit.component.html'
})

export class GradeEditComponent implements OnInit{

  gradeForm: FormGroup;
  grade: Grade;
  submissionForm: boolean;
  action: string;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private gradeService: GradeService,
  ) {}

  ngOnInit() {
    if (this.route.snapshot.url[1].path === 'novo') {
      this.action = 'novo';
      this.initializeForm();
    } else if (this.route.snapshot.url[2].path === 'editar') {
      this.action = 'editar';
    }
  }

  initializeForm(grade: Grade = null) {
    this.gradeForm = new FormGroup({
      id: new FormControl({value: grade ? grade.id : null, disabled: true}),
      nome: new FormControl(grade ? grade.nome : null, Validators.required),
      descricao: new FormControl(grade ? grade.descricao : null)
    });
  }

  sendForm() {
    this.gradeForm.markAllAsTouched();

    if (this.gradeForm.valid) {
      this.submissionForm = true;

      const { id, nome, descricao } = this.gradeForm.getRawValue();
      
      const horario = new Grade(id, nome, descricao);

      this.gradeService.add(horario).subscribe(grade => {
        alert("Nova grade criada com sucesso!");

        this.router.navigate(['grades']);
      })
    }
  }
}
