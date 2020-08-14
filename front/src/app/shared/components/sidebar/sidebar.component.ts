import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/grades',     title: 'Grades', icon:'nc-align-left-2', class: '' },
    { path: '/periodos',   title: 'Periodos', icon:'nc-align-left-2', class: '' },
    { path: '/salas',   title: 'Salas', icon:'nc-align-left-2', class: '' },
    { path: '/professores',   title: 'Professores', icon:'nc-align-left-2', class: '' },
    { path: '/materias',   title: 'Matérias', icon:'nc-align-left-2', class: '' },
    { path: '/horariospordia',   title: 'Horários por dia', icon:'nc-align-left-2', class: '' },
    { path: '/resultados',   title: 'Resultados algoritmo', icon:'nc-align-left-2', class: '' },
    { path: '/gerarhorarios',   title: 'Gerar horário', icon:'nc-align-left-2', class: '' }
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
