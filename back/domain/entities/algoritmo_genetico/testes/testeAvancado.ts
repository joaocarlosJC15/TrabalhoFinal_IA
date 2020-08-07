import { DiaSemana } from '../../../../interfaces/DiaSemana';
import { Usuario } from '../../../../interfaces/Usuario';
import { Grade } from '../../../../interfaces/Grade';
import { HorarioPorDia } from '../../../../interfaces/HorarioPorDia';
import { Periodo } from '../../../../interfaces/Periodo';
import { Professor } from '../../../../interfaces/Professor';
import { Materia } from '../../../../interfaces/Materia';
import { Sala } from '../../sala';
import { RestricaoHorarioPorDiaPeriodo } from '../../../../interfaces/restricoes/RestricaoHorarioPorDiaPeriodo';
import { RestricaoMateriaSala } from '../../../../interfaces/restricoes/RestricaoMateriaSala';
import { RestricaoProfessorHorarioPorDia } from '../../../../interfaces/restricoes/RestricaoProfessorHorarioPorDia';
import { RestricaoSalaHorarioPorDia } from '../../../../interfaces/restricoes/RestricaoSalaHorarioPorDia';
import { AlgortimoGenetico } from '../algoritmoGenetico';

const diasSemanas: DiaSemana[] = [
  {
    id: 1,
    nome: 'Domingo'
  },
  {
    id: 2,
    nome: 'Segunda'
  },
  {
    id: 3,
    nome: 'Terça'
  },
  {
    id: 4,
    nome: 'Quarta'
  },
  {
    id: 5,
    nome: 'Quinta'
  },
  {
    id: 6,
    nome: 'Sexta'
  },
  {
    id: 7,
    nome: 'Sábado'
  },
];

const usuario: Usuario = {
  id: 1,
  nome: 'João',
  email: 'jc15joaocarlos@gmail.com',
  senha: '1234'
};

const grade: Grade = {
  id: 1,
  nome: 'Grade de teste 1',
  fk_usuario: 1
}

const periodos: Periodo[] = [
  {
    id:1,
    nome: '1º período',
    fk_grade: 1
  },
  {
    id:2,
    nome: '2º período',
    fk_grade: 1
  },
  {
    id:3,
    nome: '3º período',
    fk_grade: 1
  },
  {
    id:4,
    nome: '4º período',
    fk_grade: 1
  },
  {
    id:4,
    nome: '5º período',
    fk_grade: 1
  },
]

const salas: Sala[] = [
  {
    id: 1,
    nome: 'Sala 1',
    fk_grade: 1
  },
  {
    id: 2,
    nome: 'Sala 2',
    fk_grade: 1
  },
  {
    id: 3,
    nome: 'Sala 2',
    fk_grade: 1
  },
  {
    id: 4,
    nome: 'Sala 4',
    fk_grade: 1
  }
]

const professores: Professor[] = [
  {
    id: 1,
    nome: 'Professor 1 - Anderson',
    fk_grade: 1
  },
  {
    id: 2,
    nome: 'Professor 2',
    fk_grade: 1
  },
  {
    id: 3,
    nome: 'Professor 3',
    fk_grade: 1
  },
  {
    id: 4,
    nome: 'Professor 4',
    fk_grade: 1
  },
  {
    id: 5,
    nome: 'Professor 5',
    fk_grade: 1
  },
  {
    id: 6,
    nome: 'Professor 6',
    fk_grade: 1
  },
  {
    id: 7,
    nome: 'Professor 7',
    fk_grade: 1
  },
  {
    id: 8,
    nome: 'Professor 8',
    fk_grade: 1
  },
  {
    id: 9,
    nome: 'Professor 9',
    fk_grade: 1
  },
  {
    id: 10,
    nome: 'Professor 10',
    fk_grade: 1
  },


  {
    id: 11,
    nome: 'Professor 11',
    fk_grade: 1
  },
  {
    id: 12,
    nome: 'Professor 12',
    fk_grade: 1
  },
  {
    id: 13,
    nome: 'Professor 13',
    fk_grade: 1
  },
  {
    id: 14,
    nome: 'Professor 14',
    fk_grade: 1
  },
  {
    id: 15,
    nome: 'Professor 15',
    fk_grade: 1
  },
  {
    id: 16,
    nome: 'Professor 16',
    fk_grade: 1
  },
  {
    id: 17,
    nome: 'Professor 17',
    fk_grade: 1
  },
  {
    id: 18,
    nome: 'Professor 18',
    fk_grade: 1
  },
]


const materias: Materia[] = [
  {
    id:1,
    nome: 'Materia 1',
    quantidade_aulas: 4,
    fk_professor: 1,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:2,
    nome: 'Materia 2',
    quantidade_aulas: 4,
    fk_professor: 2,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:3,
    nome: 'Materia 3',
    quantidade_aulas: 4,
    fk_professor: 3,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:4,
    nome: 'Materia 4',
    quantidade_aulas: 4,
    fk_professor: 4,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:5,
    nome: 'Materia 5',
    quantidade_aulas: 3,
    fk_professor: 1,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:6,
    nome: 'Materia 6',
    quantidade_aulas: 2,
    fk_professor: 2,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:7,
    nome: 'Materia 7',
    quantidade_aulas: 2,
    fk_professor: 3,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:8,
    nome: 'Materia 8',
    quantidade_aulas: 2,
    fk_professor: 5,
    fk_periodo: 1,
    fk_grade: 1
  },
  {
    id:9,
    nome: 'Materia 9',
    quantidade_aulas: 4,
    fk_professor: 5,
    fk_periodo: 2,
    fk_grade: 1
  },
  {
    id:10,
    nome: 'Materia 10',
    quantidade_aulas: 4,
    fk_professor: 6,
    fk_periodo: 2,
    fk_grade: 1
  },
  {
    id:11,
    nome: 'Materia 11',
    quantidade_aulas: 4,
    fk_professor: 7,
    fk_periodo: 2,
    fk_grade: 1
  },
  {
    id:12,
    nome: 'Materia 12',
    quantidade_aulas: 4,
    fk_professor: 8,
    fk_periodo: 2,
    fk_grade: 1
  },
  {
    id:13,
    nome: 'Materia 13',
    quantidade_aulas: 3,
    fk_professor: 9,
    fk_periodo: 2,
    fk_grade: 1
  },
  {
    id:14,
    nome: 'Materia 14',
    quantidade_aulas: 2,
    fk_professor: 10,
    fk_periodo: 2,
    fk_grade: 1
  },
  {
    id:15,
    nome: 'Materia 15',
    quantidade_aulas: 2,
    fk_professor: 6,
    fk_periodo: 2,
    fk_grade: 1
  },
  {
    id:16,
    nome: 'Materia 16',
    quantidade_aulas: 2,
    fk_professor: 7,
    fk_periodo: 2,
    fk_grade: 1
  },



  {
    id:17,
    nome: 'Materia 17',
    quantidade_aulas: 5,
    fk_professor: 6,
    fk_periodo: 3,
    fk_grade: 1
  },
  {
    id:18,
    nome: 'Materia 18',
    quantidade_aulas: 5,
    fk_professor: 7,
    fk_periodo: 3,
    fk_grade: 1
  },
  {
    id:19,
    nome: 'Materia 19',
    quantidade_aulas: 5,
    fk_professor: 8,
    fk_periodo: 3,
    fk_grade: 1
  },
  {
    id:20,
    nome: 'Materia 20',
    quantidade_aulas: 4,
    fk_professor: 9,
    fk_periodo: 3,
    fk_grade: 1
  },
  {
    id:21,
    nome: 'Materia 21',
    quantidade_aulas: 3,
    fk_professor: 10,
    fk_periodo: 3,
    fk_grade: 1
  },
  {
    id:22,
    nome: 'Materia 22',
    quantidade_aulas: 3,
    fk_professor: 11,
    fk_periodo: 3,
    fk_grade: 1
  }, 



  {
    id:23,
    nome: 'Materia 23',
    quantidade_aulas: 4,
    fk_professor: 11,
    fk_periodo: 4,
    fk_grade: 1
  },
  {
    id:24,
    nome: 'Materia 24',
    quantidade_aulas: 4,
    fk_professor: 12,
    fk_periodo: 4,
    fk_grade: 1
  },
  {
    id:25,
    nome: 'Materia 25',
    quantidade_aulas: 4,
    fk_professor: 13,
    fk_periodo: 4,
    fk_grade: 1
  },
  {
    id:26,
    nome: 'Materia 26',
    quantidade_aulas: 4,
    fk_professor: 14,
    fk_periodo: 4,
    fk_grade: 1
  },
  {
    id:27,
    nome: 'Materia 27',
    quantidade_aulas: 3,
    fk_professor: 15,
    fk_periodo: 4,
    fk_grade: 1
  },
  {
    id:28,
    nome: 'Materia 28',
    quantidade_aulas: 2,
    fk_professor: 11,
    fk_periodo: 4,
    fk_grade: 1
  },
  {
    id:29,
    nome: 'Materia 29',
    quantidade_aulas: 2,
    fk_professor: 12,
    fk_periodo: 4,
    fk_grade: 1
  },
  {
    id:30,
    nome: 'Materia 30',
    quantidade_aulas: 2,
    fk_professor: 13,
    fk_periodo: 4,
    fk_grade: 1
  },


  {
    id:31,
    nome: 'Materia 31',
    quantidade_aulas: 5,
    fk_professor: 16,
    fk_periodo: 5,
    fk_grade: 1
  },
  {
    id:32,
    nome: 'Materia 32',
    quantidade_aulas: 5,
    fk_professor: 17,
    fk_periodo: 5,
    fk_grade: 1
  },
  {
    id:33,
    nome: 'Materia 33',
    quantidade_aulas: 5,
    fk_professor: 18,
    fk_periodo: 5,
    fk_grade: 1
  },
  {
    id:34,
    nome: 'Materia 34',
    quantidade_aulas: 4,
    fk_professor: 16,
    fk_periodo: 5,
    fk_grade: 1
  },
  {
    id:35,
    nome: 'Materia 35',
    quantidade_aulas: 3,
    fk_professor: 17,
    fk_periodo: 5,
    fk_grade: 1
  },
  {
    id:36,
    nome: 'Materia 36',
    quantidade_aulas: 3,
    fk_professor: 18,
    fk_periodo: 5,
    fk_grade: 1
  }
]

const horariosPorDia: HorarioPorDia[] = [
  {
    id: 1,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 2,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 3,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 4,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 5,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 6,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 7,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 8,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 9,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 10,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:2,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },




  {
    id: 11,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 12,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 13,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 14,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 15,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 16,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 17,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 18,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 19,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 20,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:3,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },



  {
    id: 21,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 22,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 23,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 24,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 25,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 26,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 27,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 28,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 29,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 30,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:4,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },



  {
    id: 31,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 32,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 33,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 34,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 35,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 36,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 37,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 38,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 39,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 40,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:5,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },



  {
    id: 41,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 42,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 43,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 44,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 45,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 46,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 47,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 48,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 3,
    fk_grade:1
  },
  {
    id: 49,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
  {
    id: 50,
    horario_inicio: new Date,
    horario_termino: new Date,
    fk_dia_semana:6,
    qtde_aulas_simultaneas: 2,
    fk_grade:1
  },
]





const restricoresHorarioDiaPeriodo: RestricaoHorarioPorDiaPeriodo [] = [
  {
    fk_horario: 1,
    fk_periodo: 1,
  },
  {
    fk_horario: 2,
    fk_periodo: 1,
  },
  {
    fk_horario: 3,
    fk_periodo: 1,
  },
  {
    fk_horario: 4,
    fk_periodo: 1,
  },
  {
    fk_horario: 5,
    fk_periodo: 1,
  },
  {
    fk_horario: 11,
    fk_periodo: 1,
  },
  {
    fk_horario: 12,
    fk_periodo: 1,
  },
  {
    fk_horario: 13,
    fk_periodo: 1,
  },
  {
    fk_horario: 14,
    fk_periodo: 1,
  },
  {
    fk_horario: 15,
    fk_periodo: 1,
  },
  {
    fk_horario: 21,
    fk_periodo: 1,
  },
  {
    fk_horario: 22,
    fk_periodo: 1,
  },
  {
    fk_horario: 23,
    fk_periodo: 1,
  },
  {
    fk_horario: 24,
    fk_periodo: 1,
  },
  {
    fk_horario: 25,
    fk_periodo: 1,
  },
  {
    fk_horario: 31,
    fk_periodo: 1,
  },
  {
    fk_horario: 32,
    fk_periodo: 1,
  },
  {
    fk_horario: 33,
    fk_periodo: 1,
  },
  {
    fk_horario: 34,
    fk_periodo: 1,
  },
  {
    fk_horario: 35,
    fk_periodo: 1,
  },
  {
    fk_horario: 41,
    fk_periodo: 1,
  },
  {
    fk_horario: 42,
    fk_periodo: 1,
  },
  {
    fk_horario: 43,
    fk_periodo: 1,
  },
  {
    fk_horario: 44,
    fk_periodo: 1,
  },
  {
    fk_horario: 45,
    fk_periodo: 1,
  },




  {
    fk_horario: 1,
    fk_periodo: 2,
  },
  {
    fk_horario: 2,
    fk_periodo: 2,
  },
  {
    fk_horario: 3,
    fk_periodo: 2,
  },
  {
    fk_horario: 4,
    fk_periodo: 2,
  },
  {
    fk_horario: 5,
    fk_periodo: 2,
  },
  {
    fk_horario: 11,
    fk_periodo: 2,
  },
  {
    fk_horario: 12,
    fk_periodo: 2,
  },
  {
    fk_horario: 13,
    fk_periodo: 2,
  },
  {
    fk_horario: 14,
    fk_periodo: 2,
  },
  {
    fk_horario: 15,
    fk_periodo: 2,
  },
  {
    fk_horario: 21,
    fk_periodo: 2,
  },
  {
    fk_horario: 22,
    fk_periodo: 2,
  },
  {
    fk_horario: 23,
    fk_periodo: 2,
  },
  {
    fk_horario: 24,
    fk_periodo: 2,
  },
  {
    fk_horario: 25,
    fk_periodo: 2,
  },
  {
    fk_horario: 31,
    fk_periodo: 2,
  },
  {
    fk_horario: 32,
    fk_periodo: 2,
  },
  {
    fk_horario: 33,
    fk_periodo: 2,
  },
  {
    fk_horario: 34,
    fk_periodo: 2,
  },
  {
    fk_horario: 35,
    fk_periodo: 2,
  },
  {
    fk_horario: 41,
    fk_periodo: 2,
  },
  {
    fk_horario: 42,
    fk_periodo: 2,
  },
  {
    fk_horario: 43,
    fk_periodo: 2,
  },
  {
    fk_horario: 44,
    fk_periodo: 2,
  },
  {
    fk_horario: 45,
    fk_periodo: 2,
  },


  {
    fk_horario: 6,
    fk_periodo: 3,
  },
  {
    fk_horario: 7,
    fk_periodo: 3,
  },
  {
    fk_horario: 8,
    fk_periodo: 3,
  },
  {
    fk_horario: 9,
    fk_periodo: 3,
  },
  {
    fk_horario: 10,
    fk_periodo: 3,
  },
  {
    fk_horario: 16,
    fk_periodo: 3,
  },
  {
    fk_horario: 17,
    fk_periodo: 3,
  },
  {
    fk_horario: 18,
    fk_periodo: 3,
  },
  {
    fk_horario: 19,
    fk_periodo: 3,
  },
  {
    fk_horario: 20,
    fk_periodo: 3,
  },
  {
    fk_horario: 26,
    fk_periodo: 3,
  },
  {
    fk_horario: 27,
    fk_periodo: 3,
  },
  {
    fk_horario: 28,
    fk_periodo: 3,
  },
  {
    fk_horario: 29,
    fk_periodo: 3,
  },
  {
    fk_horario: 30,
    fk_periodo: 3,
  },
  {
    fk_horario: 36,
    fk_periodo: 3,
  },
  {
    fk_horario: 37,
    fk_periodo: 3,
  },
  {
    fk_horario: 38,
    fk_periodo: 3,
  },
  {
    fk_horario: 39,
    fk_periodo: 3,
  },
  {
    fk_horario: 40,
    fk_periodo: 3,
  },
  {
    fk_horario: 46,
    fk_periodo: 3,
  },
  {
    fk_horario: 47,
    fk_periodo: 3,
  },
  {
    fk_horario: 48,
    fk_periodo: 3,
  },
  {
    fk_horario: 49,
    fk_periodo: 3,
  },
  {
    fk_horario: 50,
    fk_periodo: 3,
  },



  {
    fk_horario: 6,
    fk_periodo: 4,
  },
  {
    fk_horario: 7,
    fk_periodo: 4,
  },
  {
    fk_horario: 8,
    fk_periodo: 4,
  },
  {
    fk_horario: 9,
    fk_periodo: 4,
  },
  {
    fk_horario: 10,
    fk_periodo: 4,
  },
  {
    fk_horario: 16,
    fk_periodo: 4,
  },
  {
    fk_horario: 17,
    fk_periodo: 4,
  },
  {
    fk_horario: 18,
    fk_periodo: 4,
  },
  {
    fk_horario: 19,
    fk_periodo: 4,
  },
  {
    fk_horario: 20,
    fk_periodo: 4,
  },
  {
    fk_horario: 26,
    fk_periodo: 4,
  },
  {
    fk_horario: 27,
    fk_periodo: 4,
  },
  {
    fk_horario: 28,
    fk_periodo: 4,
  },
  {
    fk_horario: 29,
    fk_periodo: 4,
  },
  {
    fk_horario: 30,
    fk_periodo: 4,
  },
  {
    fk_horario: 36,
    fk_periodo: 4,
  },
  {
    fk_horario: 37,
    fk_periodo: 4,
  },
  {
    fk_horario: 38,
    fk_periodo: 4,
  },
  {
    fk_horario: 39,
    fk_periodo: 4,
  },
  {
    fk_horario: 40,
    fk_periodo: 4,
  },
  {
    fk_horario: 46,
    fk_periodo: 4,
  },
  {
    fk_horario: 47,
    fk_periodo: 4,
  },
  {
    fk_horario: 48,
    fk_periodo: 4,
  },
  {
    fk_horario: 49,
    fk_periodo: 4,
  },
  {
    fk_horario: 50,
    fk_periodo: 4,
  },




  {
    fk_horario: 4,
    fk_periodo: 5,
  },
  {
    fk_horario: 5,
    fk_periodo: 5,
  },
  {
    fk_horario: 6,
    fk_periodo: 5,
  },
  {
    fk_horario: 7,
    fk_periodo: 5,
  },
  {
    fk_horario: 8,
    fk_periodo: 5,
  },
  {
    fk_horario: 14,
    fk_periodo: 5,
  },
  {
    fk_horario: 15,
    fk_periodo: 5,
  },
  {
    fk_horario: 16,
    fk_periodo: 5,
  },
  {
    fk_horario: 17,
    fk_periodo: 5,
  },
  {
    fk_horario: 18,
    fk_periodo: 5,
  },
  {
    fk_horario: 24,
    fk_periodo: 5,
  },
  {
    fk_horario: 25,
    fk_periodo: 5,
  },
  {
    fk_horario: 26,
    fk_periodo: 5,
  },
  {
    fk_horario: 27,
    fk_periodo: 5,
  },
  {
    fk_horario: 28,
    fk_periodo: 5,
  },
  {
    fk_horario: 34,
    fk_periodo: 5,
  },
  {
    fk_horario: 35,
    fk_periodo: 5,
  },
  {
    fk_horario: 36,
    fk_periodo: 5,
  },
  {
    fk_horario: 37,
    fk_periodo: 5,
  },
  {
    fk_horario: 38,
    fk_periodo: 5,
  },
  {
    fk_horario: 44,
    fk_periodo: 5,
  },
  {
    fk_horario: 45,
    fk_periodo: 5,
  },
  {
    fk_horario: 46,
    fk_periodo: 5,
  },
  {
    fk_horario: 47,
    fk_periodo: 5,
  },
  {
    fk_horario: 48,
    fk_periodo: 5,
  },
]

const restricoresMateriaSala: RestricaoMateriaSala [] = [
  {
    fk_materia: 1,
    fk_sala: 1
  },
  {
    fk_materia: 2,
    fk_sala: 1
  },
  {
    fk_materia: 3,
    fk_sala: 1
  },
  {
    fk_materia: 4,
    fk_sala: 2
  },
  {
    fk_materia: 5,
    fk_sala: 2
  },
  {
    fk_materia: 6,
    fk_sala: 2
  },
  {
    fk_materia: 7,
    fk_sala: 2
  },
  {
    fk_materia: 8,
    fk_sala: 3
  },
  {
    fk_materia: 9,
    fk_sala: 3
  },
  {
    fk_materia: 11,
    fk_sala: 3
  },
  {
    fk_materia: 15,
    fk_sala: 2
  },
  {
    fk_materia: 16,
    fk_sala: 1
  },
  {
    fk_materia: 12,
    fk_sala: 1
  },
  {
    fk_materia: 17,
    fk_sala: 1
  },
  {
    fk_materia: 27,
    fk_sala: 1
  },
  {
    fk_materia: 28,
    fk_sala: 1
  },
  {
    fk_materia: 19,
    fk_sala: 4
  },
  {
    fk_materia: 26,
    fk_sala: 2
  },
  {
    fk_materia: 20,
    fk_sala: 2
  },
  {
    fk_materia: 23,
    fk_sala: 4
  },
  {
    fk_materia: 29,
    fk_sala: 4
  },
  {
    fk_materia: 27,
    fk_sala: 3
  },
  {
    fk_materia: 30,
    fk_sala: 4
  },
  {
    fk_materia: 21,
    fk_sala: 4
  },
]

const restricoresProfessorHorarioPorDia: RestricaoProfessorHorarioPorDia [] = [
  {
    fk_horario_por_dia: 1,
    fk_professor: 1,
  },
  {
    fk_horario_por_dia: 6,
    fk_professor: 1,
  },
  {
    fk_horario_por_dia: 11,
    fk_professor: 1,
  },
  {
    fk_horario_por_dia: 16,
    fk_professor: 1,
  },
  {
    fk_horario_por_dia: 21,
    fk_professor: 1,
  },
  {
    fk_horario_por_dia: 1,
    fk_professor: 2,
  },
  {
    fk_horario_por_dia: 6,
    fk_professor: 2,
  },
  {
    fk_horario_por_dia: 11,
    fk_professor: 2,
  },
  {
    fk_horario_por_dia: 16,
    fk_professor: 2,
  },
  {
    fk_horario_por_dia: 21,
    fk_professor: 2,
  },
  {
    fk_horario_por_dia: 1,
    fk_professor: 3,
  },
  {
    fk_horario_por_dia: 2,
    fk_professor: 3,
  },
  {
    fk_horario_por_dia: 3,
    fk_professor: 3,
  },
  {
    fk_horario_por_dia: 4,
    fk_professor: 3,
  },
  {
    fk_horario_por_dia: 5,
    fk_professor: 3,
  },
  {
    fk_horario_por_dia: 17,
    fk_professor: 4,
  },
  {
    fk_horario_por_dia: 18,
    fk_professor: 4,
  },
  {
    fk_horario_por_dia: 19,
    fk_professor: 4,
  },
  {
    fk_horario_por_dia: 5,
    fk_professor: 5,
  },
  {
    fk_horario_por_dia: 6,
    fk_professor: 5,
  },
  {
    fk_horario_por_dia: 7,
    fk_professor: 5,
  },
  {
    fk_horario_por_dia: 8,
    fk_professor: 5,
  },
  {
    fk_horario_por_dia: 5,
    fk_professor: 6,
  },
  {
    fk_horario_por_dia: 9,
    fk_professor: 6,
  },
  {
    fk_horario_por_dia: 12,
    fk_professor: 6,
  },
  {
    fk_horario_por_dia: 4,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 5,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 6,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 7,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 8,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 14,
    fk_professor:17,
  },
  {
    fk_horario_por_dia: 15,
    fk_professor:17,
  },
  {
    fk_horario_por_dia: 16,
    fk_professor:17,
  },
  {
    fk_horario_por_dia: 17,
    fk_professor:17,
  },
  {
    fk_horario_por_dia: 18,
    fk_professor:17,
  },
  {
    fk_horario_por_dia: 36,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 37,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 38,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 46,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 47,
    fk_professor:16,
  },
  {
    fk_horario_por_dia: 48,
    fk_professor:16,
  },
]

const restricoresSalaHorarioPorDia: RestricaoSalaHorarioPorDia [] = [
  {
    fk_horario_por_dia: 1,
    fk_sala: 1
  },
  {
    fk_horario_por_dia: 2,
    fk_sala: 1
  },
  {
    fk_horario_por_dia: 3,
    fk_sala: 1
  },
  {
    fk_horario_por_dia: 4,
    fk_sala: 1
  },
  {
    fk_horario_por_dia: 5,
    fk_sala: 1
  },
  {
    fk_horario_por_dia: 6,
    fk_sala: 2
  },
  {
    fk_horario_por_dia: 7,
    fk_sala: 2
  },
  {
    fk_horario_por_dia: 8,
    fk_sala: 2
  },
  {
    fk_horario_por_dia: 9,
    fk_sala: 2
  },
  {
    fk_horario_por_dia: 10,
    fk_sala: 2
  },
  {
    fk_horario_por_dia: 11,
    fk_sala: 3
  },
  {
    fk_horario_por_dia: 12,
    fk_sala: 3
  },
  {
    fk_horario_por_dia: 13,
    fk_sala: 3
  },
  {
    fk_horario_por_dia: 14,
    fk_sala: 3
  },
  {
    fk_horario_por_dia: 15,
    fk_sala: 3
  },
  {
    fk_horario_por_dia: 16,
    fk_sala: 1
  },
  {
    fk_horario_por_dia: 17,
    fk_sala: 1
  },
  {
    fk_horario_por_dia: 26,
    fk_sala: 4
  },
  {
    fk_horario_por_dia: 27,
    fk_sala: 4
  },
  {
    fk_horario_por_dia: 28,
    fk_sala: 4
  },
  {
    fk_horario_por_dia: 36,
    fk_sala: 3
  },
  {
    fk_horario_por_dia: 37,
    fk_sala: 3
  },
  {
    fk_horario_por_dia: 38,
    fk_sala: 3
  },
]

const algoritmoGenetico = new AlgortimoGenetico(
  28,
  100000,
  4,
  0.67,
  0.8,
  true,
  4,
  salas,
  materias,
  horariosPorDia,
  restricoresHorarioDiaPeriodo,
  restricoresMateriaSala,
  restricoresProfessorHorarioPorDia,
  restricoresSalaHorarioPorDia,
  1
);

algoritmoGenetico.gerarHorario();
