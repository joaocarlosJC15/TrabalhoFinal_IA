import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { GradeService } from '../services/grade.service';

@Injectable()
export class GradeGuard implements CanActivate {
  constructor(
    private router: Router,
    private gradeService: GradeService
  ) {}

  canActivate(): boolean {
    if (this.gradeService.getIdGradeOnStorage()) {
      return true;
    }
    alert("Por favor, selecione primeiro uma grade");

    this.router.navigate(['/grades']);

    return false;
  }
}